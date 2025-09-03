---
date: "2023-05-24T15:00:00+08:00"
slug: "faq"
sidebar_position: 100
---

# Gitea Actions常见问题解答

本页面包含一些关于Gitea Actions的常见问题和答案。

## 是否可以在我的实例中默认禁用新存放庫的Actions？

是的，当您為实例启用Actions时，您可以選择默认启用actions單元以适用于所有新存放庫。

```ini
[repository]
; 去掉 repo.actions 将不会為新存放庫自动启用actions
DEFAULT_REPO_UNITS = ...,repo.actions
```

## 在工作流文件中應該使用`${{ github.xyz }}`還是`${{ gitea.xyz }}`？

您可以使用`github.xyz`，Gitea将正常工作。
如前所述，Gitea Actions的设计是与GitHub Actions兼容的。
然而，我们建议在工作流文件中使用`gitea.xyz`，以防止在工作流文件中出現不同類型的密钥（因為您在Gitea上使用此工作流，而不是GitHub）。
不過，这完全是可選的，因為目前这两个選项的效果是相同的。

## 使用`actions/checkout@v4`等Actions时，Job容器会从何处下载脚本？

GitHub 上有成千上万个 [Actions 脚本](https://github.com/marketplace?type=actions)。
当您编写 `uses: actions/checkout@v4` 时，它默认会从 [github.com/actions/checkout](https://github.com/actions/checkout) 下载脚本。
那如果您想使用一些托管在其它平台上的脚本呢，比如在 gitea.com 上的？

好消息是，您可以指定要从任何位置使用Actions的URL前缀。
这是Gitea Actions中的额外语法。
例如：

- `uses: https://gitea.com/xxx/xxx@xxx`
- `uses: https://github.com/xxx/xxx@xxx`
- `uses: http://your_gitea_instance.com/xxx@xxx`

注意，`https://`或`http://`前缀是必需的！

这是与 GitHub Actions 的一个区别，GitHub Actions 只允许使用托管在 GitHub 上的 actions 脚本。
但使用者理應拥有权利去灵活决定如何运行 Actions。

另外，如果您希望您的 Runner 默认从您自己的 Gitea 实例下载 Actions，可以通過设置 `[actions].DEFAULT_ACTIONS_URL`進行配置。
参见[配置速查表](../../administration/config-cheat-sheet.md#actions-actions)。

## 如何限制Runner的权限？

Runner僅具有连接到您的Gitea实例的权限。
当任何Runner接收到要运行的Job时，它将临时获得与Job关联的存放庫的有限权限。
如果您想為Runner提供更多权限，允许它访问更多私有存放庫或外部系统，您可以向其传递[密钥](usage/actions/secrets.md)。

對於 Actions 的细粒度权限控制是一项复杂的工作。
在未来，我们将添加更多選项以使Gitea更可配置，例如允许对存放庫進行更多写访问或对同一組織中的所有存放庫進行读访问。

## 如何避免被黑客攻擊？

有两种可能的攻擊類型：未知的Runner窃取您的存放庫中的代码或密钥，或恶意脚本控制您的Runner。

避免前者意味着不允许您不认识的人為您的存放庫、組織或实例注册Runner。

后者要复杂一些。
如果您為公司使用私有的Gitea实例，您可能不需要担心安全问题，因為您信任您的同事，並且可以追究他们的责任。

對於公共实例，情况略有不同。
以下是我们在 [gitea.com](http://gitea.com/)上的做法：

- 我们僅為 "gitea" 組織注册Runner，因此我们的Runner不会執行来自其他存放庫的Job。
- 我们的Runner始终在隔离容器中运行Job。虽然可以直接在主机上進行这样的操作，但出于安全考虑，我们選择不这样做。
- 對於 fork 的拉取請求，需要获得批准才能运行Actions。参见[#22803](https://github.com/go-gitea/gitea/pull/22803)。
- 如果有人在[gitea.com](http://gitea.com/)為其存放庫或組織注册自己的Runner，我们不会反对，只是不会在我们的組織中使用它。然而，他们應該注意确保該Runner不被他们不认识的其他使用者使用。

## act runner支持哪些操作系统？

它在Linux、macOS和Windows上运行良好。
虽然理论上支持其他操作系统，但需要進一步测试。

需要注意的一点是，如果選择直接在主机上运行Job而不是在Job容器中运行，操作系统之间的环境差异可能会导致意外的失败。

例如，在大多数情况下，Windows上没有可用的bash，而act尝试默认使用bash运行脚本。
因此，您需要在工作流文件中将默认shell指定為`powershell`，参考[defaults.run](https://docs.github.com/zh/actions/using-workflows/workflow-syntax-for-github-actions#defaultsrun)。

```yaml
defaults:
  run:
    shell: powershell
```

## 為什么選择GitHub Actions？為什么不選择与GitLab CI/CD兼容的工具？

[@lunny](https://gitea.com/lunny)在实現Actions的[问题](https://github.com/go-gitea/gitea/issues/13539)中已经解释過这个问题。
此外，Actions不僅是一个CI/CD 系统，還是一个自动化工具。

在开源世界中，已经有许多[市场上的Actions](https://github.com/marketplace?type=actions)实現了。
能够重用它们是令人兴奋的。

## 如果它在多个標籤上运行，例如 `runs-on: [label_a, label_b]`，会发生什么？

这是有效的语法。
它意味着它應該在具有`label_a` **和** `label_b`標籤的Runner上运行，参考[GitHub Actions的工作流语法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on)。
不幸的是，act runner 並不支持这种方式。
如上所述，我们将標籤映射到环境：

- `ubuntu` → `ubuntu:22.04`
- `centos` → `centos:8`

但我们需要将標籤组映射到环境，例如：

- `[ubuntu]` → `ubuntu:22.04`
- `[with-gpu]` → `linux:with-gpu`
- `[ubuntu, with-gpu]` → `ubuntu:22.04_with-gpu`

我们還需要重新设计任务分配给Runner的方式。
具有`ubuntu`、`centos`或`with-gpu`的Runner並不一定表示它可以接受`[centos, with-gpu]`的Job。
因此，Runner應該通知Gitea实例它只能接受具有 `[ubuntu]`、`[centos]`、`[with-gpu]` 和 `[ubuntu, with-gpu]`的Job。
这不是一个技术问题，只是在早期设计中被忽视了。
参见[runtime.go#L65](https://gitea.com/gitea/act_runner/src/commit/90b8cc6a7a48f45cc28b5ef9660ebf4061fcb336/runtime/runtime.go#L65)。

目前，act runner尝试匹配標籤中的每一个，並使用找到的第一个匹配项。

## 代理標籤和自定义標籤對於Runner有什么区别？

![labels](/images/usage/actions/labels.png)

代理標籤是由Runner在注册過程中向Gitea实例报告的。
而自定义標籤则是由Gitea的管理员或組織或存放庫的所有者手动添加的（取决于Runner所属的级别）。

然而，目前这方面的设计還有待改進，因為它目前存在一些不完善之处。
您可以向已注册的Runner添加自定义標籤，比如 `centos`，这意味着該Runner将接收具有`runs-on: centos`的Job。
然而，Runner可能不知道要使用哪个环境来執行該標籤，导致它使用默认镜像或导致逻辑死胡同。
这个默认值可能与使用者的期望不符。
参见[runtime.go#L71](https://gitea.com/gitea/act_runner/src/commit/90b8cc6a7a48f45cc28b5ef9660ebf4061fcb336/runtime/runtime.go#L71)。

与此同时，如果您想更改Runner的標籤，我们建议您重新注册Runner。

## Gitea Actions runner会有更多的实現吗？

虽然我们希望提供更多的選择，但由于我们有限的人力资源，act runner将是唯一受支持的官方Runner。
然而，無论您如何决定，Gitea 和act runner都是完全开源的，所以任何人都可以建立一个新的/更好的实現。
我们支持您的選择，無论您如何决定。
如果您選择分支act runner来建立自己的版本，請在您认為您的更改对其他人也有帮助的情况下贡献这些更改。

## Gitea 支持哪些工作流触发事件？

表格中列出的所有事件都是支持的，並且与 GitHub 兼容。
對於僅 GitHub 支持的事件，請参阅 GitHub 的[文檔](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)。

| 触发事件                    | 活动類型                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------|
| create                      | 不适用                                                                                                                   |
| delete                      | 不适用                                                                                                                   |
| fork                        | 不适用                                                                                                                   |
| gollum                      | 不适用                                                                                                                   |
| push                        | 不适用                                                                                                                   |
| issues                      | `opened`, `edited`, `closed`, `reopened`, `assigned`, `unassigned`, `milestoned`, `demilestoned`, `labeled`, `unlabeled` |
| issue_comment               | `created`, `edited`, `deleted`                                                                                           |
| pull_request                | `opened`, `edited`, `closed`, `reopened`, `assigned`, `unassigned`, `synchronize`, `labeled`, `unlabeled`                |
| pull_request_review         | `submitted`, `edited`                                                                                                    |
| pull_request_review_comment | `created`, `edited`                                                                                                      |
| release                     | `published`, `edited`                                                                                                    |
| registry_package            | `published`                                                                                                              |

> 對於 `pull_request` 事件，在 [GitHub Actions](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) 中 `ref` 是 `refs/pull/:prNumber/merge`，它指向这个拉取請求合並提交的一个预览。但是 Gitea 没有这种 reference。
> 因此，Gitea Actions 中 `ref` 是 `refs/pull/:prNumber/head`，它指向这个拉取請求的头分支而不是合並提交的预览。
