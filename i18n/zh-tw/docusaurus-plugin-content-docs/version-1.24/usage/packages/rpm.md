---
date: "2023-03-08T00:00:00+00:00"
slug: "packages/rpm"
sidebar_position: 105
---

# RPM 軟體包註冊表

為您的使用者或組織發佈 [RPM](https://rpm.org/) 軟體包。

## 要求

要使用RPM註冊表，您需要使用像 `yum`, `dnf` 或 `zypper` 这样的軟體包管理器来消费軟體包。

以下示例使用 `dnf`。

## 配置軟體包註冊表

要注册RPM註冊表，請将 URL 添加到已知 `apt` 源列表中：

```shell
dnf config-manager --add-repo https://gitea.example.com/api/packages/{owner}/rpm/{group}.repo
```

| 占位符  | 描述                                   |
| ------- |--------------------------------------|
| `owner` | 軟體包的所有者                           |
| `group` | 任何名稱,例如 `centos/7`、`el-7`、`fc38` |

如果註冊表是私有的，請在URL中提供凭据。您可以使用密碼或[个人访问令牌](development/api-usage.md#通過-api-認證)：

```shell
dnf config-manager --add-repo https://{username}:{your_password_or_token}@gitea.example.com/api/packages/{owner}/rpm/{group}.repo
```

您還必須将凭据添加到 `/etc/yum.repos.d` 中的 `rpm.repo` 文件中的URL中。

## 發佈軟體包

要發佈RPM軟體包（`*.rpm`），請執行带有軟體包内容的 HTTP `PUT` 操作。

```
PUT https://gitea.example.com/api/packages/{owner}/rpm/{group}/upload
```

| 參數    | 描述           |
| ------- |--------------|
| `owner` | 軟體包的所有者      |
| `group` | 軟體包自定义分组名稱 |

使用HTTP基本身份驗證的示例請求：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.rpm \
     https://gitea.example.com/api/packages/testuser/rpm/centos/el7/version/upload
```

如果您使用 2FA 或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)替代密碼。您無法将具有相同名稱的文件两次發佈到軟體包中。您必須先删除現有的軟體包版本。

服务器将以以下HTTP状态码響應。

| HTTP 状态码       | 含义                                             |
| ----------------- | ------------------------------------------------ |
| `201 Created`     | 軟體包已發佈                                     |
| `400 Bad Request` | 軟體包無效                                       |
| `409 Conflict`    | 具有相同參數组合的軟體包文件已经存在于該軟體包中 |

## 删除軟體包

要删除 RPM 軟體包，請執行 HTTP `DELETE` 操作。如果没有文件剩余，这也将删除軟體包版本。

```
DELETE https://gitea.example.com/api/packages/{owner}/rpm/{group}/package/{package_name}/{package_version}/{architecture}
```

| 參數              | 描述           |
| ----------------- | -------------- |
| `owner`           | 軟體包的所有者 |
| `group`         | 軟體包自定义分组 |
| `package_name`    | 軟體包名稱     |
| `package_version` | 軟體包版本     |
| `architecture`    | 軟體包架构     |

使用HTTP基本身份驗證的示例請求：

```shell
curl --user your_username:your_token_or_password -X DELETE \
     https://gitea.example.com/api/packages/testuser/rpm/centos/el7/package/test-package/1.0.0/x86_64
```

服务器将以以下HTTP状态码響應：

| HTTP 状态码      | 含义               |
| ---------------- | ------------------ |
| `204 No Content` | 成功               |
| `404 Not Found`  | 未找到軟體包或文件 |

## 安裝軟體包

要从RPM註冊表安裝軟體包，請執行以下命令：

```shell
# use latest version
dnf install {package_name}
# use specific version
dnf install {package_name}-{package_version}.{architecture}
```
