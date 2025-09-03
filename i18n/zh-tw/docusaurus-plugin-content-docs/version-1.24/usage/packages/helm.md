---
date: "2022-04-14T00:00:00+00:00"
slug: "helm"
sidebar_position: 50
---

# Helm Chart 註冊表

為您的使用者或組織發佈 [Helm](https://helm.sh/) charts。

## 要求

要使用 Helm Chart 註冊表，可以使用诸如 `curl` 或 [`helm cm-push`](https://github.com/chartmuseum/helm-push/) 插件之类的简單HTTP客户端。

## 發佈軟體包

通過运行以下命令来發佈軟體包：

```shell
curl --user {username}:{password} -X POST --upload-file ./{chart_file}.tgz https://gitea.example.com/api/packages/{owner}/helm/api/charts
```

或者使用 `helm cm-push` 插件：

```shell
helm repo add  --username {username} --password {password} {repo} https://gitea.example.com/api/packages/{owner}/helm
helm cm-push ./{chart_file}.tgz {repo}
```

| 參數         | 描述                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `username`   | 您的Gitea使用者名                                                                                                                                        |
| `password`   | 您的Gitea密碼。如果您使用的是2FA或OAuth，請使用[个人访问令牌](development/api-usage.md#通過-api-認證)替代密碼進行身份驗證。 |
| `repo`       | 存放庫名稱                                                                                                                                               |
| `chart_file` | Helm Chart 归檔文件                                                                                                                                    |
| `owner`      | 軟體包的所有者                                                                                                                                         |

## 安裝軟體包

要从註冊表中安裝Helm Chart，請執行以下命令：

```shell
helm repo add  --username {username} --password {password} {repo} https://gitea.example.com/api/packages/{owner}/helm
helm repo update
helm install {name} {repo}/{chart}
```

| 參數       | 描述                        |
| ---------- | --------------------------- |
| `username` | 您的Gitea使用者名             |
| `password` | 您的Gitea密碼或个人访问令牌 |
| `repo`     | 存儲库的名稱                |
| `owner`    | 軟體包的所有者              |
| `name`     | 本地名稱                    |
| `chart`    | Helm Chart的名稱            |
