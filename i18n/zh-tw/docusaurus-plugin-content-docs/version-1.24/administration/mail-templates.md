---
date: "2023-05-23T09:00:00+08:00"
slug: "mail-templates"
sidebar_position: 45
aliases:
  - /zh-tw/mail-templates
---

# 邮件模板

為了定制特定操作的电子邮件主题和内容，可以使用模板来自定义 Gitea。这些功能的模板位于 [`custom` 目錄](../administration/customizing-gitea.md) 下。
如果没有自定义的替代方案，Gitea 将使用内部模板作為默认模板。

自定义模板在 Gitea 启动时加载。对它们的更改在 Gitea 重新启动之前不会被识别。

## 支持模板的邮件通知

目前，以下通知事件使用模板：

| 操作名稱   | 用途                                                                   |
| ---------- | ---------------------------------------------------------------------- |
| `new`      | 建立了新的工單或合並請求。                                             |
| `comment`  | 在現有工單或合並請求中建立了新的评论。                                 |
| `close`    | 关闭了工單或合並請求。                                                 |
| `reopen`   | 重新打开了工單或合並請求。                                             |
| `review`   | 在合並請求中進行审查的首要评论。                                       |
| `approve`  | 对合並請求進行批准的首要评论。                                         |
| `reject`   | 对合並請求提出更改請求的审查的首要评论。                               |
| `code`     | 关于合並請求的代码的單个评论。                                         |
| `assigned` | 使用者被分配到工單或合並請求。                                           |
| `default`  | 未包括在上述类别中的任何操作，或者当对應类别的模板不存在时使用的模板。 |

特定消息類型的模板路径為：

```sh
custom/templates/mail/{操作類型}/{操作名稱}.tmpl
```

其中 `{操作類型}` 是 `issue` 或 `pull`（针对合並請求），`{操作名稱}` 是上述列出的操作名稱之一。

例如，有关合並請求中的评论的电子邮件的特定模板是：

```sh
custom/templates/mail/pull/comment.tmpl
```

然而，並不需要為每个操作類型/名稱组合建立模板。
使用回退系统来選择适当的模板。在此列表中，将使用 _第一个存在的_ 模板：

- 所需**操作類型**和**操作名稱**的特定模板。
- 操作類型為 `issue` 和所需**操作名稱**的模板。
- 所需**操作類型**和操作名稱為 `default` 的模板。
- 操作類型為` issue` 和操作名稱為 `default` 的模板。

唯一必需的模板是操作類型為 `issue` 操作名稱為 `default` 的模板，除非使用者在 `custom` 目錄中覆盖了它。

## 模板语法

邮件模板是 UTF-8 编码的文本文件，需要遵循以下格式之一：

```
用于主题行的文本和宏
------------
用于邮件正文的文本和宏
```

或者

```
用于邮件正文的文本和宏
```

指定 _主题_ 部分是可選的（因此也是虚线分隔符）。在使用时，_主题_ 和 _邮件正文_ 模板之间的分隔符需要至少三个虚线；分隔符行中不允许使用其他字符。

