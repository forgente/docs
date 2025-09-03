---
date: "2023-05-15T00:00:00+00:00"
slug: "container"
sidebar_position: 5
---

# Arch 儲存庫

在您的使用者或組織中發佈 [Arch](https://archlinux.org/packages/) 軟體包。 Arch 儲存庫的功能像是一個完整的[鏡像Arch 儲存庫](https://wiki.archlinux.org/title/mirrors\)，需要調整系統的`/etc/pacman.conf`文件。

## 需求

系統需要安裝有HTTP客戶端像是`curl`來下載文件，且必須安裝有`pacman`軟體包管理工具。

## 配置 Arch 儲存庫

Arch 儲存庫的軟體都有`gpg`簽名驗證，所以需要匯入驗證需要的公鑰，下面是下載公鑰的範例。
```sh
wget https://gitea.example.com/api/packages/{owner}/arch/repository.key
```

匯入公鑰之前，請先確認是否為該 Arch 儲存庫的公鑰，下面是檢視公鑰的範例。確認完成請記第二行的16為的`key id`
```sh
gpg --show-keys repository.key
```

接下來要匯入到pacman的鑰匙圈中，下面是匯入的範例。
```sh
pacman-key --add repository.key
pacman-key --lsign-key {key id}
```

匯入驗證的公鑰，接下來要修改pacman的配置檔，位置是`/etc/pacman.conf`，內容如下。
```conf
[{owner}.gitea.example.com]
SigLevel = Required
Server = https://gitea.example.com/api/packages/{owner}/arch/{repository}/{architecture}
```

| 占位符       | 描述           |
| ------------ | -------------- |
| `owner`      | 軟體包所有者   |
| `repository` | 要使用的存放庫名 |
| `architecture` | 軟體包的架构 |

如果註冊表是私有的，請在 URL 中提供凭据。您可以使用密碼或[个人访问令牌](development/api-usage.md#通過-api-認證):
```
Server = https://{username}:{your_password_or_token}@gitea.example.com/api/packages/{owner}/arch/{repository}/{architecture}
```

## 發佈軟體包

要發佈一个 Arch 軟體包，請執行带有包内容的 HTTP `PUT` 操作，将其放在請求體中。
```
PUT https://gitea.example.com/api/packages/{owner}/arch/{repository}
```

| 占位符       | 描述           |
| ------------ | -------------- |
| `owner`      | 軟體包所有者   |
| `repository` | 要使用的存放庫名 |

使用 HTTP 基本身份驗證的範例請求：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.pkg.tar.zst \
     https://gitea.example.com/api/packages/testuser/arch/core
```

如果您使用的是双重身份驗證或 OAuth，請使用[個人訪問令牌](development/api-usage.md#authentication)代替密碼。
您不能将具有相同名稱的文件两次發佈到一个包中。您必須首先删除現有的包文件。

服务器将以以下的 HTTP 狀態碼回應：
| HTTP 狀態碼       | 含义                                       |
| ----------------- | ------------------------------------------ |
| `201 Created`     | 軟體包已發佈。                             |
| `400 Bad Request` | 軟體包的名稱、版本、分支、存放庫或架构無效。 |
| `409 Conflict`    | 具有相同參數组合的包文件已存在于軟體包中。 |

## 安裝軟體包

要从 AArch 儲存庫安裝軟體包，請執行以下命令：

```sh
pacman -Sy {package_name}
```

| Parameter      | 含义 |
| -------------- | ----------- |
| `package_name` | 軟體包 |

## 删除軟體包

要删除 Arch 軟體包，執行 HTTP 的 DELETE 操作。如果没有文件，这将同时删除包版本。

```
DELETE https://gitea.example.com/api/packages/{owner}/arch/{repository}/{package_name}/{package_version}/{architecture}
```


| 參數           | 描述           |
| -------------- | -------------- |
| `owner`        | 軟體包的所有者 |
| `repository`   | 要使用的存放庫名 |
| `architecture` | 軟體包的架构   |
| `package_name`    | 要删除的軟體名 |
| `package_version` | 軟體版本 |

使用 HTTP 基本身份驗證的範例請求：

```shell
curl --user your_username:your_token_or_password -X DELETE \
     https://gitea.example.com/api/packages/testuser/arch/core/test-package/1.0.0/x86-64
```

服务器将以以下的 HTTP 狀態碼回應：

| HTTP 状态码      | 含义               |
| ---------------- | ------------------ |
| `204 No Content` | 成功               |
| `404 Not Found`  | 未找到軟體包或文件 |