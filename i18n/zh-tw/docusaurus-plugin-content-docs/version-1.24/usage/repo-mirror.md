---
date: "2023-05-23T09:00:00+08:00"
slug: "repo-mirror"
sidebar_position: 45
aliases:
  - /zh-tw/repo-mirror
---

# 存放庫镜像

存放庫镜像允许将存放庫与外部源之间進行镜像。您可以使用它在存放庫之间镜像分支、標籤和提交。

## 使用场景

以下是一些存放庫镜像的可能使用场景：

- 您迁移到了 Gitea，但仍需要在其他源中保留您的项目。在这种情况下，您可以简單地设置它以進行镜像到 Gitea（拉取），这样您的 Gitea 实例中就可以获取到所有必要的提交历史、標籤和分支。
- 您在其他源中有一些旧项目，您不再主动使用，但出于归檔目的不想删除。在这种情况下，您可以建立一个推送镜像，以便您的活跃的 Gitea 存放庫可以将其更改推送到旧位置。

## 从远程存放庫拉取

對於現有的远程存放庫，您可以按照以下步骤设置拉取镜像：

1. 在右上角的“建立...”菜單中選择“迁移外部存放庫”。
2. 選择远程存放庫服务。
3. 输入存放庫的 URL。
4. 如果存放庫需要身份驗證，請填写您的身份驗證信息。
5. 選中“該存放庫将是一个镜像”复選框。
6. 選择“迁移存放庫”以保存配置。

現在，該存放庫会定期从远程存放庫進行镜像。您可以通過在存放庫设置中選择“立即同步”来强制進行同步。

:::warning
:exclamation::exclamation: **注意：**您只能為尚不存在于您的实例上的存放庫设置拉取镜像。一旦存放庫建立成功，您就無法再将其转换為拉取镜像。:exclamation::exclamation:
:::

## 推送到远程存放庫

對於現有的存放庫，您可以按照以下步骤设置推送镜像：

1. 在存放庫中，转到**设置** > **存放庫**，然后進入**镜像设置**部分。
2. 输入一个存放庫的 URL。
3. 如果存放庫需要身份驗證，請展开**授权**部分並填写您的身份驗證信息。請注意，所請求的**密碼**也可以是您的访问令牌。
4. 選择**添加推送镜像**以保存配置。

該存放庫現在会定期镜像到远程存放庫。您可以通過選择**立即同步**来强制同步。如果出現错误，会显示一条消息帮助您解决问题。

:::warning
:exclamation::exclamation: **注意：** 这将强制推送到远程存放庫。这将覆盖远程存放庫中的任何更改！ :exclamation::exclamation:
:::

### 从 Gitea 向 GitHub 设置推送镜像

要从 Gitea 设置镜像到 GitHub，您需要按照以下步骤進行操作：

1. 建立一个具有選中 _public_repo_ 選项的 [GitHub 个人访问令牌](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)。
2. 在 GitHub 上建立一个同名的存放庫。与 Gitea 不同，GitHub 不支持通過推送到远程来建立存放庫。如果您的現有远程存放庫与您的 Gitea 存放庫具有相同的提交历史，您也可以使用現有的远程存放庫。
3. 在您的 Gitea 存放庫设置中，填写**Git 远程存放庫 URL**：`https://github.com/<your_github_group>/<your_github_project>.git`。
4. 使用您的 GitHub 使用者名填写**授权**字段，並将个人访问令牌作為**密碼**。
5. （可選，适用于 Gitea 1.18+）選择`当推送新提交时同步`，这样一旦有更改，镜像将会及时更新。如果您愿意，您還可以禁用定期同步。
6. 選择**添加推送镜像**以保存配置。

存放庫会很快進行推送。要强制推送，請選择**立即同步**按钮。

### 从 Gitea 向 GitLab 设置推送镜像

要从 Gitea 设置镜像到 GitLab，您需要按照以下步骤進行操作：

1. 建立具有 _write_repository_ 作用域的 [GitLab 个人访问令牌](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。
2. 填写**Git 远程存放庫 URL**：`https://<destination host>/<your_gitlab_group_or_name>/<your_gitlab_project>.git`。
3. 在**授权**字段中填写 `oauth2` 作為**使用者名**，並将您的 GitLab 个人访问令牌作為**密碼**。
4. 選择**添加推送镜像**以保存配置。

存放庫会很快進行推送。要强制推送，請選择**立即同步**按钮。

### 从 Gitea 向 Bitbucket 设置推送镜像

要从 Gitea 设置镜像到 Bitbucket，您需要按照以下步骤進行操作：

1. 建立一个具有選中 _Repository Write_ 選项的 [Bitbucket 應用密碼](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/)。
2. 填写**Git 远程存放庫 URL**：`https://bitbucket.org/<your_bitbucket_group_or_name>/<your_bitbucket_project>.git`。
3. 使用您的 Bitbucket 使用者名填写**授权**字段，並将應用密碼作為**密碼**。
4. 選择**添加推送镜像**以保存配置。

存放庫会很快進行推送。要强制推送，請選择**立即同步**按钮。

### 镜像現有的 ssh 存放庫

当前，Gitea 不支持从 ssh 存放庫進行镜像。如果您想要镜像一个 ssh 存放庫，您需要将其转换為 http 存放庫。您可以使用以下命令将現有的 ssh 存放庫转换為 http 存放庫：

1. 确保运行 gitea 的使用者有权限访问您试图从 shell 镜像到的 git 存放庫。
2. 在 Web 界面的版本库设置 > git 钩子中為镜像添加一个接收后钩子。

```
#!/usr/bin/env bash
git push --mirror --quiet git@github.com:username/repository.git &>/dev/null &
echo "GitHub mirror initiated .."
```
