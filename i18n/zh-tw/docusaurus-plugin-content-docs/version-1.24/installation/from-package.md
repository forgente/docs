---
date: "2016-12-01T16:00:00+02:00"
slug: "install-from-package"
sidebar_position: 20
aliases:
  - /zh-tw/install-from-package
---

# 包管理器安裝

## 官方包管理器

### macOS

macOS 平台下当前我们僅支持通過 `brew` 来安裝。如果你没有安裝 [Homebrew](http://brew.sh/)，你也可以查看 [从二進制安裝](installation/from-binary.md)。在你安裝了 `brew` 之后， 你可以執行以下命令：

```
brew install gitea
```

## 非官方包管理器

### Alpine Linux

Gitea 已经包含在 Alpine Linux 的[社区存儲库](https://pkgs.alpinelinux.org/packages?name=gitea&branch=edge)中，版本与 Gitea 官方保持同步。

```sh
apk add gitea
```

### Arch Linux

Gitea 已经在滚动發佈发行版的官方[社区存儲库](https://www.archlinux.org/packages/community/x86_64/gitea/)中，版本与 Gitea 官方保持同步。

```sh
pacman -S gitea
```

### Arch Linux ARM

官方支持 [aarch64](https://archlinuxarm.org/packages/aarch64/gitea)， [armv7h](https://archlinuxarm.org/packages/armv7h/gitea) 和 [armv6h](https://archlinuxarm.org/packages/armv6h/gitea) 架构。

```sh
pacman -S gitea
```

### Gentoo Linux

滚动發佈的发行版在其官方社区软件存放庫中提供了 [Gitea](https://packages.gentoo.org/packages/www-apps/gitea)，並且会随着新的 Gitea 發佈提供軟體包更新。

```sh
emerge gitea -va
```

### Canonical Snap

目前 Gitea 已在 Snap Store 中發佈，名稱為 [gitea](https://snapcraft.io/gitea)。

```sh
snap install gitea
```

### SUSE/openSUSE

OpenSUSE 构建服务為 [openSUSE 和 SLE](https://software.opensuse.org/download/package?package=gitea&project=devel%3Atools%3Ascm)
提供包，你可以在开发软件配置管理存儲库中找到它们。

### Windows

目前你可以通過 [Chocolatey](https://chocolatey.org/) 来安裝 [Gitea](https://chocolatey.org/packages/gitea)。

```sh
choco install gitea
```

你也可以 [从二進制安裝](installation/from-binary.md) 。

### FreeBSD

可以使用 Gitea 的 FreeBSD port `www/gitea`。 請安裝预构建的二進制包：

```
pkg install gitea
```

對於最新版本，或使用自定义選项构建 port，請
[从 port 安裝](https://www.freebsd.org/doc/handbook/ports-using.html)：

```
su -
cd /usr/ports/www/gitea
make install clean
```

該 port 使用标准的 FreeBSD 文件系统布局：配置文件在 `/usr/local/etc/gitea` 目錄中，
模板、選项、插件和主题在 `/usr/local/share/gitea` 目錄中，启动脚本在 `/usr/local/etc/rc.d/gitea` 目錄中。

要使 Gitea 作為服务运行，請运行 `sysrc gitea_enable=YES` 並使用 `service gitea start` 命令启动它。

### 其它

如果这里没有找到你喜欢的包管理器，可以使用 Gitea 第三方軟體包。这里有一个完整的列表： [awesome-gitea](https://gitea.com/gitea/awesome-gitea/src/branch/master/README.md#user-content-packages)。

如果你知道其他 Gitea 第三方軟體包，請发送 PR 来添加它。
