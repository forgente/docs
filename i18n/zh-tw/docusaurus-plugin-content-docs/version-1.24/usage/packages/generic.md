---
date: "2021-07-20T00:00:00+00:00"
slug: "generic"
sidebar_position: 500
---

# 通用軟體包註冊表

發佈通用文件，如發佈二進制文件或其他输出，供您的使用者或組織使用。

## 身份驗證軟體包註冊表

要身份驗證軟體包註冊表，您需要提供[自定义 HTTP 头或使用 HTTP 基本身份驗證](development/api-usage.md#通過-api-認證)。

## 發佈軟體包

要發佈通用軟體包，請執行 HTTP `PUT` 操作，並将軟體包内容放入請求主體中。
您無法向軟體包中多次發佈具有相同名稱的文件。您必須首先删除現有的軟體包版本。

```
PUT https://gitea.example.com/api/packages/{owner}/generic/{package_name}/{package_version}/{file_name}
```

| 參數              | 描述                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `owner`           | 軟體包的所有者。                                                                                                            |
| `package_name`    | 軟體包名稱。它只能包含小写字母 (`a-z`)、大写字母 (`A-Z`)、数字 (`0-9`)、点号 (`.`)、连字符 (`-`)、加号 (`+`) 或下划线 (`_`) |
| `package_version` | 軟體包版本，一个非空字符串，不包含前导或尾随空格                                                                            |
| `file_name`       | 文件名。它只能包含小写字母 (`a-z`)、大写字母 (`A-Z`)、数字 (`0-9`)、点号 (`.`)、连字符 (`-`)、加号 (`+`) 或下划线 (`_`)     |

使用 HTTP 基本身份驗證的示例請求：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.bin \
     https://gitea.example.com/api/packages/testuser/generic/test_package/1.0.0/file.bin
```

如果您使用 2FA 或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)替代密碼。

服务器将使用以下 HTTP 状态代码進行響應。

| HTTP 状态码       | 意义                               |
| ----------------- | ---------------------------------- |
| `201 Created`     | 軟體包已發佈                       |
| `400 Bad Request` | 軟體包名稱和/或版本和/或文件名無效 |
| `409 Conflict`    | 具有相同名稱的文件已存在于軟體包中 |

## 下载軟體包

要下载通用軟體包，請執行 HTTP `GET` 操作。

```
GET https://gitea.example.com/api/packages/{owner}/generic/{package_name}/{package_version}/{file_name}
```

| 參數              | 描述           |
| ----------------- | -------------- |
| `owner`           | 軟體包的所有者 |
| `package_name`    | 軟體包名稱     |
| `package_version` | 軟體包版本     |
| `file_name`       | 文件名         |

文件内容将在響應主體中返回。響應的内容類型為 `application/octet-stream`。

服务器将使用以下 HTTP 状态代码進行響應。

```shell
curl --user your_username:your_token_or_password \
     https://gitea.example.com/api/packages/testuser/generic/test_package/1.0.0/file.bin
```

服务器会以以下 HTTP 状态码進行響應：

| HTTP 状态码     | 含义                 |
| --------------- | -------------------- |
| `200 OK`        | 成功                 |
| `404 Not Found` | 找不到軟體包或者文件 |

## 删除軟體包

要删除通用軟體包，請執行 HTTP DELETE 操作。这将同时删除該版本的所有文件。

```
DELETE https://gitea.example.com/api/packages/{owner}/generic/{package_name}/{package_version}
```

| 參數              | 描述           |
| ----------------- | -------------- |
| `owner`           | 軟體包的所有者 |
| `package_name`    | 軟體包名稱     |
| `package_version` | 軟體包版本     |

服务器将使用以下 HTTP 状态代码進行響應。

```shell
curl --user your_username:your_token_or_password -X DELETE \
     https://gitea.example.com/api/packages/testuser/generic/test_package/1.0.0
```

The server responds with the following HTTP Status codes.

| HTTP 状态码      | 意义         |
| ---------------- | ------------ |
| `204 No Content` | 成功         |
| `404 Not Found`  | 找不到軟體包 |

## 删除軟體包文件

要删除通用軟體包的文件，請執行 HTTP `DELETE` 操作。如果没有文件留下，这将同时删除軟體包版本。

```
DELETE https://gitea.example.com/api/packages/{owner}/generic/{package_name}/{package_version}/{filename}
```

| 參數              | 描述           |
| ----------------- | -------------- |
| `owner`           | 軟體包的所有者 |
| `package_name`    | 軟體包名稱     |
| `package_version` | 軟體包版本     |
| `filename`        | 文件名         |

使用 HTTP 基本身份驗證的示例請求：

```shell
curl --user your_username:your_token_or_password -X DELETE \
     https://gitea.example.com/api/packages/testuser/generic/test_package/1.0.0/file.bin
```

服务器将使用以下 HTTP 状态代码進行響應：

| HTTP 状态码      | 含义               |
| ---------------- | ------------------ |
| `204 No Content` | 成功               |
| `404 Not Found`  | 找不到軟體包或文件 |
