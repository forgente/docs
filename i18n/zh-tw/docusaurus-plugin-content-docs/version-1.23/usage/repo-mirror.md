---
date: "2021-05-13T00:00:00-00:00"
slug: "repo-mirror"
sidebar_position: 45
aliases:
  - /zh-tw/repo-mirror
---

# 倉庫鏡像

倉庫鏡像允許將倉庫與外部來源進行鏡像。您可以使用它在倉庫之間鏡像分支、標籤和提交。

## 用例

以下是倉庫鏡像的一些可能用例：

- 您已遷移到 Gitea，但仍需要將項目保留在另一個來源中。在這種情況下，您可以簡單地設置為鏡像到 Gitea（拉取），所有提交、標籤和分支的歷史記錄都將在您的 Gitea 實例中可用。
- 您在另一個來源中有舊項目，您不再積極使用它們，但不想刪除以進行存檔。在這種情況下，您可以創建一個推送鏡像，以便您的活動 Gitea 倉庫可以將其更改推送到舊位置。

## 從遠程倉庫拉取

對於現有的遠程倉庫，您可以按以下步驟設置拉取鏡像：

1. 在右上角的 **創建...** 菜單中選擇 **新建遷移**。
2. 選擇遠程倉庫服務。
3. 輸入倉庫 URL。
4. 如果倉庫需要身份驗證，請填寫您的身份驗證信息。
5. 勾選 **此倉庫將成為鏡像**。
6. 選擇 **遷移倉庫** 以保存配置。

現在，倉庫將定期從遠程倉庫鏡像。您可以在倉庫設置中選擇 **立即同步** 來強制同步。

:::warning
:exclamation::exclamation: 您只能為尚不存在於您的實例中的倉庫設置拉取鏡像。一旦倉庫創建，您將無法將其轉換為拉取鏡像。 :exclamation::exclamation:
:::

## 推送到遠程倉庫

對於現有倉庫，您可以按以下步驟設置推送鏡像：

1. 在您的倉庫中，轉到 **設置** > **倉庫**，然後轉到 **鏡像設置** 部分。
2. 輸入倉庫 URL。
3. 如果倉庫需要身份驗證，請展開 **授權** 部分並填寫您的身份驗證信息。請注意，請求的 **密碼** 也可以是您的訪問令牌。
4. 選擇 **添加推送鏡像** 以保存配置。

現在，倉庫將定期鏡像到遠程倉庫。您可以選擇 **立即同步** 來強制同步。如果出現錯誤，將顯示一條消息以幫助您解決問題。

:::warning
:exclamation::exclamation: 這將強制推送到遠程倉庫。這將覆蓋遠程倉庫中的任何更改！ :exclamation::exclamation:
:::

### 從 Gitea 到 GitHub 設置推送鏡像

要從 Gitea 設置到 GitHub 的鏡像，您需要按照以下步驟操作：

1. 創建一個 [GitHub 個人訪問令牌](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)，並勾選 _public_repo_ 框。如果您的倉庫使用 GitHub Actions 進行持續集成，還請勾選 **workflow** 框。
2. 在 GitHub 上創建一個具有該名稱的倉庫。與 Gitea 不同，GitHub 不支持通過推送創建倉庫。如果它具有與您的 Gitea 倉庫相同的提交歷史記錄，您也可以使用現有的遠程倉庫。
3. 在您的 Gitea 倉庫設置中，填寫 **Git 遠程倉庫 URL**：`https://github.com/<your_github_group>/<your_github_project>.git`。
4. 使用您的 GitHub 用戶名和個人訪問令牌作為 **密碼** 填寫 **授權** 字段。
5. （可選，適用於 Gitea 1.18+）選擇 `推送新提交時同步`，以便鏡像在有更改時也會更新。您也可以禁用定期同步。
6. 選擇 **添加推送鏡像** 以保存配置。

倉庫隨後會很快推送。要強制推送，選擇 **立即同步** 按鈕。

### 從 Gitea 到 GitLab 設置推送鏡像

要從 Gitea 設置到 GitLab 的鏡像，您需要按照以下步驟操作：

1. 創建一個 [GitLab 個人訪問令牌](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)，並勾選 _write_repository_ 範圍。
2. 填寫 **Git 遠程倉庫 URL**：`https://<destination host>/<your_gitlab_group_or_name>/<your_gitlab_project>.git`。
3. 使用 `oauth2` 作為 **用戶名** 和您的 GitLab 個人訪問令牌作為 **密碼** 填寫 **授權** 字段。
4. 選擇 **添加推送鏡像** 以保存配置。

倉庫隨後會很快推送。要強制推送，選擇 **立即同步** 按鈕。

### 從 Gitea 到 Bitbucket 設置推送鏡像

要從 Gitea 設置到 Bitbucket 的鏡像，您需要按照以下步驟操作：

1. 創建一個 [Bitbucket 應用密碼](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/)，並勾選 _Repository Write_ 框。
2. 填寫 **Git 遠程倉庫 URL**：`https://bitbucket.org/<your_bitbucket_group_or_name>/<your_bitbucket_project>.git`。
3. 使用您的 Bitbucket 用戶名和應用密碼作為 **密碼** 填寫 **授權** 字段。
4. 選擇 **添加推送鏡像** 以保存配置。

倉庫隨後會很快推送。要強制推送，選擇 **立即同步** 按鈕。

### 鏡像現有的 ssh 倉庫

目前 Gitea 不支持 ssh 推送鏡像。您可以通過向您的 Gitea 倉庫添加一個 `post-receive` 鉤子來手動推送來解決此問題。

1. 確保運行 Gitea 的用戶可以從 shell 訪問您嘗試鏡像到的 git 倉庫。
2. 在 Web 界面的倉庫設置 > git 鉤子中，為鏡像添加一個 post-receive 鉤子。例如：

```
#!/usr/bin/env bash
git push --mirror --quiet git@github.com:username/repository.git &>/dev/null &
echo "GitHub 鏡像已啟動 .."
```
