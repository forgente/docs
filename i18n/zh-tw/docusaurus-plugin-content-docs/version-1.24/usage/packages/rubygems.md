---
date: "2021-07-20T00:00:00+00:00"
slug: "rubygems"
sidebar_position: 110
---

# RubyGems 軟體包註冊表

為您的使用者或組織發佈 [RubyGems](https://guides.rubygems.org/) 軟體包。

## 要求

要使用RubyGems軟體包註冊表，您需要使用 [gem](https://guides.rubygems.org/command-reference/) 命令行工具来消费和發佈軟體包。

## 配置軟體包註冊表

要注册軟體包註冊表，請编辑 `~/.gem/credentials` 文件並添加：

```ini
---
https://gitea.example.com/api/packages/{owner}/rubygems: Bearer {token}
```

| 參數    | 描述                                                                                  |
| ------- | ------------------------------------------------------------------------------------- |
| `owner` | 軟體包的所有者                                                                        |
| `token` | 您的[个人访问令牌](development/api-usage.md#通過-api-認證) |

例如：

```
---
https://gitea.example.com/api/packages/testuser/rubygems: Bearer 3bd626f84b01cd26b873931eace1e430a5773cc4
```

## 發佈軟體包

通過运行以下命令来發佈軟體包：

```shell
gem push --host {host} {package_file}
```

| 參數           | 描述                     |
| -------------- | ------------------------ |
| `host`         | 軟體包註冊表的URL        |
| `package_file` | 軟體包 `.gem` 文件的路径 |

例如：

```shell
gem push --host https://gitea.example.com/api/packages/testuser/rubygems test_package-1.0.0.gem
```

如果已经存在相同名稱和版本的軟體包，您将無法發佈軟體包。您必須先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表安裝軟體包，您可以使用 [Bundler](https://bundler.io) 或 `gem`。

### Bundler

在您的 `Gemfile` 中添加一个新的 `source` 块：

```
source "https://gitea.example.com/api/packages/{owner}/rubygems" do
  gem "{package_name}"
end
```

| 參數           | 描述           |
| -------------- | -------------- |
| `owner`        | 軟體包的所有者 |
| `package_name` | 軟體包名稱     |

例如：

```
source "https://gitea.example.com/api/packages/testuser/rubygems" do
  gem "test_package"
end
```

之后运行以下命令：

```shell
bundle install
```

### gem

執行以下命令：

```shell
gem install --host https://gitea.example.com/api/packages/{owner}/rubygems {package_name}
```

| 參數           | 描述           |
| -------------- | -------------- |
| `owner`        | 軟體包的所有者 |
| `package_name` | 軟體包名稱     |

例如：

```shell
gem install --host https://gitea.example.com/api/packages/testuser/rubygems test_package
```

## 支持的命令

```
gem install
bundle install
gem push
```
