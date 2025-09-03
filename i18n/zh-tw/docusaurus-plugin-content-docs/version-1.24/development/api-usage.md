---
date: "2018-06-24:00:00+02:00"
slug: "api-usage"
sidebar_position: 40
aliases:
  - /zh-tw/api-usage
---

# API 使用指南

## 开启/配置 API 访问

通常情况下， `ENABLE_SWAGGER` 默认开启並且參數 `MAX_RESPONSE_ITEMS` 默认為 50。您可以从 [Config Cheat Sheet](../administration/config-cheat-sheet.md) 中获取更多配置相关信息。

## 通過 API 認證

Gitea 支持以下几种 API 認證方式：

- HTTP basic authentication 方式
- 通過指定 `token=...` URL 查询參數方式
- 通過指定 `access_token=...` URL 查询參數方式
- 通過指定 `Authorization: token ...` HTTP header 方式

以上提及的認證方法接受相同的 apiKey token 類型，您可以在编码时通過查阅代码更好地理解这一点。
Gitea 调用解析查询參數以及头部信息来获取 token 的代码可以在 [modules/auth/auth.go](https://github.com/go-gitea/gitea/blob/6efdcaed86565c91a3dc77631372a9cc45a58e89/modules/auth/auth.go#L47) 中找到。

您可以通過您的 gitea web 界面来建立 apiKey token：
`Settings | Applications | Generate New Token`.

### 关于 `Authorization:` header

由于一些历史原因，Gitea 需要在 header 的 apiKey token 里引入前缀 `token`，类似于如下形式：

```
Authorization: token 65eaa9c8ef52460d22a93307fe0aee76289dc675
```

以 `curl` 命令為例，它会以如下形式携带在請求中：

```
curl "http://localhost:4000/api/v1/repos/test1/test1/issues" \
    -H "accept: application/json" \
    -H "Authorization: token 65eaa9c8ef52460d22a93307fe0aee76289dc675" \
    -H "Content-Type: application/json" -d "{ \"body\": \"testing\", \"title\": \"test 20\"}" -i
```

正如上例所示，您也可以在 GET 請求中使用同一个 token 並以 `token=` 的查询參數形式携带 token 来進行認證。

## 通過 API 列出您發佈的令牌

`/users/:name/tokens` 是一个特殊的接口，需要您使用 basic authentication 進行認證，具體原因在 issue 中
[#3842](https://github.com/go-gitea/gitea/issues/3842#issuecomment-397743346) 有所提及，使用方法如下所示：

### 使用 Basic authentication 認證

```
$ curl --url https://yourusername:yourpassword@gitea.your.host/api/v1/users/yourusername/tokens
[{"name":"test","sha1":"..."},{"name":"dev","sha1":"..."}]
```

## 使用 Sudo 方式請求 API

此 API 允许管理员借用其他使用者身份進行 API 請求。只需在請求中指定查询參數 `sudo=` 或是指定 header 中的 `Sudo:` 為需要使用的使用者 username 即可。