_主题_ 和 _邮件正文_ 由 [Golang 的模板引擎](https://go.dev/pkg/text/template/) 解析，並提供了為每个通知组装的 _元数据上下文_。上下文包含以下元素：

| 名稱               | 類型             | 可用性         | 用途                                                                                                                                                                    |
| ------------------ | ---------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.FallbackSubject` | string           | 始终可用       | 默认主题行。参见下文。                                                                                                                                                  |
| `.Subject`         | string           | 僅在正文中可用 | 解析后的 _主题_。                                                                                                                                                       |
| `.Body`            | string           | 始终可用       | 工單、合並請求或评论的消息，从 Markdown 解析為 HTML 並進行了清理。請勿与 _邮件正文_ 混淆。                                                                              |
| `.Link`            | string           | 始终可用       | 源工單、合並請求或评论的地址。                                                                                                                                          |
| `.Issue`           | models.Issue     | 始终可用       | 产生通知的工單（或合並請求）。要获取特定于合並請求的数据（例如 `HasMerged`），可以使用 `.Issue.PullRequest`，但需要注意，如果工單 _不是_ 合並請求，则該字段将為 `nil`。 |
| `.Comment`         | models.Comment   | 如果适用       | 如果通知是针对添加到工單或合並請求的评论，则其中包含有关评论的信息。                                                                                                    |
| `.IsPull`          | bool             | 始终可用       | 如果邮件通知与合並請求关联（即 `.Issue.PullRequest` 不為 `nil` ），则為 `true`。                                                                                        |
| `.Repo`            | string           | 始终可用       | 存放庫的名稱，包括所有者名稱（例如 `mike/stuff`）                                                                                                                         |
| `.User`            | models.User      | 始终可用       | 事件来源存放庫的所有者。要获取使用者名（例如 `mike`），可以使用 `.User.Name`。                                                                                              |
| `.Doer`            | models.User      | 始终可用       | 執行触发通知事件的操作的使用者。要获取使用者名（例如 `rhonda`），可以使用 `.Doer.Name`。                                                                                    |
| `.IsMention`       | bool             | 始终可用       | 如果此通知僅是因為在评论中提到了使用者而生成的，並且收件人未订阅源，则為 `true`。如果收件人已订阅工單或存放庫，则為 `false`。                                               |
| `.SubjectPrefix`   | string           | 始终可用       | 如果通知是关于除工單或合並請求建立之外的其他内容，则為 `Re：`；否则為空字符串。                                                                                         |
| `.ActionType`      | string           | 始终可用       | `"issue"` 或 `"pull"`。它将与实际的 _操作類型_ 对應，与選择的模板無关。                                                                                                 |
| `.ActionName`      | string           | 始终可用       | 它将是上述操作類型之一（`new` ，`comment` 等），並与選择的模板对應。                                                                                                    |
| `.ReviewComments`  | []models.Comment | 始终可用       | 审查中的代码评论列表。评论文本将在 `.RenderedContent` 中，引用的代码将在 `.Patch` 中。                                                                                  |

所有名稱区分大小写。

### 模板中的主题部分

用于邮件主题的模板引擎是 Golang 的 [`text/template`](https://go.dev/pkg/text/template/)。
有关语法的详细信息，請参阅链接的文檔。

主题构建的步骤如下：

- 根据通知類型和可用的模板選择一个模板。
- 解析並解析模板（例如，将 `{{.Issue.Index}}` 转换為工單或合並請求的编号）。
- 将所有空格字符（例如 `TAB`，`LF` 等）转换為普通空格。
- 删除所有前导、尾随和多余的空格。
- 将字符串截断為前 256 个字母（字符）。

如果最终结果為空字符串，**或者**没有可用的主题模板（即所選模板不包含主题部分），将使用 Gitea 的**内部默认值**。

内部默认（回退）主题相当于：

```
{{.SubjectPrefix}}[{{.Repo}}] {{.Issue.Title}} (#{{.Issue.Index}})
```

例如：`Re: [mike/stuff] New color palette (#38)`

即使存在有效的主题模板，Gitea 的默认主题也可以在模板的元数据中作為 `.FallbackSubject` 找到。

### 模板中的邮件正文部分

用于邮件正文的模板引擎是 Golang 的 [`html/template`](https://go.dev/pkg/html/template/)。
有关语法的详细信息，請参阅链接的文檔。

邮件正文在邮件主题之后進行解析，因此還有一个额外的 _元数据_ 字段，即在考虑所有情况之后实际呈現的主题。

期望的结果是 HTML（包括结构元素，如`<html>`，`<body>`等）。可以通過 `<style>` 块、`class` 和 `style` 属性進行样式设置。但是，`html/template` 会進行一些 [自动转义](https://go.dev/pkg/html/template/#hdr-Contexts)，需要考虑这一点。

不支持附件（例如图像或外部样式表）。但是，也可以引用其他模板，例如以集中方式提供 `<style>` 元素的内容。外部模板必須放置在 `custom/mail` 下，並相對於該目錄引用。例如，可以使用 `{{template styles/base}}` 包含 `custom/mail/styles/base.tmpl`。

邮件以 `Content-Type: multipart/alternative` 发送，因此正文以 HTML 和文本格式发送。通過剥离 HTML 标记来获取文本版本。

## 故障排除

邮件的呈現方式直接取决于邮件應用程序的功能。许多邮件客户端甚至不支持 HTML，因此显示生成邮件中包含的文本版本。

如果模板無法呈現，则只有在发送邮件时才会注意到。
如果主题模板失败，将使用默认主题，如果从 _邮件正文_ 中成功呈現了任何内容，则将使用該内容，忽略其他内容。

如果遇到问题，請检查 [Gitea 的日志](../administration/logging-config.md) 以获取错误消息。

## 示例

`custom/templates/mail/issue/default.tmpl`:

```html
[{{.Repo}}] @{{.Doer.Name}}
{{if eq .ActionName "new"}}
    建立了
{{else if eq .ActionName "comment"}}
    评论了
{{else if eq .ActionName "close"}}
    关闭了
{{else if eq .ActionName "reopen"}}
    重新打开了
{{else}}
    更新了
{{end}}
{{if eq .ActionType "issue"}}
    工單
{{else}}
    合並請求
{{end}}
#{{.Issue.Index}}: {{.Issue.Title}}
------------
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{.Subject}}</title>
</head>

<body>
    {{if .IsMention}}
    <p>
        您收到此邮件是因為 @{{.Doer.Name}} 提到了您。
    </p>
    {{end}}
    <p>
        <p>
        <a href="{{AppUrl}}/{{.Doer.LowerName}}">@{{.Doer.Name}}</a>
        {{if not (eq .Doer.FullName "")}}
            ({{.Doer.FullName}})
        {{end}}
        {{if eq .ActionName "new"}}
            建立了
        {{else if eq .ActionName "close"}}
            关闭了
        {{else if eq .ActionName "reopen"}}
            重新打开了
        {{else}}
            更新了
        {{end}}
        <a href="{{.Link}}">{{.Repo}}#{{.Issue.Index}}</a>。
        </p>
        {{if not (eq .Body "")}}
            <h3>消息内容：</h3>
            <hr>
            {{.Body}}
        {{end}}
    </p>
    <hr>
    <p>
        <a href="{{.Link}}">在 Gitea 上查看</a>。
    </p>
</body>
</html>
```

該模板将生成以下内容：

### 主题

> [mike/stuff] @rhonda 在合並請求 #38 上進行了评论：New color palette

### 邮件正文

> [@rhonda](#)（Rhonda Myers）更新了 [mike/stuff#38](#)。
>
> #### 消息内容
>
> \_**************\*\*\*\***************\_**************\*\*\*\***************
>
> Mike, I think we should tone down the blues a little.
>
> \_**************\*\*\*\***************\_**************\*\*\*\***************
>
> [在 Gitea 上查看](#)。

## 高级用法

模板系统包含一些函数，可用于進一步处理和格式化消息。以下是其中一些函数的列表：

| 函数名           | 參數        | 可用于     | 用法                                             |
| ---------------- | ----------- | ---------- | ------------------------------------------------ |
| `AppUrl`         | -           | 任何地方   | Gitea 的 URL                                     |
| `AppName`        | -           | 任何地方   | 从 `app.ini` 中设置，通常為 "Gitea"              |
| `AppDomain`      | -           | 任何地方   | Gitea 的主机名                                   |
| `EllipsisString` | string, int | 任何地方   | 将字符串截断為指定长度；根据需要添加省略号       |
| `SanitizeHTML`   | string      | 僅正文部分 | 通過删除其中的危险 HTML 標籤对文本進行清理       |
| `SafeHTML`       | string      | 僅正文部分 | 将输入作為 HTML 处理；可用于输出原始的 HTML 内容 |

这些都是 _函数_，而不是元数据，因此必須按以下方式使用：

```html
像这样使用： {{SanitizeHTML "Escape<my
  >text"}} 或者这样使用： {{"Escape<my
    >text" | SanitizeHTML}} 或者这样使用： {{AppUrl}} 但不要像这样使用：
    {{.AppUrl}}</my
  ></my
>
```
