---
date: "2023-05-23T09:00:00+08:00"
slug: "signing"
sidebar_position: 50
aliases:
  - /zh-tw/signing
---

# GPG 提交签名

Gitea 将通過检查提交是否由 Gitea 数据库中的密钥签名，或者提交是否与 Git 的默认密钥匹配，来驗證提供的树中的 GPG 提交签名。

密钥不会被检查以确定它们是否已過期或撤销。密钥也不会与密钥服务器進行检查。

如果找不到用于驗證提交的密钥，提交将被标记為灰色的未锁定图标。如果提交被标记為红色的未锁定图标，则表示它使用带有 ID 的密钥签名。

請注意：提交的签署者不必是提交的作者或提交者。

此功能要求 Git >= 1.7.9，但要实現全部功能，需要 Git >= 2.0.0。

## 自动签名

有许多地方 Gitea 会生成提交：

- 存放庫初始化
- Wiki 更改
- 使用编辑器或 API 進行的 CRUD 操作
- 从合並請求進行合並

根据配置和服务器信任，您可能希望 Gitea 对这些提交進行签名。

## 安裝和生成 Gitea 的 GPG 密钥

如何安裝签名密钥由服务器管理员决定。Gitea 目前使用服务器的 `git` 命令生成所有提交，因此将使用服务器的 `gpg` 進行签名（如果配置了）。管理员應該审查 GPG 的最佳实践 - 特别是可能建议僅安裝签名的子密钥，而不是主签名和認證的密钥。

## 通用配置

Gitea 的签名配置可以在 `app.ini` 的 `[repository.signing]` 部分找到：

```ini
...
[repository.signing]
SIGNING_KEY = default
SIGNING_NAME =
SIGNING_EMAIL =
INITIAL_COMMIT = always
CRUD_ACTIONS = pubkey, twofa, parentsigned
WIKI = never
MERGES = pubkey, twofa, basesigned, commitssigned

...
```

### `SIGNING_KEY`

首先讨论的選项是 `SIGNING_KEY`。有三个主要選项：

- `none` - 这将阻止 Gitea 对任何提交進行签名
- `default` - Gitea 将使用 `git config` 中配置的默认密钥
- `KEYID` - Gitea 将使用具有 ID `KEYID` 的 GPG 密钥对提交進行签名。在这种情况下，您應該提供 `SIGNING_NAME` 和 `SIGNING_EMAIL`，以便显示此密钥的信息。

`default` 選项将读取 `git config` 中的 `commit.gpgsign` 選项 - 如果设置了該選项，它将使用 `user.signingkey`、`user.name` 和 `user.email` 的结果。

通過在 Gitea 的存放庫中调整 Git 的 `config` 文件，可以使用 `SIGNING_KEY=default` 為每个存放庫提供不同的签名密钥。然而，这显然不是一个理想的使用者界面，因此可能会发生更改。

:::warning
**自 1.17 起**，Gitea 在自己的主目錄 `[git].HOME_PATH`（默认為 `%(APP_DATA_PATH)/home`）中运行 git，並使用自己的配置文件 `{[git].HOME_PATH}/.gitconfig`。

如果您有自己定制的 Gitea git 配置，您應該将这些配置设置在系统 git 配置文件中（例如 `/etc/gitconfig`）或者 Gitea 的内部 git 配置文件 `{[git].HOME_PATH}/.gitconfig` 中。

与 git 命令相关的主目錄文件（如 `.gnupg`）也應該放在 Gitea 的 git 主目錄 `[git].HOME_PATH` 中。
如果您希望将 `.gnupg` 目錄放在 `{[git].HOME_PATH}/` 之外的位置，請考虑设置 `$GNUPGHOME` 环境变量為您首選的位置，否则 Gitea 将会从 `{[git].HOME_PATH}/.gnupg` 查找私钥。
:::

### `INITIAL_COMMIT`

此選项确定在建立存放庫时，Gitea 是否應該对初始提交進行签名。可能的取值有：

- `never`：从不签名
- `pubkey`：僅在使用者拥有公钥时進行签名
- `twofa`：僅在使用者使用 2FA 登入时進行签名
- `always`：始终签名

除了 `never` 和 `always` 之外的選项可以组合為逗号分隔的列表。如果所有選择的選项都為 true，则提交将被签名。

### `WIKI`

此選项确定 Gitea 是否應該对 Wiki 的提交進行签名。可能的取值有：

- `never`：从不签名
- `pubkey`：僅在使用者拥有公钥时進行签名
- `twofa`：僅在使用者使用 2FA 登入时進行签名
- `parentsigned`：僅在父提交已签名时進行签名。
- `always`：始终签名

除了 `never` 和 `always` 之外的選项可以组合為逗号分隔的列表。如果所有選择的選项都為 true，则提交将被签名。

### `CRUD_ACTIONS`

此選项确定 Gitea 是否應該对 Web 编辑器或 API CRUD 操作的提交進行签名。可能的取值有：

- `never`：从不签名
- `pubkey`：僅在使用者拥有公钥时進行签名
- `twofa`：僅在使用者使用 2FA 登入时進行签名
- `parentsigned`：僅在父提交已签名时進行签名。
- `always`：始终签名

除了 `never` 和 `always` 之外的選项可以组合為逗号分隔的列表。如果所有選择的選项都為 true，则更改将被签名。

### `MERGES`

此選项确定 Gitea 是否應該对 PR 的合並提交進行签名。可能的選项有：

- `never`：从不签名
- `pubkey`：僅在使用者拥有公钥时進行签名
- `twofa`：僅在使用者使用 2FA 登入时進行签名
- `basesigned`：僅在基础存放庫中的父提交已签名时進行签名。
- `headsigned`：僅在头分支中的头提交已签名时進行签名。
- `commitssigned`：僅在头分支中的所有提交到合並点的提交都已签名时進行签名。
- `approved`：僅对已批准的合並到受保护分支的提交進行签名。
- `always`：始终签名

除了 `never` 和 `always` 之外的選项可以组合為逗号分隔的列表。如果所有選择的選项都為 true，则合並将被签名。

## 获取签名密钥的公钥

用于签署 Gitea 提交的公钥可以通過 API 获取：

```sh
/api/v1/signing-key.gpg
```

在存在特定于存放庫的密钥的情况下，可以通過以下方式获取：

```sh
/api/v1/repos/:username/:reponame/signing-key.gpg
```
