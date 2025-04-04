---
date: "2017-07-21T12:00:00+02:00"
slug: "linux-service"
sidebar_position: 40
aliases:
  - /zh-tw/linux-service
---

# 作為 Linux 服務運行

您可以使用 systemd 或 supervisor 將 Gitea 作為 Linux 服務運行。以下步驟在 Ubuntu 16.04 上測試，但應該適用於任何 Linux 發行版（稍作修改）。

## 使用 systemd

將示例 [gitea.service](https://github.com/go-gitea/gitea/blob/main/contrib/systemd/gitea.service) 複製到 `/etc/systemd/system/gitea.service`，然後使用您喜歡的編輯器編輯該文件。

取消註釋需要在此主機上啟用的任何服務，例如 MySQL。

更改用戶、主目錄和其他所需的啟動值。如果使用默認端口，請更改 PORT 或刪除 -p 標誌。

在啟動時啟用並啟動 Gitea：

```
sudo systemctl enable gitea
sudo systemctl start gitea
```

如果您擁有 systemd 版本 220 或更高版本，您可以一次性啟用並立即啟動 Gitea：

```
sudo systemctl enable gitea --now
```

## 使用 supervisor

通過在終端中運行以下命令安裝 supervisor：

```
sudo apt install supervisor
```

為 supervisor 日誌創建一個日誌目錄：

```
# 假設 Gitea 安裝在 /home/git/gitea/
mkdir /home/git/gitea/log/supervisor
```

將示例中的配置附加到 `/etc/supervisor/supervisord.conf`
[supervisord 配置](https://github.com/go-gitea/gitea/blob/main/contrib/supervisor/gitea)。

使用您喜歡的編輯器，更改用戶 (`git`) 和主目錄 (`/home/git`) 設置以匹配部署環境。如果使用默認端口，請更改 PORT 或刪除 -p 標誌。

最後在啟動時啟用並啟動 supervisor：

```
sudo systemctl enable supervisor
sudo systemctl start supervisor
```

如果您擁有 systemd 版本 220 或更高版本，您可以一次性啟用並立即啟動 supervisor：

```
sudo systemctl enable supervisor --now
```
