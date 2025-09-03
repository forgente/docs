---
date: "2023-01-20T00:00:00+00:00"
slug: "chef"
sidebar_position: 5
---

# Chef 軟體包註冊表

為您的使用者或組織發佈 [Chef](https://chef.io/) cookbooks。

## 要求

要使用 Chef 軟體包註冊表，您需要使用 [`knife`](https://docs.chef.io/workstation/knife/).

## 認證

Chef 軟體包註冊表不使用使用者名和密碼進行身份驗證，而是使用私钥和公钥对請求進行签名。
請访问軟體包所有者设置页面以建立必要的密钥对。
只有公钥存儲在Gitea中。如果您丢失了私钥的访问权限，您必須重新生成密钥对。
[配置 `knife`](https://docs.chef.io/workstation/knife_setup/)，使用下载的私钥，並将 Gitea 使用者名设置為 `client_name`。

## 配置軟體包註冊表

要将 [`knife` 配置](https://docs.chef.io/workstation/knife_setup/)為使用 Gitea 軟體包註冊表，請将 URL 添加到 `~/.chef/config.rb` 文件中。

```
knife[:supermarket_site] = 'https://gitea.example.com/api/packages/{owner}/chef'
```

| 參數    | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

## 發佈軟體包

若要發佈 Chef 軟體包，請執行以下命令：

```shell
knife supermarket share {package_name}
```

| 參數           | 描述       |
| -------------- | ---------- |
| `package_name` | 軟體包名稱 |

如果已经存在同名和版本的軟體包，则無法發佈新的軟體包。您必須先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表中安裝軟體包，請執行以下命令：

```shell
knife supermarket install {package_name}
```

您可以指定軟體包的版本，这是可選的：

```shell
knife supermarket install {package_name} {package_version}
```

| 參數              | 描述       |
| ----------------- | ---------- |
| `package_name`    | 軟體包名稱 |
| `package_version` | 軟體包版本 |

## 删除軟體包

如果您想要从註冊表中删除軟體包，請執行以下命令：

```shell
knife supermarket unshare {package_name}
```

可選地，您可以指定軟體包的版本：

```shell
knife supermarket unshare {package_name}/versions/{package_version}
```

| 參數              | 描述       |
| ----------------- | ---------- |
| `package_name`    | 軟體包名稱 |
| `package_version` | 軟體包版本 |
