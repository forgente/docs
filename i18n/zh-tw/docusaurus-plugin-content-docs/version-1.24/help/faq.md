---
date: "2023-05-25T16:00:00+02:00"
slug: "faq"
sidebar_position: 5
aliases:
  - /zh-tw/faq
---

# 常见问题

本页面包含一些常见问题和答案。

有关更多帮助资源，請查看所有[支持選项](help/support.md)。

## 1.x 和 1.x.x 下载之间的区别

以 1.7.x 版本為例。

**注意：**此示例也适用于 Docker 镜像！

在我们的[下载页面](https://dl.gitea.com/gitea/)上，您会看到一个 1.7 目錄，以及 1.7.0、1.7.1、1.7.2、1.7.3、1.7.4、1.7.5 和 1.7.6 的目錄。

1.7 目錄和 1.7.0 目錄是**不同**的。1.7 目錄是在每个合並到[`release/v1.7`](https://github.com/go-gitea/gitea/tree/release/v1.7)分支的提交上构建的。

然而，1.7.0 目錄是在建立[`v1.7.0`](https://github.com/go-gitea/gitea/releases/tag/v1.7.0)標籤时建立的构建。

这意味着 1.x 的下载会随着提交合並到各自的分支而改变（将其视為每个版本的單独的“main”分支）。

另一方面，1.x.x 的下载應該永远不会改变。

## 如何从 Gogs/GitHub 等迁移到 Gitea

要从 Gogs 迁移到 Gitea：

- [Gogs 版本 0.11.46.0418](https://github.com/go-gitea/gitea/issues/4286)

要从 GitHub 迁移到 Gitea，您可以使用 Gitea 内置的迁移表單。

為了迁移诸如问题、拉取請求等项目，您需要至少输入您的使用者名。

[Example (requires login)](https://demo.gitea.com/repo/migrate)

要从 GitLab 迁移到 Gitea，您可以使用这个非关联的工具：

https://github.com/loganinak/MigrateGitlabToGogs

## Gitea 存儲文件的位置

- _`AppWorkPath`_
  - `--work-path`标志
  - 或者环境变量`GITEA_WORK_DIR`
  - 或者在构建时设置的内置值
  - 或者包含 Gitea 二進制文件的目錄
- `%(APP_DATA_PATH)`（数据库、索引器等的默认路径）
  - `app.ini`中的`APP_DATA_PATH`
  - 或者*`AppWorkPath`*`/data`
- _`CustomPath`_（自定义模板）
  - `--custom-path`标志
  - 或者环境变量`GITEA_CUSTOM`
  - 或者在构建时设置的内置值
  - 或者*`AppWorkPath`*`/custom`
- HomeDir
  - Unix：环境变量`HOME`
  - Windows：环境变量`USERPROFILE`，或者环境变量`HOMEDRIVE`+`HOMEPATH`
- RepoRootPath
  - `app.ini`中\[repository]部分的`ROOT`（如果是绝对路径）
  - 否则*`AppWorkPath`*`/ROOT`(如果`app.ini`中\[repository]部分的`ROOT`是相对路径）
  - 默认值為`%(APP_DATA_PATH)/gitea-repositories`
- INI（配置文件）
  - `--config`标志
  - 或者在构建时设置的可能内置值
  - 或者 _`CustomPath`_`/conf/app.ini`
- SQLite 数据库
  - app.ini 中 database 部分的 PATH
  - 或者`%(APP_DATA_PATH)/gitea.db`

## 看不到克隆 URL 或克隆 URL 不正确

有几个地方可能会导致显示不正确。

1. 如果使用反向代理，請确保按照[反向代理指南](../administration/reverse-proxies.md)中的正确说明進行设置。
2. 确保在`app.ini`的`server`部分中正确设置了`ROOT_URL`。

如果某些克隆選项未显示（HTTP/S 或 SSH），可以在`app.ini中`

- `DISABLE_HTTP_GIT`: 如果设為 true, 将会没有 HTTP/HTTPS 链接
- `DISABLE_SSH`: 如果设為 true, 将会没有 SSH 链接
- `SSH_EXPOSE_ANONYMOUS`: 如果设為 false, SSH 链接将会对匿名使用者隐藏

## 文件上传失败：413 Request Entity Too Large

当反向代理限制文件上传大小时，会出現此错误。

有关使用 nginx 解决此问题，請参阅[反向代理指南](../administration/reverse-proxies.md)。

## 自定义模板無法加载或运行错误

Gitea 的自定义模板必須将其添加到正确的位置，否则 Gitea 将無法找到並使用自定义模板。

模板的正确路径應該相對於`CustomPath`。

1. 要找到`CustomPath`，請在站点管理 -> 配置 中查找自定义文件根路径。

   如果找不到，請尝试`echo $GITEA_CUSTOM`。

2. 如果仍然找不到，默认值可以被[计算](faq.md#Gitea存儲文件的位置)
3. 如果仍然找不到路径，则可以参考[自定义 Gitea](../administration/customizing-gitea.md)页面，将模板添加到正确的位置。

## Gitea 是否有"GitHub/GitLab Pages"功能？

Gitea 不提供内置的 Pages 服务器。您需要一个专用的域名来提供静态页面，以避免 CSRF 安全风险。

對於简單的用法，您可以使用反向代理来重写和提供 Gitea 的原始文件 URL 中的静态内容。

還有一些已经可用的第三方服务，比如独立[pages server](https://codeberg.org/Codeberg/pages-server)的或[caddy plugin](https://github.com/42wim/caddy-gitea)，可以提供所需的功能。

## 活跃使用者与禁止登入使用者

在 Gitea 中，"活跃使用者"是指通過电子邮件激活其帳戶的使用者。

"禁止登入使用者"是指不允许再登入到 Gitea 的使用者。

## 设置日志记录

- [官方文檔](../administration/logging-config.md)

## 什么是 Swagger？

[Swagger](https://swagger.io/) 是 Gitea 用于其 API 文檔的工具。

所有 Gitea 实例都有内置的 API，無法完全禁用它。
但是，您可以在 app.ini 的 api 部分将 ENABLE_SWAGGER 设置為 false，以禁用其文檔显示。
有关更多信息，請参阅 Gitea 的[API 文檔](development/api-usage.md)。

您可以在上查看最新的 API（例如）https://gitea.com/api/swagger

您還可以在上查看`swagger.json`文件的示例 https://gitea.com/swagger.v1.json

## 调整服务器用于公共/私有使用

### 防止垃圾邮件发送者

有多种方法可以组合使用来防止垃圾邮件发送者：

1. 通過设置电子邮件域名的白名單或黑名單。
2. 通過设置一些域名或者 OpenID 白名單（见下文）。
3. 在您的`app.ini`中将`ENABLE_CAPTCHA`设置為`true`，並正确配置`RECAPTCHA_SECRET`和 `RECAPTCHA_SITEKEY`。
4. 将`DISABLE_REGISTRATION`设置為`true`，並通過 [CLI](../administration/command-line.md)、[API](development/api-usage.md) 或 Gitea 的管理界面建立新使用者。

### 僅允许/阻止特定的电子邮件域名

您可以在`app.ini`中的`[service]`下的配置`EMAIL_DOMAIN_WHITELIST` 或 `EMAIL_DOMAIN_BLOCKLIST`。

### 僅允许/阻止特定的 OpenID 提供商

您可以在`app.ini`的`[openid]`下配置`WHITELISTED_URI`或`BLACKLISTED_URIS`。

**注意**： 白名單优先，如果白名單非空，则忽略黑名單。

### 僅允许發佈问题的使用者

目前实現这一点的方法是建立/修改一个具有最大存放庫建立限制為 0 的使用者。

### 受限制的使用者

受限制的使用者僅能访问其組織/团队成员和协作所在的内容的子集，而忽略組織/存放庫等的公共标志。

示例用例：一个公司运行一个需要登入的 Gitea 实例。大多数存放庫是公开的（所有同事都可以访问/浏览）。

在某些情况下，某个客户或第三方需要访问特定的存放庫，並且只能访问該存放庫。通過将此类客户帳戶设置為受限制帳戶，並使用团队成员身份和/或协作来授予所需的任何访问权限，可以简單地实現这一点，而無需使所有内容都变為私有。

### 启用 Fail2ban

使用 [Fail2Ban](../administration/fail2ban-setup.md) 监视並阻止基于日志模式的自动登入尝试或其他恶意行為。

## SSHD vs 内建 SSH

SSHD 是大多数 Unix 系统上内建的 SSH 服务器。

Gitea 還提供了自己的 SSH 服务器，用于在 SSHD 不可用时使用。

## Gitea 运行缓慢

导致此问题的最常见原因是加载联合头像。

您可以通過在`app.ini`中将`ENABLE_FEDERATED_AVATAR`设置為`false`来关闭此功能。

還有一个可能需要更改的選项是在`app.ini`中将`DISABLE_GRAVATAR`设置為`true`。

## 無法建立存放庫/文件

請确保 Gitea 具有足够的权限来写入其主目錄和数据目錄。

参见[AppDataPath 和 RepoRootPath](faq.md#Gitea存儲文件的位置)

**适用于 Arch 使用者的注意事项：**在撰写本文时，Arch 軟體包的 systemd 文件包含了以下行：

`ReadWritePaths=/etc/gitea/app.ini`

这将使得 Gitea 無法写入其他路径。

## 翻译不正确/如何添加更多翻译

我们当前的翻译是在我们的[Crowdin 项目](https://crowdin.com/project/gitea)上众包進行的

無论您想要更改翻译還是添加新的翻译，都需要在 Crowdin 集成中進行，因為所有翻译都会被 CI 覆盖。

## 推送钩子/ Webhook / Actions 未运行

如果您可以推送但無法在主页仪表板上看到推送活动，或者推送不触发 Webhook 和 Actions，可能是 git 钩子不工作而导致的。

这可能是由于以下原因：

1. Git 钩子不同步：在站点管理面板上运行“重新同步所有存放庫的 pre-receive、update 和 post-receive 钩子”
2. Git 存放庫（和钩子）存儲在一些不支持脚本執行的文件系统上（例如由 NAS 挂载），請确保文件系统支持`chmod a+x any-script`
3. 如果您使用的是 Docker，請确保 Docker Server（而不是客户端）的版本 >= 20.10.6

## SSH 问题

如果無法通過`ssh`访问存放庫，但`https`正常工作，請考虑以下情况。

首先，請确保您可以通過 SSH 访问 Gitea。

`ssh git@myremote.example`

如果连接成功，您應該会收到以下错误消息：

```
Hi there, You've successfully authenticated, but Gitea does not provide shell access.
If this is unexpected, please log in with password and setup Gitea under another user.
```

如果您收到以上消息但仍然连接成功，这意味着您的 SSH 密钥**没有**由 Gitea 管理。这意味着钩子不会运行，在其他一些潜在问题中也包括在内。

如果您無法连接，可能是因為您的 SSH 密钥在本地配置不正确。
这是针对 SSH 而不是 Gitea 的问题，因此在此不涉及。

### SSH 常见错误

```
Permission denied (publickey).
fatal: Could not read from remote repository.
```

此错误表示服务器拒绝登入尝试，
請检查以下事项：

- 在客户端：
  - 确保公钥和私钥已添加到正确的 Gitea 使用者。
  - 确保远程 URL 中没有任何问题。特别是，請确保 ∂
    Git 使用者（@ 之前的部分）的名稱拼写正确。
  - 确保客户端机器上的公钥和私钥正确無误。
- 在服务器上：

  - 确保存儲库存在並且命名正确。
  - 检查系统使用者主目錄中的 `.ssh` 目錄的权限。
  - 驗證正确的公钥是否已添加到 `.ssh/authorized_keys` 中。

  尝试在 Gitea 管理面板上运行
  `Rewrite '.ssh/authorized_keys' file (for Gitea SSH keys)`。

- 查看 Gitea 日志。
- 查看 /var/log/auth（或类似的文件）。
- 检查存儲库的权限。

以下是一个示例，其中缺少公共 SSH 密钥，
認證成功，但是其他设置导致 SSH 無法访问正确的
存儲库。

```
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

在这种情况下，請检查以下设置：

- 在服务器上：
  - 确保`git`系统使用者设置了可用的 shell
    - 使用`getent passwd git | cut -d: -f7`進行驗證
    - 可以使用`usermod`或`chsh`進行修改。
  - 确保`.ssh/authorized_keys`中的`gitea serv`命令使用
    正确的配置文件。

## 迁移带有標籤的存儲库后缺失發佈版本

要迁移带有所有標籤的存儲库，您需要執行两个操作：

- 推送標籤到存儲库：

```
 git push --tags
```

- 在 Gitea 中重新同步所有存儲库的標籤：

```
gitea admin repo-sync-releases
```

## LFS 问题

针对涉及 LFS 数据上传的问题

```
batch response: Authentication required: Authorization error: <GITEA_LFS_URL>/info/lfs/objects/batch
Check that you have proper access to the repository
error: failed to push some refs to '<GIT_REPO_URL>'
```

检查`app.ini`文件中的`LFS_HTTP_AUTH_EXPIRY`值。

默认情况下，LFS 令牌在 20 分钟后過期。如果您的连接速度较慢或文件较大（或两者都是），可能無法在时间限制内完成上传。

您可以将此值设置為`60m`或`120m`。

## 如何在启动 Gitea 之前建立使用者

Gitea 提供了一个子命令`gitea migrate`来初始化数据库，然后您可以使用[管理 CLI 命令](../administration/command-line.md#admin)像正常情况下添加使用者。

## 如何启用密碼重置

没有密碼重置的设置。当配置了[邮件服务](../administration/email-setup.md)时，密碼重置将自动启用；否则将被禁用。

## 如何更改使用者的密碼

- 作為管理员，您可以更改任何使用者的密碼（並可選择强制其在下次登入时更改密碼）...
  - 转到您的`站点管理 -> 使用者账户`页面並编辑使用者。
- 使用[管理 CLI 命令](../administration/command-line.md#admin)。

  請注意，大多数命令還需要一个[全局标志](../administration/command-line.md#全局選项)来指向正确的配置。

- 作為**使用者**，您可以更改密碼...

  - 在您的账户的`设置 -> 账户`页面（此方法**需要**您知道当前密碼）。
  - 使用`忘记密碼`链接。

  如果`忘记密碼/账户恢复`页面被禁用，請联系管理员配置[邮件服务](../administration/email-setup.md)。

## 為什么我的 Markdown 显示错误

在 Gitea 版本 `1.11` 中，我们转换為使用[goldmark](https://github.com/yuin/goldmark)進行 Markdown 渲染，它符合[CommonMark](https://commonmark.org/)标准。

如果您在版本`1.11`之前的 Markdown 正常工作，但在升级后無法正常工作，請仔细阅读 CommonMark 规范，看看问题是由错误還是非兼容的语法引起的。

如果是后者，通常规范中会列出一种符合标准的替代方法。

## 使用 MySQL 進行升级时出現的错误

如果在使用 MySQL 升级 Gitea 时收到以下错误：

> `ORM engine initialization failed: migrate: do migrate: Error: 1118: Row size too large...`

請运行 `gitea doctor convert` 或对数据库中的每个表运行 `ALTER TABLE table_name ROW_FORMAT=dynamic;`。

潜在问题是默认行格式分配给每个表的索引空间
太小。Gitea 要求其表的`ROWFORMAT`為`DYNAMIC`。

如果收到包含`Error 1071: Specified key was too long; max key length is 1000 bytes...`
的错误行，则表示您正在尝试在使用 ISAM 引擎的表上运行 Gitea。尽管在先前版本的 Gitea 中可能是凑巧能够工作的，但它从未得到官方支持，
您必須使用 InnoDB。您應該对数据库中的每个表运行`ALTER TABLE table_name ENGINE=InnoDB;`。

## 為什么 Emoji 只显示占位符或單色图像

Gitea 需要系统或浏览器安裝其中一个受支持的 Emoji 字體，例如 Apple Color Emoji、Segoe UI Emoji、Segoe UI Symbol、Noto Color Emoji 和 Twemoji Mozilla。通常，操作系统應該已经提供了其中一个字體，但特别是在 Linux 上，可能需要手动安裝它们。

## SystemD 和 Docker 上的标准输出日志

SystemD 上的标准输出默认会写入日志记录中。您可以尝试使用 `journalctl`、`journalctl -u gitea` 或 `journalctl <path-to-gitea-binary>`来查看。

类似地，Docker 上的标准输出可以使用`docker logs <container>`来查看。

要收集日志以進行帮助和问题报告，請参阅[支持選项](help/support.md)。

## 初始日志记录

在 Gitea 读取配置文件並设置其日志记录之前，它会将一些内容记录到标准输出，以帮助调试日志记录無法工作的情况。

您可以通過设置`--quiet`或`-q`選项来停止此日志记录。請注意，这只会在 Gitea 设置自己的日志记录之前停止日志记录。

如果您报告了错误或问题，必須提供这些信息以恢复初始日志记录。

只有在完全配置了所有内容之后，您才應該设置此選项。

## 在数据库启动期间出現有关结构默认值的警告

有时，在迁移過程中，旧列和默认值可能在数据库架构中保持不变。
这可能会导致警告，例如：

```
2020/08/02 11:32:29 ...rm/session_schema.go:360:Sync() [W] Table user Column keep_activity_private db default is , struct default is 0
```

可以安全地忽略这些警告，但您可以通過让 Gitea 重新建立这些表来停止这些警告，使用以下命令：

```
gitea doctor recreate-table user
```

这将导致 Gitea 重新建立使用者表並将旧数据复制到新表中，
並正确设置默认值。

您可以使用以下命令要求 Gitea 重新建立多个表：

```
gitea doctor recreate-table table1 table2 ...
```

如果您希望 Gitea 重新建立所有表，請使用以下命令：

```
gitea doctor recreate-table
```

在运行这些命令之前，强烈建议您备份数据库。

## 為什么查看文件时制表符/缩進显示错误

如果您正在使用 Cloudflare，請在仪表板中关闭自动缩小選项。

`Speed` -> `Optimization` -> 在 `Auto-Minify` 设置中取消選中 `HTML`。

## 如何从硬碟采用存儲库

- 将您的（裸）存儲库添加到正确的位置，即您的配置所在的地方（`repository.ROOT`），确保它们位于正确的布局`<REPO_ROOT>/[user]/[repo].git`。
  - **注意：**目錄名必須為小写。
  - 您還可以在`<ROOT_URL>/admin/config`中检查存儲库根路径。
- 确保存在要采用存儲库的使用者/組織。
- 作為管理员，转到`<ROOT_URL>/admin/repos/unadopted`並搜索。
- 使用者也可以通過配置[`ALLOW_ADOPTION_OF_UNADOPTED_REPOSITORIES`](../administration/config-cheat-sheet.md#存放庫) 获得类似的权限。
- 如果上述步骤都正确執行，您應該能够選择要采用的存儲库。
  - 如果没有找到存儲库，請启用[调试日志记录](../administration/config-cheat-sheet.md#存放庫)以检查是否有特定错误。
