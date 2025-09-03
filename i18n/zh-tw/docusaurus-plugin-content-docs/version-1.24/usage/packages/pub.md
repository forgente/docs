---
date: "2022-07-31T00:00:00+00:00"
slug: "pub"
sidebar_position: 90
---

# Pub 軟體包註冊表

為您的使用者或組織發佈 [Pub](https://dart.dev/guides/packages) 軟體包。

## 要求

要使用Pub軟體包註冊表，您需要使用 [dart](https://dart.dev/tools/dart-tool) 和/或 [flutter](https://docs.flutter.dev/reference/flutter-cli). 工具。

以下示例使用 `dart`。

## 配置軟體包註冊表

要注册軟體包註冊表並提供凭据，請執行以下操作：

```shell
dart pub token add https://gitea.example.com/api/packages/{owner}/pub
```

| 占位符  | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

您需要提供您的[个人访问令牌](development/api-usage.md#通過-api-認證)。

## 發佈軟體包

要發佈軟體包，請编辑 `pubspec.yaml` 文件，並添加以下行：

```yaml
publish_to: https://gitea.example.com/api/packages/{owner}/pub
```

| 占位符  | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

現在，您可以通過运行以下命令来發佈軟體包：

```shell
dart pub publish
```

如果已存在具有相同名稱和版本的軟體包，则無法發佈軟體包。您必須先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表安裝Pub軟體包，請執行以下命令：

```shell
dart pub add {package_name} --hosted-url=https://gitea.example.com/api/packages/{owner}/pub/
```

| 參數           | 描述           |
| -------------- | -------------- |
| `owner`        | 軟體包的所有者 |
| `package_name` | 軟體包名稱     |

例如：

```shell
# use latest version
dart pub add mypackage --hosted-url=https://gitea.example.com/api/packages/testuser/pub/
# specify version
dart pub add mypackage:1.0.8 --hosted-url=https://gitea.example.com/api/packages/testuser/pub/
```
