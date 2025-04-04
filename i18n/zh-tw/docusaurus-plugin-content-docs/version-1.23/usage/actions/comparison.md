---
date: "2023-04-27T15:00:00+08:00"
slug: "comparison"
sidebar_position: 120
---

# 與 GitHub Actions 的比較

儘管 Gitea Actions 設計為與 GitHub Actions 兼容，但它們之間仍存在一些差異。

## 附加功能

### 絕對操作 URL

Gitea Actions 支持通過絕對 URL 定義操作，這意味著您可以使用來自任何 git 倉庫的操作。
例如 `uses: https://github.com/actions/checkout@v4` 或 `uses: http://your_gitea.com/owner/repo@branch`。

### 用 Go 編寫的操作

Gitea Actions 支持用 Go 編寫操作。
請參閱 [創建 Go 操作](https://blog.gitea.com/creating-go-actions/)。

### 支持非標準語法 @yearly, @monthly, @weekly, @daily, @hourly 在計劃中

GitHub Actions 不支持這一點。https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule

## 不支持的工作流程語法

### `concurrency`

用於一次運行一個作業。
請參閱 [使用並發](https://docs.github.com/en/actions/using-jobs/using-concurrency)。

目前 Gitea Actions 忽略它。

### `run-name`

從工作流程生成的工作流程運行的名稱。
請參閱 [GitHub Actions 的工作流程語法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#run-name)。

目前 Gitea Actions 忽略它。

### `permissions` 和 `jobs.<job_id>.permissions`

請參閱 [GitHub Actions 的工作流程語法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#permissions)。

目前 Gitea Actions 忽略它。

### `jobs.<job_id>.timeout-minutes`

請參閱 [GitHub Actions 的工作流程語法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes)。

目前 Gitea Actions 忽略它。

### `jobs.<job_id>.continue-on-error`

請參閱 [GitHub Actions 的工作流程語法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idcontinue-on-error)。

目前 Gitea Actions 忽略它。

### `jobs.<job_id>.environment`

請參閱 [GitHub Actions 的工作流程語法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idenvironment)。

目前 Gitea Actions 忽略它。

### 複雜的 `runs-on`

請參閱 [GitHub Actions 的工作流程語法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on)。

目前 Gitea Actions 只支持 `runs-on: xyz` 或 `runs-on: [xyz]`。

## 缺少的功能

### 包倉庫授權

在倉庫內運行的作業的 `GITEA_TOKEN` 應該能夠發布到相關的包倉庫（即上傳 OCI 映像）。請參閱 [自動令牌身份驗證](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication#permissions-for-the-github_token) 中的“包”範圍的“默認訪問”。

目前 Gitea Actions 尚未實現此功能。Gitea Actions 的一個解決方法是使用個人訪問令牌（PAT）。請參閱此 [github 問題和評論](https://github.com/go-gitea/gitea/issues/23642#issuecomment-2119876692) 以跟踪此功能。

### 問題匹配器

問題匹配器是一種掃描操作輸出以查找指定正則表達式模式並在 UI 中突出顯示該信息的方法。
請參閱 [問題匹配器](https://github.com/actions/toolkit/blob/main/docs/problem-matchers.md)。

目前 Gitea Actions 忽略它。

### 創建錯誤註釋

請參閱 [為錯誤創建註釋](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#example-creating-an-annotation-for-an-error)

目前 Gitea Actions 忽略它。

### 表達式

對於 [表達式](https://docs.github.com/en/actions/learn-github-actions/expressions)，僅支持 [`always()`](https://docs.github.com/en/actions/learn-github-actions/expressions#always)。

## 缺少的 UI 功能

### 預處理和後處理步驟

預處理和後處理步驟在作業日誌用戶界面中沒有自己的部分。

### 服務步驟

服務步驟在作業日誌用戶界面中沒有自己的部分。

## 不同的行為

### 下載操作

以前（1.21.0 之前），`[actions].DEFAULT_ACTIONS_URL` 默認為 `https://gitea.com`。
我們已經限制了此選項僅允許兩個值（`github` 和 `self`）。
當設置為 `github` 時，新的默認值，Gitea 將從 `https://github.com` 下載非完全限定的操作。
例如，如果您使用 `uses: actions/checkout@v4`，它將從 `https://github.com/actions/checkout.git` 下載 checkout 倉庫。

如果您想從其他 git 託管服務器下載操作，可以使用絕對 URL，例如 `uses: https://gitea.com/actions/checkout@v4`。

如果您的 Gitea 實例位於內部網或受限區域，您可以將 URL 設置為 `self`，以便默認僅從您自己的實例下載操作。
當然，您仍然可以在工作流程中使用絕對 URL。

有關 `[actions].DEFAULT_ACTIONS_URL` 配置的更多詳細信息，請參閱 [配置備忘單](../../administration/config-cheat-sheet.md#actions-actions)。

### 上下文可用性

不檢查上下文可用性，因此您可以在更多地方使用 env 上下文。
請參閱 [上下文可用性](https://docs.github.com/en/actions/learn-github-actions/contexts#context-availability)。
