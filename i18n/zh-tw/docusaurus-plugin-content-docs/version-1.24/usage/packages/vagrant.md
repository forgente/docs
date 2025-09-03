---
date: "2022-08-23T00:00:00+00:00"
slug: "vagrant"
sidebar_position: 120
---

# Vagrant 軟體包註冊表

為您的使用者或組織發佈 [Vagrant](https://www.vagrantup.com/) 軟體包。

## 要求

要使用 Vagrant 軟體包註冊表，您需要安裝 [Vagrant](https://www.vagrantup.com/downloads) 並使用类似于 `curl` 的工具進行 HTTP 請求。

## 發佈軟體包

通過執行 HTTP PUT 請求将 Vagrant box 發佈到註冊表：

```
PUT https://gitea.example.com/api/packages/{owner}/vagrant/{package_name}/{package_version}/{provider}.box
```

| 參數              | 描述                                                               |
| ----------------- | ------------------------------------------------------------------ |
| `owner`           | 軟體包的所有者                                                     |
| `package_name`    | 軟體包的名稱                                                       |
| `package_version` | 軟體包的版本，兼容 semver 格式                                     |
| `provider`        | [支持的提供程序名稱](https://www.vagrantup.com/docs/providers)之一 |

上传 Hyper-V box 的示例：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/your/vagrant.box \
     https://gitea.example.com/api/packages/testuser/vagrant/test_system/1.0.0/hyperv.box
```

如果已经存在相同名稱、版本和提供程序的軟體包，则無法發佈軟體包。您必須首先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表安裝軟體包，請執行以下命令：

```shell
vagrant box add "https://gitea.example.com/api/packages/{owner}/vagrant/{package_name}"
```

| 參數           | 描述            |
| -------------- | --------------- |
| `owner`        | 軟體包的所有者. |
| `package_name` | 軟體包的名稱    |

例如：

```shell
vagrant box add "https://gitea.example.com/api/packages/testuser/vagrant/test_system"
```

这将安裝軟體包的最新版本。要添加特定版本，請使用` --box-version` 參數。
如果註冊表是私有的，您可以将您的[个人访问令牌](development/api-usage.md#通過-api-認證)传递给 `VAGRANT_CLOUD_TOKEN` 环境变量。

## 支持的命令

```
vagrant box add
```
