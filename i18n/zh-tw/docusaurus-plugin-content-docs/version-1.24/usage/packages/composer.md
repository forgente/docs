---
date: "2021-07-20T00:00:00+00:00"
slug: "composer"
sidebar_position: 10
---

# Composer 軟體包註冊表

為您的使用者或組織發佈 [Composer](https://getcomposer.org/) 軟體包。

## 要求

要使用 Composer 軟體包註冊表，您可以使用 [Composer](https://getcomposer.org/download/) 消费，並使用类似 `curl` 的 HTTP 上传客户端發佈軟體包。

## 發佈軟體包

要發佈 Composer 軟體包，請執行 HTTP `PUT` 操作，将軟體包内容放入請求體中。
軟體包内容必須是包含 `composer.json` 文件的压缩 PHP 项目。
如果已经存在同名和版本的軟體包，则無法發佈新的軟體包。您必須先删除現有的軟體包。

```
PUT https://gitea.example.com/api/packages/{owner}/composer
```

| 參數    | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

如果 `composer.json` 文件不包含 `version` 属性，您必須将其作為查询參數提供：

```
PUT https://gitea.example.com/api/packages/{owner}/composer?version={x.y.z}
```

使用 HTTP 基本身份驗證的示例請求：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/project.zip \
     https://gitea.example.com/api/packages/testuser/composer
```

或者将軟體包版本指定為查询參數：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/project.zip \
     https://gitea.example.com/api/packages/testuser/composer?version=1.0.3
```

如果您使用 2FA 或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)替代密碼。

服务器将以以下 HTTP 状态码響應。

| HTTP 状态码       | 含义                                                        |
| ----------------- | ----------------------------------------------------------- |
| `201 Created`     | 軟體包已發佈                                                |
| `400 Bad Request` | 軟體包名稱和/或版本無效，或具有相同名稱和版本的軟體包已存在 |

## 配置軟體包註冊表

要注册軟體包註冊表，您需要将其添加到 Composer 的 `config.json` 文件中（通常可以在 `<user-home-dir>/.composer/config.json` 中找到）：

```json
{
  "repositories": [{
      "type": "composer",
      "url": "https://gitea.example.com/api/packages/{owner}/composer"
   }
  ]
}
```

要使用凭据访问軟體包註冊表，您必須在 `auth.json` 文件中指定它们，如下所示：

```json
{
  "http-basic": {
    "gitea.example.com": {
      "username": "{username}",
      "password": "{password}"
    }
  }
}
```

| 參數       | 描述                        |
| ---------- | --------------------------- |
| `owner`    | 軟體包的所有者              |
| `username` | 您的 Gitea 使用者名           |
| `password` | 您的Gitea密碼或个人访问令牌 |

## 安裝軟體包

要从軟體包註冊表中安裝軟體包，請執行以下命令：

```shell
composer require {package_name}
```

您可以指定軟體包的版本，这是可選的：

```shell
composer require {package_name}:{package_version}
```

| 參數              | 描述       |
| ----------------- | ---------- |
| `package_name`    | 軟體包名稱 |
| `package_version` | 軟體包版本 |
