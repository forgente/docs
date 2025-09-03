---
date: "2021-07-20T00:00:00+00:00"
slug: "overview"
sidebar_position: 1
---

# 軟體包註冊表

从Gitea **1.17**版本开始，軟體包註冊表可以用作常见軟體包管理器的公共或私有註冊表。

## 支持的軟體包管理器

目前支持以下軟體包管理器：

| Name                                                                | Language   | Package client            |
| ------------------------------------------------------------------- | ---------- | ------------------------- |
| [Alpine](usage/packages/alpine.md)       | -          | `apk`                     |
| [Cargo](usage/packages/cargo.md)         | Rust       | `cargo`                   |
| [Chef](usage/packages/chef.md)           | -          | `knife`                   |
| [Composer](usage/packages/composer.md)   | PHP        | `composer`                |
| [Conan](usage/packages/conan.md)         | C++        | `conan`                   |
| [Conda](usage/packages/conda.md)         | -          | `conda`                   |
| [Container](usage/packages/container.md) | -          | 任何符合OCI规范的客户端   |
| [CRAN](usage/packages/cran.md)           | R          | -                         |
| [Debian](usage/packages/debian.md)       | -          | `apt`                     |
| [Generic](usage/packages/generic.md)     | -          | 任何HTTP客户端            |
| [Go](usage/packages/go.md)               | Go         | `go`                      |
| [Helm](usage/packages/helm.md)           | -          | 任何HTTP客户端, `cm-push` |
| [Maven](usage/packages/maven.md)         | Java       | `mvn`, `gradle`           |
| [npm](usage/packages/npm.md)             | JavaScript | `npm`, `yarn`, `pnpm`     |
| [NuGet](usage/packages/nuget.md)         | .NET       | `nuget`                   |
| [Pub](usage/packages/pub.md)             | Dart       | `dart`, `flutter`         |
| [PyPI](usage/packages/pypi.md)           | Python     | `pip`, `twine`            |
| [RPM](usage/packages/rpm.md)             | -          | `yum`, `dnf`, `zypper`    |
| [RubyGems](usage/packages/rubygems.md)   | Ruby       | `gem`, `Bundler`          |
| [Swift](usage/packages/rubygems.md)      | Swift      | `swift`                   |
| [Vagrant](usage/packages/vagrant.md)     | -          | `vagrant`                 |

**以下段落僅适用于未全局禁用軟體包的情况！**

## 存放庫 x 軟體包

軟體包始终属于所有者（使用者或組織），而不是存放庫。
要将（已上传的）軟體包链接到存放庫，請打开該軟體包的设置页面，並選择要将此軟體包链接到的存放庫。
将链接到整个軟體包，而不僅是單个版本。

链接軟體包将导致在存放庫的軟體包列表中显示該軟體包，並在軟體包页面上显示到存放庫的链接（以及到存放庫工單的链接）。

## 访问限制

| 軟體包所有者類型 | 使用者                                     | 組織                                       |
| ---------------- | ---------------------------------------- | ------------------------------------------ |
| **读取** 访问    | 公开，如果使用者也是公开的；否则僅限此使用者 | 公开，如果組織是公开的，否则僅限組織成员   |
| **写入** 访问    | 僅軟體包所有者                           | 具有組織中的管理员或写入访问权限的組織成员 |

注意：这些访问限制可能会[变化](https://github.com/go-gitea/gitea/issues/19270)，将通過专门的組織团队权限添加更细粒度的控制。

## 建立或上传軟體包

根据軟體包類型，使用相應的軟體包管理器。請查看特定軟體包管理器的子页面以获取说明。

## 查看軟體包

您可以在存放庫页面上查看存放庫的軟體包。

1. 转到存放庫主页。
2. 在导航栏中選择**軟體包**

要查看有关軟體包的更多详细信息，請選择軟體包的名稱。

## 下载軟體包

要从存放庫下载軟體包：

1. 在导航栏中選择**軟體包**
2. 選择軟體包的名稱以查看详细信息。
3. 在 **Assets** 部分，選择要下载的軟體包文件的名稱。

## 删除軟體包

在将軟體包發佈到軟體包註冊表后，您無法编辑軟體包。相反，您必須删除並重新建立它。

要从存放庫中删除軟體包：

1. 在导航栏中選择**軟體包**
2. 選择軟體包的名稱以查看详细信息。
3. 單擊**删除軟體包**以永久删除軟體包。

## 禁用軟體包註冊表

包註冊表已自动启用。要在單个存儲库中禁用它：

1. 在导航栏中選择**设置**。
2. 禁用**启用存放庫軟體包註冊表**.

禁用軟體包註冊表不会删除先前發佈的軟體包。
