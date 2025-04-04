---
date: "2016-12-21T15:00:00-02:00"

slug: "windows-service"
sidebar_position: 50

aliases:
  - /zh-cn/windows-service
---

# 注册为 Windows 服务

要注册为 Windows 服务，首先以 Administrator 身份运行 `cmd`，然后执行以下命令：

```
sc create gitea start= auto binPath= "\"C:\gitea\gitea.exe\" web --config \"C:\gitea\custom\conf\app.ini\""
```

别忘了将 `C:\gitea` 替换成你的 Gitea 安装目录。

之后在控制面板打开 "Windows Services"，搜索 "gitea"，右键选择 "Run"。在浏览器打开 `http://localhost:3000` 就可以访问了。（如果你修改了端口，请访问对应的端口，3000 是默认端口）。

## 从 Windows 服务中删除

以 Administrator 身份运行 `cmd`，然后执行以下命令：

```
sc delete gitea
```
