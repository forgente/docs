---
date: "2021-07-20T00:00:00+00:00"
slug: "pypi"
sidebar_position: 100
---

# PyPI 軟體包註冊表

為您的使用者或組織發佈 [PyPI](https://pypi.org/) 軟體包。

## 要求

要使用 PyPI 軟體包註冊表，您需要使用 [pip](https://pypi.org/project/pip/) 工具来消费和使用 [twine](https://pypi.org/project/twine/) 工具来發佈軟體包。

## 配置軟體包註冊表

要注册軟體包註冊表，您需要编辑本地的 `~/.pypirc` 文件。添加以下内容：

```ini
[distutils]
index-servers = gitea

[gitea]
repository = https://gitea.example.com/api/packages/{owner}/pypi
username = {username}
password = {password}
```

| 占位符     | 描述                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `owner`    | 軟體包的所有者                                                                                                                            |
| `username` | 您的 Gitea 使用者名                                                                                                                         |
| `password` | 您的 Gitea 密碼。如果您使用 2FA 或 OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)替代密碼 |

## 發佈軟體包

通過运行以下命令来發佈軟體包：

```shell
python3 -m twine upload --repository gitea /path/to/files/*
```

軟體包文件的扩展名為 `.tar.gz` 和 `.whl`。

如果已存在具有相同名稱和版本的軟體包，则無法發佈軟體包。您必須先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表安裝 PyPI 軟體包，請執行以下命令：

```shell
pip install --index-url https://{username}:{password}@gitea.example.com/api/packages/{owner}/pypi/simple --no-deps {package_name}
```

| 參數           | 描述                          |
| -------------- | ----------------------------- |
| `username`     | 您的 Gitea 使用者名             |
| `password`     | 您的 Gitea 密碼或个人访问令牌 |
| `owner`        | 軟體包的所有者                |
| `package_name` | 軟體包名稱                    |

例如：

```shell
pip install --index-url https://testuser:password123@gitea.example.com/api/packages/testuser/pypi/simple --no-deps test_package
```

您可以使用 `--extra-index-url` 替代 `--index-url`，但这样会使您容易受到依赖混淆攻擊，因為 `pip` 会先检查官方 PyPi 存放庫中的軟體包，然后再检查指定的自定义存放庫。請阅读 `pip` 文檔以获取更多信息。

## 支持的命令

```
pip install
twine upload
```
