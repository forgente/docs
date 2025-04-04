---
date: "2021-07-20T00:00:00+00:00"
slug: "overview"
sidebar_position: 1
---

# 概述

從 Gitea **1.17** 開始，套件註冊表可以用作常見套件管理器的公共或私有註冊表。

## 支持的套件管理器

目前支持以下套件管理器：

| 名稱                                     | 語言       | 套件客戶端                  |
| ---------------------------------------- | ---------- | --------------------------- |
| [Alpine](usage/packages/alpine.md)       | -          | `apk`                       |
| [Arch](usage/packages/arch.md)           | -          | `pacman`                    |
| [Cargo](usage/packages/cargo.md)         | Rust       | `cargo`                     |
| [Chef](usage/packages/chef.md)           | -          | `knife`                     |
| [Composer](usage/packages/composer.md)   | PHP        | `composer`                  |
| [Conan](usage/packages/conan.md)         | C++        | `conan`                     |
| [Conda](usage/packages/conda.md)         | -          | `conda`                     |
| [Container](usage/packages/container.md) | -          | 任何符合 OCI 的客戶端       |
| [CRAN](usage/packages/cran.md)           | R          | -                           |
| [Debian](usage/packages/debian.md)       | -          | `apt`                       |
| [Generic](usage/packages/generic.md)     | -          | 任何 HTTP 客戶端            |
| [Go](usage/packages/go.md)               | Go         | `go`                        |
| [Helm](usage/packages/helm.md)           | -          | 任何 HTTP 客戶端，`cm-push` |
| [Maven](usage/packages/maven.md)         | Java       | `mvn`，`gradle`             |
| [npm](usage/packages/npm.md)             | JavaScript | `npm`，`yarn`，`pnpm`       |
| [NuGet](usage/packages/nuget.md)         | .NET       | `nuget`                     |
| [Pub](usage/packages/pub.md)             | Dart       | `dart`，`flutter`           |
| [PyPI](usage/packages/pypi.md)           | Python     | `pip`，`twine`              |
| [RPM](usage/packages/rpm.md)             | -          | `yum`，`dnf`，`zypper`      |
| [RubyGems](usage/packages/rubygems.md)   | Ruby       | `gem`，`Bundler`            |
| [Swift](usage/packages/swift.md)         | Swift      | `swift`                     |
| [Vagrant](usage/packages/vagrant.md)     | -          | `vagrant`                   |

**以下段落僅適用於套件未全局禁用的情況！**

## 存儲庫-套件

套件始終屬於擁有者（用戶或組織），而不是存儲庫。
要將（已上傳的）套件鏈接到存儲庫，請打開該套件的設置頁面並選擇要鏈接此套件的存儲庫。
整個套件將被鏈接，而不僅僅是單個版本。

鏈接套件會顯示在存儲庫的套件列表中，並在套件網站上顯示指向存儲庫的鏈接（以及指向存儲庫問題的鏈接）。

## 訪問限制

| 套件擁有者類型 | 用戶                                         | 組織                                         |
| -------------- | -------------------------------------------- | -------------------------------------------- |
| **讀** 訪問    | 公共，如果用戶也是公共的；否則僅對此用戶可見 | 公共，如果組織是公共的，否則僅對組織成員可見 |
| **寫** 訪問    | 僅限擁有者                                   | 具有管理或寫入訪問權限的組織成員             |

注意：這些訪問限制[可能會更改](https://github.com/go-gitea/gitea/issues/19270)，將通過專用的組織團隊權限添加更細粒度的控制。

## 創建或上傳套件

根據套件的類型，使用相應的套件管理器。請查看特定套件管理器的子頁面以獲取說明。

## 查看套件

您可以在存儲庫頁面上查看存儲庫的套件。

1. 轉到存儲庫。
1. 在導航欄中轉到 **Packages**。

要查看有關套件的更多詳細信息，請選擇套件的名稱。

## 下載套件

要從存儲庫下載套件：

1. 在導航欄中轉到 **Packages**。
1. 選擇套件的名稱以查看詳細信息。
1. 在 **Assets** 部分中，選擇要下載的套件文件的名稱。

## 刪除套件

在套件註冊表中發布套件後，您無法編輯它。相反，您必須刪除並重新創建它。

要從存儲庫中刪除套件：

1. 在導航欄中轉到 **Packages**。
1. 選擇套件的名稱以查看詳細信息。
1. 單擊 **Delete package** 以永久刪除套件。

## 禁用套件註冊表

套件註冊表會自動啟用。要為單個存儲庫禁用它：

1. 在導航欄中轉到 **Settings**。
1. 禁用 **Enable Repository Packages Registry**。

禁用套件註冊表不會刪除以前發布的套件。
