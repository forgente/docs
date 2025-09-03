---
date: "2023-05-23T09:00:00+08:00"
slug: "push"
sidebar_position: 15
aliases:
  - /zh-tw/push-to-create
  - /zh-tw/push-options
---

# 推送

在将提交推送到 Gitea 服务器时，還有一些额外的功能。

## 通過推送打开 PR

当您第一次将提交推送到非默认分支时，您将收到一个链接，您可以單擊該链接访问分支与主分支的比较页面。
从那里，您可以轻松建立一个拉取請求，即使您想要将其目标指向另一个分支。

![Gitea 推送提示](/gitea-push-hint.png)

## 推送選项

在 Gitea `1.13` 版本中，添加了对一些 [推送選项](https://git-scm.com/docs/git-push#Documentation/git-push.txt--oltoptiongt) 的支持。

### 支持的選项

- `repo.private` (true|false) - 更改存放庫的可见性。

  这在与 push-to-create 结合使用时特别有用。

- `repo.template` (true|false) - 更改存放庫是否為模板。

将存放庫的可见性更改為公开的示例：

```shell
git push -o repo.private=false -u origin main
```

## 推送建立

推送建立是一项功能，允许您将提交推送到在 Gitea 中尚不存在的存放庫。这對於自动化和允许使用者建立存放庫而無需通過 Web 界面非常有用。此功能默认处于禁用状态。

### 启用推送建立

在 `app.ini` 文件中，将 `ENABLE_PUSH_CREATE_USER` 设置為 `true`，如果您希望允许使用者在自己的使用者帳戶和所属的組織中建立存放庫，将 `ENABLE_PUSH_CREATE_ORG` 设置為 `true`。重新启动 Gitea 以使更改生效。您可以在 [配置速查表](../administration/config-cheat-sheet.md#存放庫) 中了解有关这两个選项的更多信息。

### 使用推送建立

假设您在当前目錄中有一个 git 存放庫，您可以通過运行以下命令将提交推送到在 Gitea 中尚不存在的存放庫：

```shell
# 添加要推送到的远程存放庫
git remote add origin git@{domain}:{username}/{尚不存在的存放庫名稱}.git

# 推送到远程存放庫
git push -u origin main
```

这假设您使用的是 SSH 远程，但您也可以使用 HTTPS 远程。

推送建立将默认使用 `app.ini` 中定义的可见性 `DEFAULT_PUSH_CREATE_PRIVATE`。
