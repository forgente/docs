---
date: "2022-04-14T00:00:00+00:00"
slug: "helm"
sidebar_position: 50
---

# Helm Chart 註冊表

為您的用戶或組織發布 [Helm](https://helm.sh/) 圖表。

## 需求

要使用 Helm Chart 註冊表，請使用簡單的 HTTP 客戶端，如 `curl` 或 [`helm cm-push`](https://github.com/chartmuseum/helm-push/) 插件。

## 發布套件

通過運行以下命令發布套件：

```shell
curl --user {username}:{password} -X POST --upload-file ./{chart_file}.tgz https://gitea.example.com/api/packages/{owner}/helm/api/charts
```

或使用 `helm cm-push` 插件：

```shell
helm repo add  --username {username} --password {password} {repo} https://gitea.example.com/api/packages/{owner}/helm
helm cm-push ./{chart_file}.tgz {repo}
```

| 參數         | 描述                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `username`   | 您的 Gitea 用戶名。                                                                                                 |
| `password`   | 您的 Gitea 密碼。如果您使用 2FA 或 OAuth，請使用 [個人訪問令牌](development/api-usage.md#authentication) 代替密碼。 |
| `repo`       | 倉庫的名稱。                                                                                                        |
| `chart_file` | Helm Chart 存檔。                                                                                                   |
| `owner`      | 套件的擁有者。                                                                                                      |

## 安裝套件

要從註冊表中安裝 Helm 圖表，請執行以下命令：

```shell
helm repo add  --username {username} --password {password} {repo} https://gitea.example.com/api/packages/{owner}/helm
helm repo update
helm install {name} {repo}/{chart}
```

| 參數       | 描述                            |
| ---------- | ------------------------------- |
| `username` | 您的 Gitea 用戶名。             |
| `password` | 您的 Gitea 密碼或個人訪問令牌。 |
| `repo`     | 倉庫的名稱。                    |
| `owner`    | 套件的擁有者。                  |
| `name`     | 本地名稱。                      |
| `chart`    | Helm Chart 的名稱。             |
