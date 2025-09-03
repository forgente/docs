---
date: "2023-01-07T00:00:00+00:00"
slug: "debian"
---

# Debian 軟體包註冊表

為您的使用者或組織發佈 [Debian](https://www.debian.org/distrib/packages) 軟體包。

## 要求

要使用 Debian 註冊表，您需要使用类似于 `curl` 的 HTTP 客户端進行上传，並使用类似于 `apt` 的軟體包管理器消费軟體包。

以下示例使用 `apt`。

## 配置軟體包註冊表

要注册 Debian 註冊表，請将 URL 添加到已知 `apt` 源列表中：

```shell
echo "deb [signed-by=/etc/apt/keyrings/gitea-{owner}.asc] https://gitea.example.com/api/packages/{owner}/debian {distribution} {component}" | sudo tee -a /etc/apt/sources.list.d/gitea.list
```

| 占位符         | 描述           |
| -------------- | -------------- |
| `owner`        | 軟體包的所有者 |
| `distribution` | 要使用的发行版 |
| `component`    | 要使用的组件   |

如果註冊表是私有的，請在 URL 中提供凭据。您可以使用密碼或[个人访问令牌](development/api-usage.md#通過-api-認證)：

```shell
echo "deb [signed-by=/etc/apt/keyrings/gitea-{owner}.asc] https://{username}:{your_password_or_token}@gitea.example.com/api/packages/{owner}/debian {distribution} {component}" | sudo tee -a /etc/apt/sources.list.d/gitea.list
```

Debian 註冊表文件使用 PGP 密钥進行签名，`apt` 必須知道該密钥：

```shell
sudo curl https://gitea.example.com/api/packages/{owner}/debian/repository.key -o /etc/apt/keyrings/gitea-{owner}.asc
```

然后更新本地軟體包索引：

```shell
apt update
```

## 發佈軟體包

要發佈一个 Debian 軟體包（`*.deb`），執行 HTTP `PUT` 操作，並将軟體包内容放入請求主體中。

```
PUT https://gitea.example.com/api/packages/{owner}/debian/pool/{distribution}/{component}/upload
```

| 參數           | 描述                                                  |
| -------------- | ----------------------------------------------------- |
| `owner`        | 軟體包的所有者                                        |
| `distribution` | 发行版，可能与操作系统的发行版名稱匹配，例如 `bionic` |
| `component`    | 组件，可用于分组軟體包，或僅為 `main` 或类似的组件。  |

使用 HTTP 基本身份驗證的示例請求：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.deb \
     https://gitea.example.com/api/packages/testuser/debian/pool/bionic/main/upload
```

如果您使用 2FA 或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)替代密碼。
您無法向軟體包中多次發佈具有相同名稱的文件。您必須首先删除現有的軟體包版本。

服务器将使用以下 HTTP 状态代码進行響應。

| HTTP 状态码       | 意义                                     |
| ----------------- | ---------------------------------------- |
| `201 Created`     | 軟體包已發佈                             |
| `400 Bad Request` | 軟體包名稱、版本、发行版、组件或架构無效 |
| `409 Conflict`    | 具有相同參數组合的軟體包文件已经存在     |

## 删除軟體包

要删除 Debian 軟體包，請執行 HTTP `DELETE` 操作。如果没有文件留下，这将同时删除軟體包版本。

```
DELETE https://gitea.example.com/api/packages/{owner}/debian/pool/{distribution}/{component}/{package_name}/{package_version}/{architecture}
```

| 參數              | 描述           |
| ----------------- | -------------- |
| `owner`           | 軟體包的所有者 |
| `package_name`    | 軟體包名稱     |
| `package_version` | 軟體包版本     |
| `distribution`    | 軟體包发行版   |
| `component`       | 軟體包组件     |
| `architecture`    | 軟體包架构     |

使用 HTTP 基本身份驗證的示例請求：

```shell
curl --user your_username:your_token_or_password -X DELETE \
     https://gitea.example.com/api/packages/testuser/debian/pools/bionic/main/test-package/1.0.0/amd64
```

服务器将使用以下 HTTP 状态代码進行響應。

| HTTP 状态码      | 含义               |
| ---------------- | ------------------ |
| `204 No Content` | 成功               |
| `404 Not Found`  | 找不到軟體包或文件 |

## 安裝軟體包

要从 Debian 註冊表安裝軟體包，請執行以下命令:

```shell
# use latest version
apt install {package_name}
# use specific version
apt install {package_name}={package_version}
```
