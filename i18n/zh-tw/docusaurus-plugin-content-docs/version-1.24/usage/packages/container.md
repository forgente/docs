---
date: "2021-07-20T00:00:00+00:00"
slug: "container"
sidebar_position: 30
---

# 容器註冊表

為您的使用者或組織發佈符合  [Open Container Initiative(OCI)](https://opencontainers.org/) 規範的镜像。
該容器註冊表遵循 OCI 規範，並支持所有兼容的镜像類型，如 [Docker](https://www.docker.com/) 和 [Helm Charts](https://helm.sh/)。

## 目錄

要使用容器註冊表，您可以使用适用于特定镜像類型的工具。
以下示例使用 `docker` 客户端。

## 登入容器註冊表

要推送镜像或者如果镜像位於註冊表中，您需要進行身份驗證：

```shell
docker login gitea.example.com
```

如果您使用的是 2FA 或 OAuth，請使用[個人訪問令牌](development/api-usage.md#通過-api-認證)替代密碼進行身份驗證。

## 鏡像命名約定

镜像必須遵循以下命名约定：

`{registry}/{owner}/{image}`

例如，以下是所有者為 `testuser` 的有效鏡像的名稱示例：

`gitea.example.com/testuser/myimage`

`gitea.example.com/testuser/my-image`

`gitea.example.com/testuser/my/image`

**注意:** 該登錄檔僅支援大小寫不敏感的標籤名稱。因此，`image:tag` 和 `image:Tag` 將被視為相同的鏡像和標籤。

## 推送镜像

通過執行以下命令来推送镜像：

```shell
docker push gitea.example.com/{owner}/{image}:{tag}
```

| 參數    | 描述         |
| ------- | ------------ |
| `owner` | 镜像的所有者 |
| `image` | 镜像的名稱   |
| `tag`   | 镜像的標籤   |

例如：

```shell
docker push gitea.example.com/testuser/myimage:latest
```

## 拉取镜像

通過執行以下命令来拉取镜像：

```shell
docker pull gitea.example.com/{owner}/{image}:{tag}
```

| Parameter | Description  |
| --------- | ------------ |
| `owner`   | 镜像的所有者 |
| `image`   | 镜像的名稱   |
| `tag`     | 镜像的標籤   |

例如：

```shell
docker pull gitea.example.com/testuser/myimage:latest
```
