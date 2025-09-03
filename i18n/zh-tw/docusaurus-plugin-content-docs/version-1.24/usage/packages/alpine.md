---
date: "2023-03-25T00:00:00+00:00"
slug: "alpine"
sidebar_position: 4
---

# Alpine 軟體包儲存庫

在您的使用者或組織中發佈 [Alpine](https://pkgs.alpinelinux.org/) 軟體包。

## 要求

要使用 Alpine 儲存庫，您需要使用像 curl 这样的 HTTP 客户端来上传包，並使用像 apk 这样的包管理器来消费包。

以下示例使用 `apk`。

## 配置軟體包儲存庫

要注册 Alpine 儲存庫，請将 URL 添加到已知的 apk 源列表中 (`/etc/apk/repositories`):

```
https://gitea.example.com/api/packages/{owner}/alpine/<branch>/<repository>
```

| 占位符       | 描述           |
| ------------ | -------------- |
| `owner`      | 軟體包所有者   |
| `branch`     | 要使用的分支名 |
| `repository` | 要使用的存放庫名 |

如果註冊表是私有的，請在 URL 中提供凭据。您可以使用密碼或[个人访问令牌](development/api-usage.md#通過-api-認證):

```
https://{username}:{your_password_or_token}@gitea.example.com/api/packages/{owner}/alpine/<branch>/<repository>
```

Alpine 儲存庫文件使用 RSA 密钥進行签名，apk 必須知道該密钥。下载公钥並将其存儲在 `/etc/apk/keys/` 目錄中：

```shell
curl -JO https://gitea.example.com/api/packages/{owner}/alpine/key
```

之后，更新本地軟體包索引：

```shell
apk update
```

## 發佈軟體包

要發佈一个 Alpine 包（`*.apk`），請執行带有包内容的 HTTP `PUT` 操作，将其放在請求體中。

```
PUT https://gitea.example.com/api/packages/{owner}/alpine/{branch}/{repository}
```

| 參數         | 描述                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `owner`      | 包的所有者。                                                                                        |
| `branch`     | 分支可以与操作系统的发行版本匹配，例如：v3.17。                                                     |
| `repository` | 存放庫可以用于[分组包](https://wiki.alpinelinux.org/wiki/Repositories) 或者只是 `main` 或类似的名稱。 |

使用 HTTP 基本身份驗證的範例請求：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.apk \
     https://gitea.example.com/api/packages/testuser/alpine/v3.17/main
```

如果您使用的是双重身份驗證或 OAuth，請使用[個人訪問令牌](development/api-usage.md#authentication)代替密碼。
您不能将具有相同名稱的文件两次發佈到一个包中。您必須首先删除現有的包文件。

服务器将以以下的 HTTP 狀態碼回應：

| HTTP 狀態碼       | 含义                                       |
| ----------------- | ------------------------------------------ |
| `201 Created`     | 軟體包已發佈。                             |
| `400 Bad Request` | 軟體包的名稱、版本、分支、存放庫或架构無效。 |
| `409 Conflict`    | 具有相同參數组合的包文件已存在于軟體包中。 |

## 删除軟體包

要删除 Alpine 包，執行 HTTP 的 DELETE 操作。如果没有文件，这将同时删除包版本。

```
DELETE https://gitea.example.com/api/packages/{owner}/alpine/{branch}/{repository}/{architecture}/{filename}
```

| 參數           | 描述           |
| -------------- | -------------- |
| `owner`        | 軟體包的所有者 |
| `branch`       | 要使用的分支名 |
| `repository`   | 要使用的存放庫名 |
| `architecture` | 軟體包的架构   |
| `filename`     | 要删除的文件名 |

使用 HTTP 基本身份驗證的範例請求：

```shell
curl --user your_username:your_token_or_password -X DELETE \
     https://gitea.example.com/api/packages/testuser/alpine/v3.17/main/test-package-1.0.0.apk
```

服务器将以以下的 HTTP 狀態碼回應：

| HTTP 状态码      | 含义               |
| ---------------- | ------------------ |
| `204 No Content` | 成功               |
| `404 Not Found`  | 未找到軟體包或文件 |

## 安裝軟體包

要从 Alpine 儲存庫安裝軟體包，請執行以下命令：

```shell
# use latest version
apk add {package_name}
# use specific version
apk add {package_name}={package_version}
```
