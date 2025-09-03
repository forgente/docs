---
date: "2016-12-01T16:00:00+02:00"
slug: "install-from-source"
sidebar_position: 30
aliases:
  - /zh-tw/install-from-source
---

# 使用源代码安裝

你需要 [安裝 Go](https://golang.google.cn/doc/install) 並正确设置 Go 环境。特别的，建议设置`$GOPATH`环境变量，並将 Go 的二進制目錄或目錄`${GOPATH//://bin:}/bin`添加到`$PATH`中。請参阅 Go 百科上关于 [GOPATH](https://github.com/golang/go/wiki/GOPATH) 的詞条。

接下来，[安裝 Node.js 和 npm](https://nodejs.org/zh-tw/download/)， 这是构建 JavaScript 和 CSS 文件所需的。最低支持的 Node.js 版本是 @minNodeVersion@，建议使用最新的 LTS 版本。

**注意**：需要 Go 版本 @minGoVersion@ 或更高版本。不過，建议获取与我们的持续集成（continuous integration, CI）相同的版本，請参阅在 [Hacking on Gitea](development/hacking-on-gitea.md) 中给出的建议。

## 下载

首先，我们需要获取源码。由于引入了 Go 模組，最简單的方法是直接使用 Git，因為我们不再需要在 GOPATH 内构建 Gitea。

```bash
git clone https://github.com/go-gitea/gitea
```

（之前的版本中建议使用 `go get`，但現在不再需要。）

你可以選择编译和安裝的版本，当前有多个選择。`main` 分支代表当前的开发版本。如果你想编译 `main` 版本，你可以直接跳到 [构建](#构建) 部分。

如果你想编译带有標籤的发行版本，可以使用以下命令签出：

```bash
git branch -a
git checkout @sourceBranch@
```

要驗證一个拉取請求（Pull Request, PR），要先启用新的分支（其中 `xyz` 是 PR 的 ID；例如，對於 [#2663](https://github.com/go-gitea/gitea/pull/2663)，ID 是 `2663 `）：

```bash
git fetch origin pull/xyz/head:pr-xyz
```

要以指定发行版本（如 @sourceVersion@ ）的源代码来构建 Gitea，可執行以下命令列出可用的版本並選择某个版本签出。
使用以下命令列出可用的版本：

```bash
git tag -l
git checkout @sourceVersion@  # or git checkout pr-xyz
```

## 构建

要从源代码進行构建，系统必須预先安裝以下程序：

- `go` @minGoVersion@ 或更高版本，請参阅 [这里](https://go.dev/dl/)
- `node` @minNodeVersion@ 或更高版本，並且安裝 `npm`, 請参阅 [这里](https://nodejs.org/zh-tw/download/)
- `make`, 請参阅 [这里](development/hacking-on-gitea.md)

為了尽可能简化编译過程，提供了各种 [make 任务](https://github.com/go-gitea/gitea/blob/main/Makefile)。

根据你的构建需求，以下 tags 可以使用：

- `bindata`: 构建一个單一的整體二進制文件，包含所有资源。适用于构建生产环境版本。
- `sqlite sqlite_unlock_notify`: 启用对 [SQLite3](https://sqlite.org/) 数据库的支持。僅建议在少数人使用时使用这个模式。
- `pam`: 启用对 PAM（ Linux 可插拔認證模組）的支持。可用于对本地使用者進行身份驗證或扩展身份驗證到 PAM 可用的方法。
- `gogit`：（实验性功能）使用 go-git 变體的 Git 命令。

将所有资源（JS/CSS/模板等）打包到二進制文件中。在生产环境部署时，使用`bindata`构建標籤是必需的。在开发/测试 Gitea 或能够明确分离资源时，可以不用`bindata`。

要包含所有资源，請使用 `bindata` 標籤：

```bash
TAGS="bindata" make build
```

在我们的持续集成系统的默认发行版中，构建標籤為：`TAGS="bindata sqlite sqlite_unlock_notify"`。因此，从源码构建的最简單、推荐方式是：

```bash
TAGS="bindata sqlite sqlite_unlock_notify" make build
```

`build`目标分為两个子目标：

- `make backend` 需要 [Go @minGoVersion@](https://golang.google.cn/doc/install) 或更高版本。
- `make frontend` 需要 [Node.js @minNodeVersion@](https://nodejs.org/zh-tw/download/) 或更高版本。

如果存在预构建的前端文件，可以僅构建后端：

```bash
TAGS="bindata" make backend
```

## 测试

按照上述步骤完成后，工作目錄中将会有一个`gitea`二進制文件。可以从該目錄進行测试，或将其移动到带有测试数据的目錄中。当手动从命令行启动 Gitea 时，可以通過按下`Ctrl + C`来停止程序。

```bash
./gitea web
```

## 更改默认路径

Gitea 将从`CustomPath`中查找许多信息。默认的，这会在运行 Gitea 时当前工作目錄下的`custom/`目錄中（译者案：即`$PATH_TO_YOUR_GITEA$/custom/`）。它還将在`$(CustomPath)/conf/app.ini`中查找其配置文件`CustomConf`，並将当前工作目錄用作一些可配置值的相对基本路径`AppWorkPath`。最后，静态文件将从默认為 `AppWorkPath`的`StaticRootPath`提供。

尽管在开发时这些值很有用，但可能与下游使用者的偏好冲突。

一种選择是使用脚本文件来隐藏`gitea`二進制文件，並在运行 Gitea 之前建立适当的环境。然而，在构建时，可以使用`make`的`LDFLAGS`环境变量来更改这些默认值。适当的设置如下：

- 要设置`CustomPath`，請使用`LDFLAGS="-X \"code.gitea.io/gitea/modules/setting.CustomPath=custom-path\""`
- 對於`CustomConf`，應該使用`-X \"code.gitea.io/gitea/modules/setting.CustomConf=conf.ini\"`
- 對於`AppWorkPath`，應該使用`-X \"code.gitea.io/gitea/modules/setting.AppWorkPath=working-path\"`
- 對於`StaticRootPath`，應該使用`-X \"code.gitea.io/gitea/modules/setting.StaticRootPath=static-root-path\"`
- 要更改默认的 PID 文件位置，請使用`-X \"code.gitea.io/gitea/cmd.PIDFile=/run/gitea.pid\"`

将这些字符串与其前导的`-X`添加到`LDFLAGS`变量中，並像上面那样使用适当的`TAGS`运行`make build`。

运行`gitea help`将允许您查看配置的`gitea`设置。

## 交叉编译

`go`编译器工具链支持将代码交叉编译到不同的目标架构上。請参考[`GOOS`和`GOARCH`环境变量](https://go.dev/doc/install/source#environment) 以获取支持的目标列表。如果您想為性能较弱的系统（如树莓派）构建 Gitea，交叉编译非常有用。

要使用构建標籤（`TAGS`）進行交叉编译 Gitea，您還需要一个 C 交叉编译器，該编译器的目标架构与`GOOS`和`GOARCH`变量選择的架构相同。例如，要為 Linux ARM64（`GOOS=linux`和`GOARCH=arm64`）進行交叉编译，您需要`aarch64-unknown-linux-gnu-gcc`交叉编译器。这是因為 Gitea 构建標籤使用了`cgo`的外部函数接口（FFI）。

在没有任何標籤的情况下，交叉编译的 Gitea 為 Linux ARM64 版本：

```
GOOS=linux GOARCH=arm64 make build
```

要交叉编译 Linux ARM64 下的 Gitea，这是推荐的构建標籤：

```
CC=aarch64-unknown-linux-gnu-gcc GOOS=linux GOARCH=arm64 TAGS="bindata sqlite sqlite_unlock_notify" make build
```

根据您的目标架构，适当替换`CC`、`GOOS`和`GOARCH`。

有时您需要构建一个静态编译的镜像。為此，您需要添加以下内容：

```
LDFLAGS="-linkmode external -extldflags '-static' $LDFLAGS" TAGS="netgo osusergo $TAGS" make build
```

这可以与上述的`CC`、`GOOS`和`GOARCH`结合使用。

### 添加 bash/zsh 自动补全（从 1.19 版本起）

在[`contrib/autocompletion/bash_autocomplete`](https://raw.githubusercontent.com/go-gitea/gitea/main/contrib/autocompletion/bash_autocomplete)中可以找到一个启用 bash 自动补全的脚本。您可以根据需要進行修改，並在您的 `.bashrc` 中使用 `source` 命令加载該脚本，或者将其复制到 `/usr/share/bash-completion/completions/gitea`。

类似地，可以在[`contrib/autocompletion/zsh_autocomplete`](https://raw.githubusercontent.com/go-gitea/gitea/main/contrib/autocompletion/zsh_autocomplete)中找到一个用于 zsh 自动补全的脚本。您可以将其复制到 `/usr/share/zsh/_gitea`，或者在您的 `.zshrc` 中使用 `source` 命令加载該脚本。

可能需要你根据具體情况進一步改進这些脚本。

## 在 Linux 上使用 Zig 進行编译或交叉编译

請按照 [Zig 的入门指南](https://ziglang.org/learn/getting-started/#installing-zig) 安裝 Zig。

- 编译 (Linux ➝ Linux)

```sh
CC="zig cc -target x86_64-linux-gnu" \
CGO_ENABLED=1 \
CGO_CFLAGS="-O2 -g -pthread" \
CGO_LDFLAGS="-linkmode=external -v"
GOOS=linux \
GOARCH=amd64 \
TAGS="bindata sqlite sqlite_unlock_notify" \
make build
```

- 交叉编译 (Linux ➝ Windows)

```sh
CC="zig cc -target x86_64-windows-gnu" \
CGO_ENABLED=1 \
CGO_CFLAGS="-O2 -g -pthread" \
GOOS=windows \
GOARCH=amd64 \
TAGS="bindata sqlite sqlite_unlock_notify" \
make build
```

## 在 Windows 上使用 Zig 進行编译或交叉编译

使用`GIT BASH`编译。

- 编译 (Windows ➝ Windows)

```sh
CC="zig cc -target x86_64-windows-gnu" \
CGO_ENABLED=1 \
CGO_CFLAGS="-O2 -g -pthread" \
GOOS=windows \
GOARCH=amd64 \
TAGS="bindata sqlite sqlite_unlock_notify" \
make build
```

- 交叉编译 (Windows ➝ Linux)

```sh
CC="zig cc -target x86_64-linux-gnu" \
CGO_ENABLED=1 \
CGO_CFLAGS="-O2 -g -pthread" \
CGO_LDFLAGS="-linkmode=external -v"
GOOS=linux \
GOARCH=amd64 \
TAGS="bindata sqlite sqlite_unlock_notify" \
make build
```

## Source Map

默认情况下，gitea 会為前端文件生成精简的 Source Map 以节省空间。 这可以通過“ENABLE_SOURCEMAP”环境变量進行控制：

- `ENABLE_SOURCEMAP=true` 生成所有 Source Map，这是开发版本的默认设置
- `ENABLE_SOURCEMAP=reduced` 生成有限的 Source Map，这是生产版本的默认设置
- `ENABLE_SOURCEMAP=false` 不生成 Source Map
