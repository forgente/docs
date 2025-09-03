---
date: "2023-05-23T09:00:00+08:00"
slug: "protected-tags"
sidebar_position: 45
aliases:
  - /zh-tw/protected-tags
---

# 受保护的標籤

受保护的標籤允许控制谁有权限建立或更新 Git 標籤。每个規則可以匹配單个標籤名稱，或者使用适当的模式来同时控制多个標籤。

## 设置受保护的標籤

要保护一个標籤，你需要按照以下步骤進行操作：

1. 進入存放庫的**设置** > **標籤**页面。
2. 输入一个用于匹配名稱的模式。你可以使用單个名稱、[glob 模式](https://pkg.go.dev/github.com/gobwas/glob#Compile) 或正则表达式。
3. 選择允许的使用者和/或团队。如果将这些字段留空，则不允许任何人建立或修改此標籤。
4. 選择**保存**以保存配置。

## 模式受保护的標籤

該模式使用 [glob](https://pkg.go.dev/github.com/gobwas/glob#Compile) 或正则表达式来匹配標籤名稱。對於正则表达式，你需要将模式括在斜杠中。

示例：

| 類型  | 模式受保护的標籤         | 可能匹配的標籤                          |
| ----- | ------------------------ | --------------------------------------- |
| Glob  | `v*`                     | `v`，`v-1`，`version2`                  |
| Glob  | `v[0-9]`                 | `v0`，`v1` 到 `v9`                      |
| Glob  | `*-release`              | `2.1-release`，`final-release`          |
| Glob  | `gitea`                  | 僅限 `gitea`                            |
| Glob  | `*gitea*`                | `gitea`，`2.1-gitea`，`1_gitea-release` |
| Glob  | `{v,rel}-*`              | `v-`，`v-1`，`v-final`，`rel-`，`rel-x` |
| Glob  | `*`                      | 匹配所有可能的標籤名稱                  |
| Regex | `/\Av/`                  | `v`，`v-1`，`version2`                  |
| Regex | `/\Av[0-9]\z/`           | `v0`，`v1` 到 `v9`                      |
| Regex | `/\Av\d+\.\d+\.\d+\z/`   | `v1.0.17`，`v2.1.0`                     |
| Regex | `/\Av\d+(\.\d+){0,2}\z/` | `v1`，`v2.1`，`v1.2.34`                 |
| Regex | `/-release\z/`           | `2.1-release`，`final-release`          |
| Regex | `/gitea/`                | `gitea`，`2.1-gitea`，`1_gitea-release` |
| Regex | `/\Agitea\z/`            | 僅限 `gitea`                            |
| Regex | `/^gitea$/`              | 僅限 `gitea`                            |
| Regex | `/\A(v\|rel)-/`          | `v-`，`v-1`，`v-final`，`rel-`，`rel-x` |
| Regex | `/.+/`                   | 匹配所有可能的標籤名稱                  |
