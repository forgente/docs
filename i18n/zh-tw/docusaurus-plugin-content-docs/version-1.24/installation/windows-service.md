---
date: "2016-12-21T15:00:00-02:00"
slug: "windows-service"
sidebar_position: 50
aliases:
  - /zh-tw/windows-service
---

# 注册為 Windows 服务

## 准备工作

在 C:\gitea\custom\conf\app.ini 中進行了以下更改：

```ini title="app.ini"
RUN_USER = COMPUTERNAME$
```

将 Gitea 设置為以本地系统使用者运行。

COMPUTERNAME 是从命令行中运行 `echo %COMPUTERNAME%` 后得到的響應。如果響應是 `USER-PC`，那么 `RUN_USER = USER-PC$`。

### 使用绝对路径

如果您使用 SQLite3，請将 `PATH` 更改為包含完整路径：

```ini title="app.ini"
[database]
PATH     = c:/gitea/data/gitea.db
```

## 注册為 Windows 服务

要注册為 Windows 服务，首先以 Administrator 身份运行 `cmd`，然后執行以下命令：

```
sc.exe create gitea start= auto binPath= "\"C:\gitea\gitea.exe\" web --config \"C:\gitea\custom\conf\app.ini\""
```

别忘了将 `C:\gitea` 替换成你的 Gitea 安裝目錄。

之后在控制面板打开 "Windows Services"，搜索 "gitea"，右键選择 "Run"。在浏览器打开 `http://localhost:3000` 就可以访问了。（如果你修改了端口，請访问对應的端口，3000 是默认端口）。

### 服务启动類型

据观察，在启动期间加载的系统上，Gitea 服务可能無法启动，並在 Windows 事件日志中记录超时。
在这种情况下，将启动類型更改為`Automatic-Delayed`。这可以在服务建立期间完成，或者通過运行配置命令来完成。

```
sc.exe config gitea start= delayed-auto
```

### 添加启动依赖项

要将启动依赖项添加到 Gitea Windows 服务（例如 Mysql、Mariadb），作為管理员，然后运行以下命令：

```
sc.exe config gitea depend= mariadb
```

这将确保在 Windows 计算机重新启动时，将延迟自动启动 Gitea，直到数据库准备就绪，从而减少启动失败的情况。

## 从 Windows 服务中删除

以 Administrator 身份运行 `cmd`，然后執行以下命令：

```
sc.exe delete gitea
```
