---
date: "2022-08-01T00:00:00+00:00"
slug: "fail2ban-setup"
sidebar_position: 16

aliases:
  - /zh-tw/fail2ban-setup
---

# 设置 Fail2ban

**Fail2ban 检查客户端登入日志，将多次登入失败的客户端识别為攻擊者並在一段时间内阻止其访问服务。如果你的实例是公开的，这一点尤其重要。請管理员仔细设置 fail2ban，错误的配置将导致防火墙阻止你访问自己的服务器。**

Gitea 会在日志文件 `log/gitea.log` 中记录登入失败的 CLI、SSH 或 HTTP 客户端 IP 地址，而你需要将 Gitea 的日志输出模式从默认的 `console` 更改為 `file`。这表示将日志输出到文件，使得 fail2ban 可以定期掃描日志内容。

当使用者的身份驗證失败时，日志中会记录此类信息：

```log
2018/04/26 18:15:54 [I] Failed authentication attempt for user from xxx.xxx.xxx.xxx
```

```log
2020/10/15 16:08:44 [E] invalid credentials from xxx.xxx.xxx.xxx
```

## 配置規則

添加日志過滤器規則到配置文件 `/etc/fail2ban/filter.d/gitea.conf`:

```ini
[Definition]
failregex =  .*(Failed authentication attempt|invalid credentials|Attempted access of unknown user).* from <HOST>
ignoreregex =
```

添加监狱規則到配置文件 `/etc/fail2ban/jail.d/gitea.conf`:

```ini
[gitea]
enabled = true
filter = gitea
logpath = /var/lib/gitea/log/gitea.log
maxretry = 10
findtime = 3600
bantime = 900
action = iptables-allports
```

如果你的 Gitea 实例运行在 Docker 容器中，並且直接将容器端口暴露到外部网络，
你還需要添加 `chain="FORWARD"` 到监狱規則配置文件 `/etc/fail2ban/jail.d/gitea-docker.conf`
以适應 Docker 的网络转发規則。但如果你在容器的宿主机上使用 Nginx 反向代理连接到 Gitea 则無需这样配置。

```ini
[gitea-docker]
enabled = true
filter = gitea
logpath = /var/lib/gitea/log/gitea.log
maxretry = 10
findtime = 3600
bantime = 900
action = iptables-allports[chain="FORWARD"]
```

最后，运行 `systemctl restart fail2ban` 即可應用更改。現在，你可以使用 `systemctl status fail2ban` 检查 fail2ban 运行状态。

上述規則规定客户端在 1 小时内，如果登入失败的次数达到 10 次，则通過 iptables 锁定該客户端 IP 地址 15 分钟。

## 设置反向代理

如果你使用 Nginx 反向代理到 Gitea 实例，你還需要设置 Nginx 的 HTTP 头部值 `X-Real-IP` 将真实的客户端 IP 地址传递给 Gitea。否则 Gitea 程序会将客户端地址错误解析為反向代理服务器的地址，例如回环地址 `127.0.0.1`。

```
proxy_set_header X-Real-IP $remote_addr;
```

额外注意，在 Gitea 的配置文件 `app.ini` 中存在下列默认值：

```
REVERSE_PROXY_LIMIT = 1
REVERSE_PROXY_TRUSTED_PROXIES = 127.0.0.0/8,::1/128
```

`REVERSE_PROXY_LIMIT` 限制反向代理服务器的层数，设置為 `0` 表示不使用这些标头。
`REVERSE_PROXY_TRUSTED_PROXIES` 表示受信任的反向代理服务器网络地址，
经過該网络地址转发来的流量会经過解析 `X-Real-IP` 头部得到真实客户端地址。
（参考 [configuration cheat sheet](../administration/config-cheat-sheet.md#安全性)）
