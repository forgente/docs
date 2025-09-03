---
date: "2021-07-20T00:00:00+00:00"
slug: "nuget"
sidebar_position: 80
---

# NuGet 軟體包註冊表

發佈适用于您的使用者或組織的 [NuGet](https://www.nuget.org/) 軟體包。軟體包註冊表支持 V2 和 V3 API 协议，並且您還可以使用 [NuGet 符号軟體包](https://docs.microsoft.com/zh-tw/nuget/create-packages/symbol-packages-snupkg)。

## 要求

要使用 NuGet 軟體包註冊表，您可以使用命令行界面工具，以及各种集成开发环境（IDE）中的 NuGet 功能，如 Visual Studio。有关 NuGet 客户端的更多信息，請参[阅官方文檔](https://docs.microsoft.com/zh-tw/nuget/install-nuget-client-tools)。
以下示例使用 `dotnet nuget` 工具。

## 配置軟體包註冊表

要注册軟體包註冊表，您需要配置一个新的 NuGet 源：

```shell
dotnet nuget add source --name {source_name} --username {username} --password {password} https://gitea.example.com/api/packages/{owner}/nuget/index.json
```

| 參數          | 描述                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `source_name` | 所需源名稱                                                                                                       |
| `username`    | 您的 Gitea 使用者名                                                                                                |
| `password`    | 您的 Gitea 密碼。如果您使用 2FA 或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)代替密碼。 |
| `owner`       | 軟體包的所有者                                                                                                   |

例如：

```shell
dotnet nuget add source --name gitea --username testuser --password password123 https://gitea.example.com/api/packages/testuser/nuget/index.json
```

您可以在不提供凭据的情况下添加源，並在發佈軟體包时使用--api-key 參數。在这种情况下，您需要提供[个人访问令牌](development/api-usage.md#通過-api-認證)。

## 發佈軟體包

通過运行以下命令發佈軟體包：

```shell
dotnet nuget push --source {source_name} {package_file}
```

| 參數           | 描述                         |
| -------------- | ---------------------------- |
| `source_name`  | 所需源名稱                   |
| `package_file` | 軟體包 `.nupkg` 文件的路径。 |

例如：

```shell
dotnet nuget push --source gitea test_package.1.0.0.nupkg
```

如果已经存在相同名稱和版本的軟體包，您無法發佈該軟體包。您必須先删除現有的軟體包。

### 符号軟體包

NuGet 軟體包註冊表支持构建用于符号服务器的符号軟體包。客户端可以請求嵌入在符号軟體包（`.snupkg`）中的 PDB 文件。
為此，請将 NuGet 軟體包註冊表注册為符号源：

```
https://gitea.example.com/api/packages/{owner}/nuget/symbols
```

| 參數    | 描述                 |
| ------- | -------------------- |
| `owner` | 軟體包註冊表的所有者 |

例如：

```
https://gitea.example.com/api/packages/testuser/nuget/symbols
```

## 安裝軟體包

要从軟體包註冊表安裝 NuGet 軟體包，請執行以下命令：

```shell
dotnet add package --source {source_name} --version {package_version} {package_name}
```

| 參數              | 描述         |
| ----------------- | ------------ |
| `source_name`     | 所需源名稱   |
| `package_name`    | 軟體包名稱   |
| `package_version` | 軟體包版本。 |

例如：

```shell
dotnet add package --source gitea --version 1.0.0 test_package
```

## 支持的命令

```
dotnet add
dotnet nuget push
dotnet nuget delete
```
