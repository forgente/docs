---
date: "2023-05-10T00:00:00+00:00"
slug: "go"
sidebar_position: 45
---

# Go 軟體包註冊表

為您的使用者或組織發佈 Go 軟體包。

## 發佈軟體包

要發佈 Go 軟體包，請執行 HTTP `PUT` 操作，並将軟體包内容放入請求主體中。
如果已经存在相同名稱和版本的軟體包，您無法發佈軟體包。您必須首先删除現有的軟體包。
該軟體包必須遵循[文檔中的结构](https://go.dev/ref/mod#zip-files)。

```
PUT https://gitea.example.com/api/packages/{owner}/go/upload
```

| 參數    | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

要身份驗證到軟體包註冊表，您需要提供[自定义 HTTP 头或使用 HTTP 基本身份驗證](development/api-usage.md#通過-api-認證)：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.zip \
     https://gitea.example.com/api/packages/testuser/go/upload
```

如果您使用的是 2FA 或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)替代密碼進行身份驗證。

服务器将使用以下 HTTP 状态代码進行響應。

| HTTP 状态码       | 含义                       |
| ----------------- | -------------------------- |
| `201 Created`     | 軟體包已發佈               |
| `400 Bad Request` | 軟體包無效                 |
| `409 Conflict`    | 具有相同名稱的軟體包已存在 |

## 安裝軟體包

要安裝Go軟體包，請指示Go使用軟體包註冊表作為代理：

```shell
# 使用最新版本
GOPROXY=https://gitea.example.com/api/packages/{owner}/go go install {package_name}
# 或者
GOPROXY=https://gitea.example.com/api/packages/{owner}/go go install {package_name}@latest
# 使用特定版本
GOPROXY=https://gitea.example.com/api/packages/{owner}/go go install {package_name}@{package_version}
```

| 參數              | 描述           |
| ----------------- | -------------- |
| `owner`           | 軟體包的所有者 |
| `package_name`    | 軟體包名稱     |
| `package_version` | 軟體包版本     |

如果軟體包的所有者是私有的，则需要[提供凭据](https://go.dev/ref/mod#private-module-proxy-auth)。

有关 `GOPROXY` 环境变量的更多信息以及如何防止数据泄漏的信息，請[参阅文檔](https://go.dev/ref/mod#private-modules)。
