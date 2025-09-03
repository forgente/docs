---
date: "2017-04-08T11:34:00+02:00"
slug: "environment-variables"
sidebar_position: 10

aliases:
  - /zh-tw/environment-variables
---

# 环境变量清單

这里是用来控制 Gitea 行為表現的的环境变量清單，您需要在執行如下 Gitea 启动命令前设置它们来确保配置生效：

```
GITEA_CUSTOM=/home/gitea/custom ./gitea web
```

## Go 的配置

因為 Gitea 使用 Go 语言编写，因此它使用了一些相关的 Go 的配置參數：

- `GOOS`
- `GOARCH`
- [`GOPATH`](https://go.dev/cmd/go/#hdr-GOPATH_environment_variable)

您可以在[官方文檔](https://go.dev/cmd/go/#hdr-Environment_variables)中查阅这些配置參數的详细信息。

## Gitea 的文件目錄

- `GITEA_WORK_DIR`：工作目錄的绝对路径
- `GITEA_CUSTOM`：默认情况下 Gitea 使用默认目錄 `GITEA_WORK_DIR`/custom，您可以使用这个參數来配置 _custom_ 目錄
- `GOGS_WORK_DIR`： 已废弃，請使用 `GITEA_WORK_DIR` 替代
- `GOGS_CUSTOM`： 已废弃，請使用 `GITEA_CUSTOM` 替代

## 操作系统配置

- `USER`：Gitea 运行时使用的系统使用者，它将作為一些 repository 的访问地址的一部分
- `USERNAME`： 如果没有配置 `USER`， Gitea 将使用 `USERNAME`
- `HOME`： 使用者的 home 目錄，在 Windows 中会使用 `USERPROFILE` 环境变量

### 僅限于 Windows 的配置

- `USERPROFILE`： 使用者的主目錄，如果未配置则会使用 `HOMEDRIVE` + `HOMEPATH`
- `HOMEDRIVE`: 用于访问 home 目錄的主驱动器路径（C 盘）
- `HOMEPATH`：在指定主驱动器下的 home 目錄相对路径

## Miscellaneous

- `SKIP_MINWINSVC`：如果设置為 1，在 Windows 上不会以 service 的形式运行。
