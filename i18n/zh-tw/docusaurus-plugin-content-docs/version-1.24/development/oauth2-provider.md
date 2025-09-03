---
date: "2019-04-19:44:00+01:00"
slug: "oauth2-provider"
sidebar_position: 41
aliases:
  - /zh-tw/oauth2-provider
---

# OAuth2 提供者

Gitea 支持作為 OAuth2 提供者，允许第三方應用程序在使用者同意的情况下访问其资源。此功能自 1.8.0 版起可用。

## 端点

| 端点                     | URL                                 |
| ------------------------ | ----------------------------------- |
| OpenID Connect Discovery | `/.well-known/openid-configuration` |
| Authorization Endpoint   | `/login/oauth/authorize`            |
| Access Token Endpoint    | `/login/oauth/access_token`         |
| OpenID Connect UserInfo  | `/login/oauth/userinfo`             |
| JSON Web Key Set         | `/login/oauth/keys`                 |

## 支持的 OAuth2 授权

目前 Gitea 僅支持 [**Authorization Code Grant**](https://tools.ietf.org/html/rfc6749#section-1.3.1) 标准，並额外支持以下扩展：

- [Proof Key for Code Exchange (PKCE)](https://tools.ietf.org/html/rfc7636)
- [OpenID Connect (OIDC)](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)

要将 Authorization Code Grant 作為第三方應用程序，您需要通過在设置中添加一个新的 "應用程序" (`/user/settings/applications`)。

## 范围

Gitea 支持以下令牌范围:

| 名稱                                     | 介绍                                                            |
| ---------------------------------------- | --------------------------------------------------------------- |
| **(no scope)**                           | 授予对公共使用者配置文件和公共存儲库的只读访问权限                |
| **repo**                                 | 完全控制所有存儲库                                              |
| &nbsp;&nbsp;&nbsp; **repo:status**       | 授予对所有存儲库中提交状态的读/写访问权限                       |
| &nbsp;&nbsp;&nbsp; **public_repo**       | 僅授予对公共存儲库的读/写访问权限                               |
| **admin:repo_hook**                      | 授予对所有存儲库的 Hooks 访问权限，該权限已包含在 `repo` 范围中 |
| &nbsp;&nbsp;&nbsp; **write:repo_hook**   | 授予对存儲库 Hooks 的读/写访问权限                              |
| &nbsp;&nbsp;&nbsp; **read:repo_hook**    | 授予对存儲库 Hooks 的只读访问权限                               |
| **admin:org**                            | 授予对組織设置的完全访问权限                                    |
| &nbsp;&nbsp;&nbsp; **write:org**         | 授予对組織设置的读/写访问权限                                   |
| &nbsp;&nbsp;&nbsp; **read:org**          | 授予对組織设置的只读访问权限                                    |
| **admin:public_key**                     | 授予公钥管理的完全访问权限                                      |
| &nbsp;&nbsp;&nbsp; **write:public_key**  | 授予对公钥的读/写访问权限                                       |
| &nbsp;&nbsp;&nbsp; **read:public_key**   | 授予对公钥的只读访问权限                                        |
| **admin:org_hook**                       | 授予对組織级别 Hooks 的完全访问权限                             |
| **admin:user_hook**                      | 授予对使用者级别 Hooks 的完全访问权限                             |
| **notification**                         | 授予对通知的完全访问权限                                        |
| **user**                                 | 授予对使用者个人资料信息的完全访问权限                            |
| &nbsp;&nbsp;&nbsp; **read:user**         | 授予对使用者个人资料的读取权限                                    |
| &nbsp;&nbsp;&nbsp; **user:email**        | 授予对使用者电子邮件地址的读取权限                                |
| &nbsp;&nbsp;&nbsp; **user:follow**       | 授予访问权限以关注/取消关注使用者                                 |
| **delete_repo**                          | 授予删除存儲库的权限                                            |
| **package**                              | 授予对托管包的完全访问权限                                      |
| &nbsp;&nbsp;&nbsp; **write:package**     | 授予对包的读/写访问权限                                         |
| &nbsp;&nbsp;&nbsp; **read:package**      | 授予对包的读取权限                                              |
| &nbsp;&nbsp;&nbsp; **delete:package**    | 授予对包的删除权限                                              |
| **admin:gpg_key**                        | 授予 GPG 密钥管理的完全访问权限                                 |
| &nbsp;&nbsp;&nbsp; **write:gpg_key**     | 授予对 GPG 密钥的读/写访问权限                                  |
| &nbsp;&nbsp;&nbsp; **read:gpg_key**      | 授予对 GPG 密钥的只读访问权限                                   |
| **admin:application**                    | 授予應用程序管理的完全访问权限                                  |
| &nbsp;&nbsp;&nbsp; **write:application** | 授予應用程序管理的读/写访问权限                                 |
| &nbsp;&nbsp;&nbsp; **read:application**  | 授予應用程序管理的读取权限                                      |
| **sudo**                                 | 允许以站点管理员身份執行操作                                    |

## 客户端類型

Gitea 支持私密和公共客户端類型，[参见 RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749#section-2.1).

對於公共客户端, 允许在本地回环地址的重定向 URI 中使用任意端口，例如 `http://127.0.0.1/`。根据 [RFC 8252 的建议](https://datatracker.ietf.org/doc/html/rfc8252#section-8.3)，請避免使用 `localhost`。

## 示例

**注意：** 該示例中尚未使用 PKCE。

1. 将使用者重定向到授权端点，以获得他们的访问资源授权:

   ```curl
   https://[YOUR-GITEA-URL]/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI& response_type=code&state=STATE
   ```

   在设置中注册應用程序以获得 `CLIENT_ID`。`STATE` 是一个随机字符串，它将在获得使用者授权后发送回您的應用程序。`state` 參數是可選的，但您應該使用它来防止 CSRF 攻擊。

   ![Authorization Page](/authorize.png)

   使用者将会被询问是否授权给您的應用程序。如果他们同意了授权，使用者将会被重定向到 `REDIRECT_URL`，例如：

   ```curl
   https://[REDIRECT_URI]?code=RETURNED_CODE&state=STATE
   ```

2. 使用重定向提供的 `code`，您可以請求一个新的應用程序和 Refresh Token。Access Token Endpoint 接受 `application/json` 或 `application/x-www-form-urlencoded` 類型的 POST 請求，例如：

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

   返回：

   ```json
   {
     "access_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJnbnQiOjIsInR0IjowLCJleHAiOjE1NTUxNzk5MTIsImlhdCI6MTU1NTE3NjMxMn0.0-iFsAwBtxuckA0sNZ6QpBQmywVPz129u75vOM7wPJecw5wqGyBkmstfJHAjEOqrAf_V5Z-1QYeCh_Cz4RiKug",
     "token_type": "bearer",
     "expires_in": 3600,
     "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJnbnQiOjIsInR0IjoxLCJjbnQiOjEsImV4cCI6MTU1NzgwNDMxMiwiaWF0IjoxNTU1MTc2MzEyfQ.S_HZQBy4q9r5SEzNGNIoFClT43HPNDbUdHH-GYNYYdkRfft6XptJBkUQscZsGxOW975Yk6RbgtGvq1nkEcklOw"
   }
   ```

   `CLIENT_SECRET` 是生成给應用程序的唯一密钥。請注意，該密钥只会在您使用 Gitea 建立/注册應用程序后出現一次。如果您丢失了密钥，您必須在應用程序设置中重新生成密钥。

   `access_token` 請求中的 `REDIRECT_URI` 必須与 `authorize` 請求中的 `REDIRECT_URI` 相符。

3. 使用 `access_token` 来构造 [API 請求](development/api-usage.md#oauth2-provider) 以读写使用者的资源。
