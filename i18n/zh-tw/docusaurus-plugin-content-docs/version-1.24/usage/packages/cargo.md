---
date: "2022-11-20T00:00:00+00:00"
slug: "cargo"
sidebar_position: 5
---

# Cargo 軟體包註冊表

為您的使用者或組織發佈 [Cargo](https://doc.rust-lang.org/stable/cargo/) 軟體包。

## 要求

若要使用 Cargo 軟體包註冊表, 您需要安裝 [Rust 和 Cargo](https://www.rust-lang.org/tools/install).

Cargo 将可用軟體包的信息存儲在一个存儲在 git 存放庫中的軟體包索引中。
这个存放庫是与註冊表交互所必需的。
下面的部分将介绍如何建立它。

## 索引存放庫

Cargo 将可用軟體包的信息存儲在一个存儲在 git 存放庫中的軟體包索引中。
在 Gitea 中，这个存放庫有一个特殊的名稱叫做 `_cargo-index`。
在上传軟體包之后，它的元数据会自动写入索引中。
不應手动修改这个註冊表的内容。

使用者或組織軟體包设置页面允许建立这个索引存放庫以及配置文件。
如果需要，此操作将重写配置文件。
例如，如果 Gitea 实例的域名已更改，这将非常有用。

如果存儲在 Gitea 中的軟體包与索引註冊表中的信息不同步，设置页面允许重建这个索引註冊表。
这个操作将遍历註冊表中的所有軟體包，並将它们的信息写入索引中。
如果有很多軟體包，这个過程可能需要一些时间。

## 配置軟體包註冊表

要注册这个軟體包註冊表，必須更新 Cargo 的配置。
将以下文本添加到位于当前使用者主目錄中的配置文件中（例如 `~/.cargo/config.toml`）：

```
[registry]
default = "gitea"

[registries.gitea]
index = "sparse+https://gitea.example.com/api/packages/{owner}/cargo/" # Sparse index
# index = "https://gitea.example.com/{owner}/_cargo-index.git" # Git

[net]
git-fetch-with-cli = true
```

| 參數    | 描述             |
| ------- | ---------------- |
| `owner` | 軟體包的所有者。 |

如果这个註冊表是私有的或者您想要發佈新的軟體包，您必須配置您的凭据。
将凭据部分添加到位于当前使用者主目錄中的凭据文件中（例如 `~/.cargo/credentials.toml`）：

```
[registries.gitea]
token = "Bearer {token}"
```

| 參數    | 描述                                                                                  |
| ------- | ------------------------------------------------------------------------------------- |
| `token` | 您的[个人访问令牌](development/api-usage.md#通過-api-認證) |

## 發佈軟體包

在项目中运行以下命令来發佈軟體包：

```shell
cargo publish
```

如果已经存在同名和版本的軟體包，您将無法發佈新的軟體包。您必須先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表安裝軟體包，請執行以下命令：

```shell
cargo add {package_name}
```

| 參數           | 描述         |
| -------------- | ------------ |
| `package_name` | 軟體包名稱。 |

## 支持的命令

```
cargo publish
cargo add
cargo install
cargo yank
cargo unyank
cargo search
```
