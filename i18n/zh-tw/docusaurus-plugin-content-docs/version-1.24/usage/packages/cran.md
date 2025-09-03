---
date: "2023-01-01T00:00:00+00:00"
slug: "cran"
sidebar_position: 35
---

# CRAN 軟體包註冊表

将 [R](https://www.r-project.org/) 軟體包發佈到您的使用者或組織的类似 [CRAN](https://cran.r-project.org/) 的註冊表。

## 要求

要使用CRAN軟體包註冊表，您需要安裝 [R](https://cran.r-project.org/)。

## 配置軟體包註冊表

要注册軟體包註冊表，您需要将其添加到 `Rprofile.site` 文件中，可以是系统级别、使用者级别 `~/.Rprofile` 或项目级别：

```
options("repos" = c(getOption("repos"), c(gitea="https://gitea.example.com/api/packages/{owner}/cran")))
```

| 參數    | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

如果需要提供凭据，可以将它们嵌入到URL(`https://user:password@gitea.example.com/...`)中。

## 發佈軟體包

要發佈 R 軟體包，請執行带有軟體包内容的 HTTP `PUT` 操作。

源代码軟體包：

```
PUT https://gitea.example.com/api/packages/{owner}/cran/src
```

| 參數    | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

二進制軟體包：

```
PUT https://gitea.example.com/api/packages/{owner}/cran/bin?platform={platform}&rversion={rversion}
```

| 參數       | 描述           |
| ---------- | -------------- |
| `owner`    | 軟體包的所有者 |
| `platform` | 平台的名稱     |
| `rversion` | 二進制的R版本  |

例如：

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/package.zip \
     https://gitea.example.com/api/packages/testuser/cran/bin?platform=windows&rversion=4.2
```

如果同名和版本的軟體包已存在，则無法發佈軟體包。您必須首先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表中安裝R軟體包，請執行以下命令：

```shell
install.packages("{package_name}")
```

| 參數           | 描述              |
| -------------- | ----------------- |
| `package_name` | The package name. |

例如：

```shell
install.packages("testpackage")
```
