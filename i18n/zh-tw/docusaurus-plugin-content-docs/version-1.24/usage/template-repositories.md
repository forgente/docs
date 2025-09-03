---
date: "2023-05-23T09:00:00+08:00"
slug: "template-repositories"
sidebar_position: 14
aliases:
  - /zh-tw/template-repositories
---

# 模板存放庫

Gitea `1.11.0` 及以上版本引入了模板存放庫，並且其中一个实現的功能是自动展开模板文件中的特定变量。

要告诉 Gitea 哪些文件需要展开，您必須在模板存放庫的 `.gitea` 目錄中包含一个 `template` 文件。

Gitea 使用 [gobwas/glob](https://github.com/gobwas/glob) 作為其 glob 语法。它与传统的 `.gitignore` 语法非常相似，但可能存在细微的差异。

## `.gitea/template` 文件示例

所有路径都是相對於存放庫的根目錄

```gitignore
# 存放庫中的所有 .go 文件
**.go

# text 目錄中的所有文本文件
text/*.txt

# 特定文件
a/b/c/d.json

# 匹配批处理文件的大小写变體
**.[bB][aA][tT]
```

**注意：** 当从模板生成存放庫时，`.gitea` 目錄中的 `template` 文件将被删除。

## 參數展开

在与上述通配符匹配的任何文件中，将会扩展某些变量。

文件名和路径的匹配也可以被扩展，並且会经過谨慎的清理处理，以支持跨平台的文件系统。

所有变量都必須采用`$VAR`或`${VAR}`的形式。要转义扩展，使用双重`$$`，例如`$$VAR`或`$${VAR}`。

| 变量                 | 扩展為                        | 可转换 |
| -------------------- | ----------------------------- | ------ |
| REPO_NAME            | 生成的存放庫名稱                | ✓      |
| TEMPLATE_NAME        | 模板存放庫名稱                  | ✓      |
| REPO_DESCRIPTION     | 生成的存放庫描述                | ✘      |
| TEMPLATE_DESCRIPTION | 模板存放庫描述                  | ✘      |
| REPO_OWNER           | 生成的存放庫所有者              | ✓      |
| TEMPLATE_OWNER       | 模板存放庫所有者                | ✓      |
| REPO_LINK            | 生成的存放庫链接                | ✘      |
| TEMPLATE_LINK        | 模板存放庫链接                  | ✘      |
| REPO_HTTPS_URL       | 生成的存放庫的 HTTP(S) 克隆链接 | ✘      |
| TEMPLATE_HTTPS_URL   | 模板存放庫的 HTTP(S) 克隆链接   | ✘      |
| REPO_SSH_URL         | 生成的存放庫的 SSH 克隆链接     | ✘      |
| TEMPLATE_SSH_URL     | 模板存放庫的 SSH 克隆链接       | ✘      |

## 转换器 :robot:

Gitea `1.12.0` 添加了一些转换器以應用于上述适用的变量。

例如，要以 `PASCAL`-case 获取 `REPO_NAME`，你的模板應使用 `${REPO_NAME_PASCAL}`

将 `go-sdk` 传递给可用的转换器的效果如下...

| 转换器 | 效果   |
| ------ | ------ |
| SNAKE  | go_sdk |
| KEBAB  | go-sdk |
| CAMEL  | goSdk  |
| PASCAL | GoSdk  |
| LOWER  | go-sdk |
| UPPER  | GO-SDK |
| TITLE  | Go-Sdk |
