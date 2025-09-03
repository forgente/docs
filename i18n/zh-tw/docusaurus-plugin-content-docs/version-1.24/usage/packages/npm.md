---
date: "2021-07-20T00:00:00+00:00"
slug: "npm"
sidebar_position: 70
---

# NPM Package Registry

為您的使用者或組織發佈 [npm](https://www.npmjs.com/) 包。

## 要求

要使用 npm 包註冊表，您需要安裝 [Node.js](https://nodejs.org/en/download/)  以及与之配套的軟體包管理器，例如 [Yarn](https://classic.yarnpkg.com/en/docs/install) 或 [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) 本身。

該註冊表支持[作用域](https://docs.npmjs.com/misc/scope/)和非作用域軟體包。

以下示例使用具有作用域 `@test` 的 `npm` 工具。

## 配置軟體包註冊表

要注册軟體包註冊表，您需要配置一个新的軟體包源。

```shell
npm config set {scope}:registry=https://gitea.example.com/api/packages/{owner}/npm/
npm config set -- '//gitea.example.com/api/packages/{owner}/npm/:_authToken' "{token}"
```

| 參數    | 描述                                                                                    |
| ------- | --------------------------------------------------------------------------------------- |
| `scope` | 軟體包的作用域                                                                          |
| `owner` | 軟體包的所有者                                                                          |
| `token` | 您的[个人访问令牌](development/api-usage.md#通過-api-認證)。 |

例如：

```shell
npm config set @test:registry=https://gitea.example.com/api/packages/testuser/npm/
npm config set -- '//gitea.example.com/api/packages/testuser/npm/:_authToken' "personal_access_token"
```

或者，不使用作用域：

```shell
npm config set registry https://gitea.example.com/api/packages/testuser/npm/
npm config set -- '//gitea.example.com/api/packages/testuser/npm/:_authToken' "personal_access_token"
```

## 發佈軟體包

在项目中运行以下命令發佈軟體包：

```shell
npm publish
```

如果已经存在相同名稱和版本的軟體包，您無法發佈該軟體包。您必須先删除現有的軟體包。

## 删除軟體包

通過运行以下命令删除軟體包：

```shell
npm unpublish {package_name}[@{package_version}]
```

| 參數              | 描述       |
| ----------------- | ---------- |
| `package_name`    | 軟體包名稱 |
| `package_version` | 軟體包版本 |

例如

```shell
npm unpublish @test/test_package
npm unpublish @test/test_package@1.0.0
```

## 安裝軟體包

要从軟體包註冊表中安裝軟體包，請執行以下命令：

```shell
npm install {package_name}
```

| 參數           | 描述       |
| -------------- | ---------- |
| `package_name` | 軟體包名稱 |

例如：

```shell
npm install @test/test_package
```

## 给軟體包打標籤

該註冊表支持[版本標籤](https://docs.npmjs.com/adding-dist-tags-to-packages/)，可以通過 `npm dist-tag` 管理：

```shell
npm dist-tag add {package_name}@{version} {tag}
```

| 參數           | 描述       |
| -------------- | ---------- |
| `package_name` | 軟體包名稱 |
| `version`      | 軟體包版本 |
| `tag`          | 軟體包標籤 |

例如：

```shell
npm dist-tag add test_package@1.0.2 release
```

標籤名稱不能是有效的版本。所有可解析為版本的標籤名稱都将被拒绝。

## 搜索軟體包

該註冊表支持[搜索](https://docs.npmjs.com/cli/v7/commands/npm-search/)，但不支持像 `author:gitea` 这样的特殊搜索限定符。

## 支持的命令

```
npm install
npm ci
npm publish
npm unpublish
npm dist-tag
npm view
npm search
```
