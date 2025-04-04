---
date: "2023-06-01T08:40:00+08:00"
slug: "oauth2-provider"
sidebar_position: 41
aliases:
  - /zh-tw/oauth2-provider
---

# OAuth2 提供者

Gitea 支援作為 OAuth2 提供者，允許第三方應用程式在用戶同意的情況下訪問其資源。

當作為 OAuth2 提供者時，Gitea 會針對相關的 OAuth2 應用程式驗證每個授權請求。此應用程式可以由個別用戶、組織管理員或 Gitea 實例管理員設置。

無論是誰配置的應用程式，第一次授權嘗試都會在用戶的網頁瀏覽器中打開一個新頁面，提示他們授權應用程式。

## 配置

Gitea 中的 OAuth2 應用程式需要以下兩步配置：

### Gitea 步驟 1

- 名稱 (`/admin/applications/`)
- 重定向 URL (`/admin/applications/`)

![](/development/gitea_oauth2_step1.png)

### Gitea 步驟 2

- 客戶端 ID (`/admin/applications/oauth2/_id_`)
- 客戶端密鑰 (`/admin/applications/oauth2/_id_`)
- 機密客戶端狀態 (`/admin/applications/oauth2/_id_`)

![](/development/gitea_oauth2_step2.png)

### 第三方步驟 3

第三方（中繼方）應用程式的請求必須包括：

- 憑證（客戶端 ID 和客戶端密鑰）
- 所需的範圍和聲明（預期由 Gitea 提供）

MinIO 的示例：

![](/development/minio_oauth2.png)

### Gitea 的用戶批准步驟 3

例如，使用 Gitea 帳戶登錄 MinIO...
![](/development/minio_login.png)

...在成功登錄後將顯示批准彈出窗口：
![](/development/gitea_approval.png)

默認情況下，如果第三方設置範圍為 `openid`、`email`、`profile` 和 `groups`，並且用戶批准，應用程式將獲得用戶所有公共和私人資源（倉庫、問題、用戶信息等）的完全訪問權限。

> **注意：** 目前，如果期望限制訪問，設置 Gitea 中的 OAuth2 應用程式的管理員必須依賴第三方發送的範圍和知情用戶的批准決定。在應用程式設置過程中，管理員無法通過範圍設置限制訪問。

## 細粒度範圍

