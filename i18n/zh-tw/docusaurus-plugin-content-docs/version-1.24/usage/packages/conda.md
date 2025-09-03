---
date: "2022-12-28T00:00:00+00:00"
slug: "conda"
sidebar_position: 25
---

# Conda 軟體包註冊表

為您的使用者或組織發佈 [Conda](https://docs.conda.io/en/latest/) 軟體包。

## 要求

要使用 Conda 軟體包註冊表，您需要使用 [conda](https://docs.conda.io/projects/conda/en/stable/user-guide/install/index.html) 命令行工具。

## 配置軟體包註冊表

要註冊軟體包註冊表並提供憑證，請编辑您的 `.condarc` 文件：

```yaml
channel_alias: https://gitea.example.com/api/packages/{owner}/conda
channels:
  - https://gitea.example.com/api/packages/{owner}/conda
default_channels:
  - https://gitea.example.com/api/packages/{owner}/conda
```

| 占位符  | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

有關各個設定的解釋，請参阅[官方文檔](https://conda.io/projects/conda/en/latest/user-guide/configuration/use-condarc.html)。

如果需要提供憑證，可以将它们作為通道 URL 的一部分嵌入（`https://user:password@gitea.example.com/...`）。

## 發佈軟體包

要發佈一个軟體包，請執行一个HTTP `PUT`操作，請求正文中包含軟體包内容。

```
PUT https://gitea.example.com/api/packages/{owner}/conda/{channel}/{filename}
```

| 占位符     | 描述                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------- |
| `owner`    | 軟體包的所有者                                                                                      |
| `channel`  | 軟體包的[通道](https://conda.io/projects/conda/en/latest/user-guide/concepts/channels.html)（可選） |
| `filename` | 文件名                                                                                              |

使用HTTP基本身份驗證的範例請求：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/package-1.0.conda \
     https://gitea.example.com/api/packages/testuser/conda/package-1.0.conda
```

如果已经存在同名和版本的軟體包，則無法發佈軟體包。您必須先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表中安裝軟體包，請執行以下命令之一：

```shell
conda install {package_name}
conda install {package_name}={package_version}
conda install -c {channel} {package_name}
```

| 參數              | 描述                 |
| ----------------- | -------------------- |
| `package_name`    | 軟體包的名稱         |
| `package_version` | 軟體包的版本         |
| `channel`         | 軟體包的通道（可選） |
