---
date: "2021-07-20T00:00:00+00:00"
slug: "conan"
sidebar_position: 20
---

# Conan 軟體包註冊表

為您的使用者或組織發佈 [Conan](https://conan.io/) 軟體包。

## 要求

要使用 [conan](https://conan.io/downloads.html) 軟體包註冊表，您需要使用 conan 命令行工具来消费和發佈軟體包。

## 配置軟體包註冊表

要注册軟體包註冊表，您需要配置一个新的 Conan remote：

```shell
conan remote add {remote} https://gitea.example.com/api/packages/{owner}/conan
conan user --remote {remote} --password {password} {username}
```

| 參數       | 描述                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `remote`   | 远程名稱。                                                                                                                                  |
| `username` | 您的 Gitea 使用者名。                                                                                                                         |
| `password` | 您的 Gitea 密碼。如果您使用 2FA 或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)替代密碼。 |
| `owner`    | 軟體包的所有者。                                                                                                                            |

例如:

```shell
conan remote add gitea https://gitea.example.com/api/packages/testuser/conan
conan user --remote gitea --password password123 testuser
```

## 發佈軟體包

通過运行以下命令發佈 Conan 軟體包：

```shell
conan upload --remote={remote} {recipe}
```

| 參數     | 描述            |
| -------- | --------------- |
| `remote` | 远程名稱        |
| `recipe` | 要上传的 recipe |

For example:

```shell
conan upload --remote=gitea ConanPackage/1.2@gitea/final
```

Gitea Conan 軟體包註冊表支持完整的[版本修订](https://docs.conan.io/en/latest/versioning/revisions.html)。

## 安裝軟體包

要从軟體包註冊表中安裝Conan軟體包，請執行以下命令：

```shell
conan install --remote={remote} {recipe}
```

| 參數     | 描述            |
| -------- | --------------- |
| `remote` | 远程名稱        |
| `recipe` | 要下载的 recipe |

例如：

```shell
conan install --remote=gitea ConanPackage/1.2@gitea/final
```

## 支持的命令

```
conan install
conan get
conan info
conan search
conan upload
conan user
conan download
conan remove
```