從 v1.23 版本開始，Gitea 支援細粒度範圍，允許第三方請求更有限的訪問權限。這些範圍以前僅適用於[個人訪問令牌](#scopes)，使用戶能夠限制對特定 URL 路徑的訪問。

範圍按高級 API 路徑分組，並進一步細化如下：

- `read`：`GET` 路徑
- `write`：`POST`、`PUT`、`PATCH` 和 `DELETE` 路徑（以及 `GET`）

例如，第三方可以請求最小訪問權限，允許 Gitea 作為簡單的 OpenID Connect (OIDC) 提供者。如果第三方僅添加 `public-only` 到 'openid'，不添加其他或任何組合的範圍 `email`、`userinfo` 或 `groups`，Gitea 將作為基本的單一登錄提供者。此配置僅提供用戶可以使用正確憑證登錄的驗證，僅提供基本信息，如用戶名、電子郵件和公共組織和團隊成員資格列表。

當引入任何來自個人訪問令牌的細粒度範圍時，Gitea 將不允許完全訪問（如默認情況下）。相反，它將根據對倉庫、問題、ActivityPub、管理功能、組織、用戶、包或其他功能的讀寫權限構建細粒度訪問。

> **注意：** 如果第三方添加任何範圍以外的 OIDC 範圍：`openid`、`email`、`profile` 和 `groups` 或已在個人訪問令牌中找到的範圍，範圍將回退到完全訪問，如 v1.23 之前的情況。

顯示給用戶的批准頁面顯示第三方請求的範圍列表。一旦批准，此決定將被記住。如果第三方在未來的請求中更改其請求的範圍，整個流程將失敗，需要重新授權。

## 端點

| 端點                    | URL                                 |
| ----------------------- | ----------------------------------- |
| OpenID Connect 發現     | `/.well-known/openid-configuration` |
| 授權端點                | `/login/oauth/authorize`            |
| 訪問令牌端點            | `/login/oauth/access_token`         |
| OpenID Connect 用戶信息 | `/login/oauth/userinfo`             |
| JSON Web 密鑰集         | `/login/oauth/keys`                 |

## 支援的 OAuth2 授權

目前 Gitea 只支援 [**授權碼授權**](https://tools.ietf.org/html/rfc6749#section-1.3.1) 標準，並額外支援以下擴展：

- [代碼交換的證明密鑰 (PKCE)](https://tools.ietf.org/html/rfc7636)
- [OpenID Connect (OIDC)](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)

要作為第三方應用程式使用授權碼授權，需要通過設置中的“應用程式” (`/user/settings/applications`) 部分註冊新應用程式。要測試或調試，你可以使用網頁工具 https://oauthdebugger.com/。

## 範圍

Gitea 支援範圍訪問令牌，允許用戶限制令牌僅在選定的 URL 路徑上操作。範圍按高級 API 路徑分組，並進一步細化如下：

- `read`：`GET` 路徑
- `write`：`POST`、`PUT`、`PATCH` 和 `DELETE` 路徑（以及 `GET`）

Gitea 令牌範圍如下：

| 名稱                                      | 描述                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| **（無範圍）**                            | 不支援。即使是公共倉庫也需要範圍。                                                |
| **activitypub**                           | `activitypub` API 路徑：ActivityPub 相關操作。                                    |
| &nbsp;&nbsp;&nbsp; **read:activitypub**   | 授予 ActivityPub 操作的讀取訪問權限。                                             |
| &nbsp;&nbsp;&nbsp; **write:activitypub**  | 授予 ActivityPub 操作的讀寫/刪除訪問權限。                                        |
| **admin**                                 | `/admin/*` API 路徑：全站管理操作（對非管理帳戶隱藏）。                           |
| &nbsp;&nbsp;&nbsp; **read:admin**         | 授予管理操作的讀取訪問權限，例如獲取計劃任務或註冊用戶電子郵件。                  |
| &nbsp;&nbsp;&nbsp; **write:admin**        | 授予管理操作的讀寫/刪除訪問權限，例如運行計劃任務或更新用戶帳戶。                 |
| **issue**                                 | `issues/*`、`labels/*`、`milestones/*` API 路徑：問題相關操作。                   |
| &nbsp;&nbsp;&nbsp; **read:issue**         | 授予問題操作的讀取訪問權限，例如獲取問題評論、問題附件和里程碑。                  |
| &nbsp;&nbsp;&nbsp; **write:issue**        | 授予問題操作的讀寫/刪除訪問權限，例如發布或編輯問題評論或附件，並更新里程碑。     |
| **misc**                                  | 保留供未來使用。                                                                  |
| &nbsp;&nbsp;&nbsp; **read:misc**          | 保留供未來使用。                                                                  |
| &nbsp;&nbsp;&nbsp; **write:misc**         | 保留供未來使用。                                                                  |
| **notification**                          | `notification/*` API 路徑：用戶通知操作。                                         |
| &nbsp;&nbsp;&nbsp; **read:notification**  | 授予用戶通知的讀取訪問權限，例如用戶訂閱的通知和閱讀新通知。                      |
| &nbsp;&nbsp;&nbsp; **write:notification** | 授予用戶通知的讀寫/刪除訪問權限，例如將通知標記為已讀。                           |
| **organization**                          | `orgs/*` 和 `teams/*` API 路徑：組織和團隊管理操作。                              |
| &nbsp;&nbsp;&nbsp; **read:organization**  | 授予組織和團隊狀態的讀取訪問權限，例如列出用戶可見的所有組織、團隊和團隊成員。    |
| &nbsp;&nbsp;&nbsp; **write:organization** | 授予組織和團隊狀態的讀寫/刪除訪問權限，例如創建和更新團隊以及更新組織設置。       |
| **package**                               | `/packages/*` API 路徑：包操作                                                    |
| &nbsp;&nbsp;&nbsp; **read:package**       | 授予包操作的讀取訪問權限，例如閱讀和下載可用的包。                                |
| &nbsp;&nbsp;&nbsp; **write:package**      | 授予包操作的讀寫/刪除訪問權限。目前與 `read:package` 相同。                       |
| **repository**                            | `/repos/*` API 路徑，除了 `/repos/issues/*`：倉庫文件、拉取請求和發佈操作。       |
| &nbsp;&nbsp;&nbsp; **read:repository**    | 授予倉庫操作的讀取訪問權限，例如獲取倉庫文件、發佈、協作者。                      |
| &nbsp;&nbsp;&nbsp; **write:repository**   | 授予倉庫操作的讀寫/刪除訪問權限，例如獲取更新倉庫文件、創建拉取請求、更新協作者。 |
| **user**                                  | `/user/*` 和 `/users/*` API 路徑：用戶相關操作。                                  |
| &nbsp;&nbsp;&nbsp; **read:user**          | 授予用戶操作的讀取訪問權限，例如獲取用戶倉庫訂閱和用戶設置。                      |
| &nbsp;&nbsp;&nbsp; **write:user**         | 授予用戶操作的讀寫/刪除訪問權限，例如更新用戶倉庫訂閱、關注的用戶和用戶設置。     |

## 預配置應用程式

Gitea 在啟動時默認為以下服務創建 OAuth 應用程式，因為我們認為這些應用程式是普遍有用的。

| 應用程式                                                                          | 描述         | 客戶端 ID                              |
| --------------------------------------------------------------------------------- | ------------ | -------------------------------------- |
| [git-credential-oauth](https://github.com/hickford/git-credential-oauth)          | Git 憑證助手 | `a4792ccc-144e-407e-86c9-5e7d8d9c3269` |
| [Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager) | Git 憑證助手 | `e90ee53c-94e2-48ac-9358-a874fb9e0662` |
| [tea](https://gitea.com/gitea/tea)                                                | tea          | `d57cb8c4-630c-4168-8324-ec79935e18d4` |

為防止意外行為，它們在 UI 中顯示為鎖定，其創建可以通過 `app.ini` 中的 `DEFAULT_APPLICATIONS` 參數進行控制。

## 客戶端類型

Gitea 支援機密和公共客戶端類型，[如 RFC 6749 定義](https://datatracker.ietf.org/doc/html/rfc6749#section-2.1)。

對於公共客戶端，重定向 URI 為回送 IP 地址，例如 `http://127.0.0.1/` 允許任何端口。避免使用 `localhost`，[如 RFC 8252 建議](https://datatracker.ietf.org/doc/html/rfc8252#section-8.3)。

## 示例

### 機密客戶端

:::note
此示例不使用 PKCE。
:::

1. 將用戶重定向到授權端點以獲取他們對訪問資源的同意：

   ```curl
   https://[YOUR-GITEA-URL]/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&state=STATE
   ```

   可以通過在設置中註冊應用程式獲取 `CLIENT_ID`。`STATE` 是一個隨機字串，將在用戶授權後發送回你的應用程式。`state` 參數是可選的，但應該用於防止 CSRF 攻擊。

   ![授權頁面](/authorize.png)

   現在將要求用戶授權你的應用程式。如果他們授權，用戶將被重定向到 `REDIRECT_URL`，例如：

   ```curl
   https://[REDIRECT_URI]?code=RETURNED_CODE&state=STATE
   ```

2. 使用重定向提供的 `code`，你可以請求新的應用程式和刷新令牌。訪問令牌端點接受 `application/json` 和 `application/x-www-form-urlencoded` 主體的 POST 請求，例如：

   ```curl
   POST https://[YOUR-GITEA-URL]/login/oauth/access_token
   ```

   ```json
   {
     "client_id": "YOUR_CLIENT_ID",
     "client_secret": "YOUR_CLIENT_SECRET",
     "code": "RETURNED_CODE",
     "grant_type": "authorization_code",
     "redirect_uri": "REDIRECT_URI"
   }
   ```

   回應：

   ```json
   {
     "access_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJnbnQiOjIsInR0IjowLCJleHAiOjE1NTUxNzk5MTIsImlhdCI6MTU1NTE3NjMxMn0.0-iFsAwBtxuckA0sNZ6QpBQmywVPz129u75vOM7wPJecw5wqGyBkmstfJHAjEOqrAf_V5Z-1QYeCh_Cz4RiKug",
     "token_type": "bearer",
     "expires_in": 3600,
     "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJnbnQiOjIsInR0IjoxLCJjbnQiOjEsImV4cCI6MTU1NzgwNDMxMiwiaWF0IjoxNTU1MTc2MzEyfQ.S_HZQBy4q9r5SEzNGNIoFClT43HPNDbUdHH-GYNYYdkRfft6XptJBkUQscZsGxOW975Yk6RbgtGvq1nkEcklOw"
   }
   ```

   `CLIENT_SECRET` 是為此應用程式生成的唯一密鑰。請注意，密鑰僅在你創建/註冊應用程式後可見，無法恢復。如果你丟失了密鑰，必須通過應用程式設置重新生成密鑰。

   `access_token` 請求中的 `REDIRECT_URI` 必須與 `authorize` 請求中的 `REDIRECT_URI` 匹配。

3. 使用 `access_token` 進行 [API 請求](development/api-usage.md#oauth2-provider) 以訪問用戶的資源。

### 公共客戶端 (PKCE)

PKCE（代碼交換的證明密鑰）是 OAuth 流程的擴展，允許在不需要提供客戶端密鑰的情況下進行安全的憑證交換。

**注意**：請確保你已將你的 OAuth 應用程式註冊為公共客戶端。

為了實現這一點，你必須為每個授權請求提供一個 `code_verifier`。`code_verifier` 必須是一個隨機字串，最小長度為 43 個字符，最大長度為 128 個字符。它可以包含字母
