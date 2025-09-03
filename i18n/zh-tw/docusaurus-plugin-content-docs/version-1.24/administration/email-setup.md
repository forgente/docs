---
date: "2023-05-23T09:00:00+08:00"
slug: "email-setup"
sidebar_position: 12

aliases:
  - /zh-tw/email-setup
---

# Email 设置

Gitea 具有邮件功能，用于发送事务性邮件（例如注册确认邮件）。它可以配置為使用 Sendmail（或兼容的 MTA，例如 Postfix 和 msmtp）或直接使用 SMTP 服务器。

## 使用 Sendmail

使用 `sendmail` 命令作為邮件传输代理（mailer）。

注意：對於在官方 Gitea Docker 镜像中使用，請使用 SMTP 版本進行配置（請参考下一节）。

注意：對於面向互联网的网站，請查阅您的 MTA 文檔以了解通過 TLS 发送邮件的说明。同时设置 SPF、DMARC 和 DKIM DNS 记录，以使发送的邮件被各个电子邮件提供商接受為合法邮件。

```ini title="app.ini"
[mailer]
ENABLED       = true
FROM          = gitea@mydomain.com
PROTOCOL   = sendmail
SENDMAIL_PATH = /usr/sbin/sendmail
SENDMAIL_ARGS = "--" ; 大多数 "sendmail" 程序都接受選项，使用 "--" 将防止电子邮件地址被解释為選项。
```

## 使用 SMTP

直接使用 SMTP 服务器作為中继。如果您不想在实例上设置 MTA，但在电子邮件提供商那里有一个帳戶，这个選项非常有用。

```ini title="app.ini"
[mailer]
ENABLED        = true
FROM           = gitea@mydomain.com
PROTOCOL    = smtps
SMTP_ADDR      = mail.mydomain.com
SMTP_PORT      = 587
USER           = gitea@mydomain.com
PASSWD         = `password`
```

重启 Gitea 以使配置更改生效。

要发送测试邮件以驗證设置，請转到 Gitea > 站点管理 > 配置 > SMTP 邮件配置。

有关所有選项的完整列表，請查看[配置速查表](../administration/config-cheat-sheet.md)。

請注意：只有在使用 TLS 或 `HOST=localhost` 加密 SMTP 服务器通信时才支持身份驗證。TLS 加密可以通過以下方式進行：

- 通過端口 587 的 STARTTLS（也稱為 Opportunistic TLS）。初始连接是明文的，但如果服务器支持，则可以升级為 TLS。
- 通過默认端口 465 的 SMTPS 连接。连接到服务器从一开始就使用 TLS。
- 使用 `PROTOCOL=smtps` 進行强制的 SMTPS 连接。（这两种方式都被稱為 Implicit TLS）
  这是由于 Go 内部库对 STRIPTLS 攻擊的保护機制。

請注意，自 2018 年起，[RFC8314](https://tools.ietf.org/html/rfc8314#section-3) 推荐使用 Implicit TLS。

### Gmail

以下配置應該适用于 Gmail 的 SMTP 服务器：

```ini title="app.ini"
[mailer]
ENABLED        = true
HOST           = smtp.gmail.com:465 ; 對於 Gitea >= 1.18.0，删除此行
SMTP_ADDR      = smtp.gmail.com
SMTP_PORT      = 465
FROM           = example.user@gmail.com
USER           = example.user
PASSWD         = `***`
PROTOCOL    = smtps
```

請注意，您需要建立並使用一个 [應用密碼](https://support.google.com/accounts/answer/185833?hl=en) 並在您的 Google 帳戶上启用 2FA。您将無法直接使用您的 Google 帳戶密碼。
