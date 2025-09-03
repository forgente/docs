---
date: "2023-01-10T00:00:00+00:00"
slug: "swift"
sidebar_position: 115
---

# Swift 軟體包註冊表

為您的使用者或組織發佈 [Swift](https://www.swift.org/) 軟體包。

## 要求

要使用 Swift 軟體包註冊表，您需要使用 [swift](https://www.swift.org/getting-started/) 消费軟體包，並使用 HTTP 客户端（如 `curl`）發佈軟體包。

## 配置軟體包註冊表

要注册軟體包註冊表並提供凭据，請執行以下命令：

```shell
swift package-registry set https://gitea.example.com/api/packages/{owner}/swift -login {username} -password {password}
```

| 占位符     | 描述                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `owner`    | 軟體包的所有者。                                                                                                                               |
| `username` | 您的 Gitea 使用者名。                                                                                                                            |
| `password` | 您的 Gitea 密碼。如果您使用两步驗證或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)代替密碼。 |

登入是可選的，只有在軟體包註冊表是私有的情况下才需要。

## 發佈軟體包

首先，您需要打包軟體包的内容：

```shell
swift package archive-source
```

要發佈軟體包，請執行一个带有軟體包内容的 HTTP `PUT` 請求，将内容放在請求正文中。

```shell --user your_username:your_password_or_token \
curl -X PUT --user {username}:{password} \
	 -H "Accept: application/vnd.swift.registry.v1+json" \
	 -F source-archive=@/path/to/package.zip \
	 -F metadata={metadata} \
	 https://gitea.example.com/api/packages/{owner}/swift/{scope}/{name}/{version}
```

| 占位符     | 描述                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `username` | 您的 Gitea 使用者名。                                                                                                                            |
| `password` | 您的 Gitea 密碼。如果您使用两步驗證或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)代替密碼。 |
| `owner`    | 軟體包的所有者。                                                                                                                               |
| `scope`    | 軟體包的作用域。                                                                                                                               |
| `name`     | 軟體包的名稱。                                                                                                                                 |
| `version`  | 軟體包的版本。                                                                                                                                 |
| `metadata` | （可選）軟體包的元数据。以 JSON 编码的子集，格式参考 https://schema.org/SoftwareSourceCode                                                     |

如果已经存在相同名稱和版本的軟體包，则無法發佈軟體包。您必須首先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表安裝 Swift 軟體包，請将其添加到 `Package.swift` 文件的依赖项列表中：

```
dependencies: [
	.package(id: "{scope}.{name}", from:"{version}")
]
```

| 參數      | 描述           |
| --------- | -------------- |
| `scope`   | 軟體包的作用域 |
| `name`    | 軟體包的名稱   |
| `version` | 軟體包的版本   |

之后，執行以下命令来安裝它：

```shell
swift package resolve
```
