---
date: "2016-12-01T16:00:00+02:00"
slug: "authentication"
sidebar_position: 10
aliases:
  - /zh-tw/authentication
---

# 認證

## 轻量级目錄访问协议（Lightweight Directory Access Protocol，LDAP）

通過 BindDN 的 LDAP 和简單認證方式 LDAP 共享以下字段:

- 認證名稱 **(必選)**

  - 分配给新授权方法的名稱。

- 主机名 **(必選)**

  - LDAP 服务的主机地址.
  - 例如:`mydomain.com`

- 端口号 **(必選)**

  - LDAP 服务的端口号.
  - 例如: LDAP `389`/ LDAPs `636`

- 安全协议 (可選)

  - 连接 LDAP 服务器时是否使用 TLS 协议。

- 管理员過滤規則 (可選)

  - 一个 LDAP 過滤器，用于指定哪些使用者應該被赋予管理员特权。如果使用者帳戶符合過滤器条件，则該使用者将被授予管理员权限。
  - 示例:`(objectClass=adminAccount)`
  - 适用于 Microsoft Active Directory（AD）的示例:`memberOf=CN=admin-group,OU=example,DC=example,DC=org`

- 使用者名属性（可選）

  - 使用者 LDAP 记录中包含使用者名稱的属性。在第一次成功登入后，将使用指定的属性值作為新的 Gitea 账户使用者名。若留空，则使用登入表單上提供的使用者名。
  - 当提供的登入名与多个属性匹配时，这一選项非常有用，但是只有一个特定属性應該用于 Gitea 账户名稱，請参阅"使用者過滤器"。
  - 示例:uid
  - 适用于 Microsoft Active Directory（AD）的示例:`sAMAccountName`

- 名字属性（可選）

  - 使用者 LDAP 记录中包含使用者名字的属性。将用于填充他们的账户信息。
  - 示例:givenName

- 姓氏属性（可選）

  - 使用者 LDAP 记录中包含使用者姓氏的属性。将用于填充他们的账户信息。
  - 示例:`sn`

- 电子邮件属性 **(必選)**
  - 使用者 LDAP 记录中包含使用者电子邮件地址的属性。将用于填充他们的账户信息。
  - 示例:`mail`

### LDAP(via BindDN)

需要额外设置以下字段:

- 绑定 DN (可選)

  - 搜索使用者时绑定到 LDAP 服务器的 DN。这可以留空以執行匿名搜索。
  - 示例: `cn=Search,dc=mydomain,dc=com`

- 绑定密碼 (可選)

  - 上述指定的 Bind DN（绑定区别名）的密碼，如果有的话。注意：該密碼在服务器上使用 SECRET_KEY 進行加密存儲。仍然建议确保 Bind DN 具有尽可能少的权限。

- 使用者搜索基准 **(必選)**

  - 这是用于搜索使用者帳戶的 LDAP 基础路径.
  - 示例: `ou=Users,dc=mydomain,dc=com`

- 使用者過滤規則 **(必選)**
  - LDAP 過滤器声明如何查找试图進行身份驗證的使用者记录
    `%[1]s`匹配參數将替换為登入表單中给出的登入名
  - 示例: `(&(objectClass=posixAccount)(|(uid=%[1]s)(mail=%[1]s)))`
  - 示例 for Microsoft Active Directory (AD): `(&(objectCategory=Person)(memberOf=CN=user-group,OU=example,DC=example,DC=org)(sAMAccountName=%s)(!(UserAccountControl:1.2.840.113556.1.4.803:=2)))`
  - 如需多次替换，應使用 `%[1]s`，例如在将提供的登入名与多个属性（如使用者标识符、电子邮件甚至电话号码）進行匹配时。
  - 示例: `(&(objectClass=Person)(|(uid=%[1]s)(mail=%[1]s)(mobile=%[1]s)))`
- 启用使用者同步
  - 这个選项启用了一个周期性任务，用于将 Gitea 使用者与 LDAP 服务器進行同步。默认的同步周期是每 24 小时，
    但您可以在 app.ini 文件中進行更改。
    有关此部分的详细说明，請参阅[sample
    app.ini](https://github.com/go-gitea/gitea/blob/main/custom/conf/app.example.ini)
    的*cron.sync_external_users* 部分的注释。前面提到的*User Search Base*和*User Filter*
    设置将限制哪些使用者可以使用 Gitea 以及哪些使用者将被同步。
    在初始运行任务时，将根据给定的设置建立所有与 LDAP 匹配的使用者，因此在使用大型企业 LDAP 目錄时需要小心。

### LDAP(simple auth)

需要额外设置以下字段:

- 使用者 DN **(必選)**

  - 用作使用者 DN 的模板。匹配參數 `%s` 将替换為登入表單中的登入名。
  - 示例: `cn=%s,ou=Users,dc=mydomain,dc=com`
  - 示例: `uid=%s,ou=Users,dc=mydomain,dc=com`

- 使用者搜索基准 (可選)

  - 使用者搜索基准声明哪些使用者帳戶将被搜索.
  - 示例: `ou=Users,dc=mydomain,dc=com`

- 使用者過滤規則 **(必選)**
  - LDAP 過滤器声明何时允许使用者登入
    `%[1]s`匹配參數将替换為登入表單中给出的登入名。
  - 示例: `(&(objectClass=posixAccount)(|(cn=%[1]s)(mail=%[1]s)))`
  - 示例: `(&(objectClass=posixAccount)(|(uid=%[1]s)(mail=%[1]s)))`

### 使用 LDAP 驗證分组成员

使用以下字段:

- 群组搜索基础 DN(可選)

  - 组使用的 LDAP DN。
  - 示例: `ou=group,dc=mydomain,dc=com`

- 组名過滤器 (可選)

  - LDAP 過滤器，声明如何在上述 DN 中查找有效组。
  - 示例: `(|(cn=gitea_users)(cn=admins))`

- 组中的使用者属性 (可選)

  - 组中列出了哪个使用者的 LDAP 属性。
  - 示例: `uid`

- 使用者组属性 (可選)
  - 哪个组的 LDAP 属性包含一个高于使用者属性名稱的数组。
  - 示例: `memberUid`

## 可插拔式認證模組(Pluggable Authentication Module,PAM)

这个過程启用了 PAM（Pluggable Authentication Modules）認證。使用者仍然可以通過使用者管理手动添加到系统中。
PAM 提供了一种機制，通過对使用者進行 PAM 認證来自动将其添加到当前数据库中。為了与普通的 Linux 密碼一起使用，
运行 Gitea 的使用者還必須具有对`/etc/shadow`的读取权限，以便在使用公钥登入时检查账户的有效性。

**注意**:如果使用者已将 SSH 公钥添加到 Gitea 中，使用这些密钥可能会绕過登入检查系统。因此，
如果您希望禁用使用 PAM 進行身份驗證的使用者，應該在 Gitea 中手动禁用該账户，使用内置的使用者管理功能。

1. 配置和安裝准备.
   - 建议您建立一个管理使用者.
   - 建议取消自动注册.
1. 一旦数据库已初始化完成，使用新建立的管理员账户登入.
1. 导航至使用者设置（右上角的图标），然后選择
   `Site Administration` -> `Authentication Sources`, 並選择
   `Add Authentication Source`.
1. 填写字段如下:
   - 認證類型:`PAM`。
   - 名稱:任何有效的值都可以，如果您愿意，可以使用"System Authentication"。
   - PAM 服务名稱:从/etc/pam.d/目錄下選择适用于所需認證的正确文件[^1]。
   - PAM 电子邮件域:使用者認證时要附加的电子邮件后缀。例如，如果登入系统期望一个名為 gituse 的使用者，
     並且将此字段设置為 mail.com，那么 Gitea 在驗證一个 GIT 实例的使用者时将期望 user emai 字段為gituser@mail.com[^2]。

**Note**: PAM 支持通過[build-time flags](installation/from-source.md#build)添加,
而官方提供的二進制文件通常不会默认启用此功能。PAM 需要确保系统上有必要的 libpam 动态库，並且编译器可以访问必要的 PAM 开发头文件。

[^1]:
    例如，在 Debian "Bullseye"上使用标准 Linux 登入，可以使用`common-session-noninteractive`。这个值對於其他版本的 Debian，
    包括 Ubuntu 和 Mint，可能也是有效的，請查阅您所使用发行版的文檔以确认。

[^2]: **PAM 的必選项** 請注意:在上面的示例中，使用者将作為`gituser`而不是`gituser@mail.com`登入到 Gitea 的 Web 界面。

## 简單邮件传输协议(Simple Mail Transfer Protocol,SMTP)

此選项允许 Gitea 以 Gitea 使用者身份登入 SMTP 主机。請设置以下字段:

- 身份驗證名稱 **(必選)**

  - 分配给新授权方法的名稱

- SMTP 驗證類型 **(必選)**

  - 用于连接 SMTP 主机的驗證類型，plain 或 login

- 主机名 **(必選)**

  - SMTP 服务的主机地址
  - 例如:`smtp.mydomain.com`

- 端口号 **(必選)**

  - SMTP 服务的端口号
  - 例如: `587`

- 允许的域名

  - 如果使用公共 SMTP 主机或有多个域的 SMTP 主机，限制哪些域可以登入
    限制哪些域可以登入。
  - 示例: `gitea.com,mydomain.com,mydomain2.com`

- 强制使用 SMTPS
  - 默认情况下将使用 SMTPS 连接到端口 465.如果您希望将 smtp 用于其他端口，自行设置
  - 否则，如果服务器提供' STARTTLS '扩展名，则将使用此扩展名
- 跳過 TLS 驗證
  - 禁用 TLS 驗證身份.
- 該認證源处于激活状态
  - 启用或禁用此身份驗證源

## FreeIPA

- 要使用 FreeIPA 凭据登入 Gitea，需要為 Gitea 建立一个绑定帳戶。
  建立一个绑定帳戶:
- 在 FreeIPA 服务器上建立一个 gitea.ldif 文件，並将`dc=example,dc=com`替换為您的`dn`，然后提供一个适当安全的密碼。

  ```sh
  dn: uid=gitea,cn=sysaccounts,cn=etc,dc=example,dc=com
  changetype: add
  objectclass: account
  objectclass: simplesecurityobject
  uid: gitea
  userPassword: secure password
  passwordExpirationTime: 20380119031407Z
  nsIdleTimeout: 0
  ```

- 导入 LDIF 文件（如果需要，請将 localhost 更改為 IPA 服务器）。系统会提示您输入 Directory Manager 的密碼。:

  ```sh
  ldapmodify -h localhost -p 389 -x -D \
  "cn=Directory Manager" -W -f gitea.ldif
  ```

- 為`gitea_users`添加 IPA 组:

  ```sh
  ipa group-add --desc="Gitea Users" gitea_users
  ```

- **提示**:對於 IPA 凭证错误，运行' kinit admin '並提供域管理帳戶密碼.
- 以管理员身份登入 Gitea，點擊 Admin Panel 下的`Authentication`。然后單擊`Add New Source`並填写详细信息，更改所有适当的地方。

## SPNEGO with SSPI (Kerberos/NTLM, for Windows only)

Gitea 支持通過 Windows 内置的安全支持提供程序接口（Security Support Provider Interface，SSPI）实現 SPNEGO 單点登入認證（由 RFC4559 定义的方案），用于服务器的 Web 部分。SSPI 僅在 Windows 环境中工作，即当服务器和客户端都在 Windows 操作系统上运行时。

在激活 SSPI 單点登入認證（SSO）之前，您需要准备您的环境:

- 在 Active Directory 中建立一个單独的使用者账户，gitea.exe 進程将在該账户下运行（例如，在 domain.local 域下建立一个名為 user 的账户:
- 為运行 gitea.exe 的主机建立一个服务主體名稱（Service Principal Name，SPN），其类别為 HTTP:

  - 以特权域使用者（例如域管理员）的身份启动“命令提示符”或“PowerShell”。
  - 运行下面的命令，将 host.domain.local 替换為 Web 應用程序将运行的服务器的完全限定域名（FQDN），将 domain\user 替换為在前一步中建立的账户名稱:

  ```sh
  setspn -A HTTP/host.domain.local domain\user
  ```

在遵循上述步骤之前，請确保您按照以下流程進行操作:

1. 用之前建立的使用者登入（如果已经登入，請先注销）。
2. 确保在`custom/conf/app.ini`文件的`[server]`部分中，`ROOT_URL`设置為 Web 應用程序将运行的服务器的完全限定域名（FQDN），与之前建立服务主體名稱时使用的一致（例如，`host.domain.local`）。
3. 启动 Web 服务器（运行 `gitea.exe web`）。
4. 在 `Site Administration -> Authentication Sources` 中添加一个 `SPNEGO with SSPI` 認證源，以启用 SSPI 認證。
5. 在域中的客户端计算机上，使用任何域使用者登入（与运行`gitea.exe`的服务器不同）。
6. 如果您使用 Chrome 或 Edge 浏览器，請将 Web 應用程序的 URL 添加到“本地站点”（`Internet選项 -> 安全 -> 本地站点 -> 站点`）。
7. 启动 Chrome 或 Edge 浏览器，导航到 Gitea 的 FQDN URL（例如，`http://host.domain.local:3000`）。
8. 在控制面板中點擊“Sign In”按钮，然后選择 SSPI，将会自动使用当前登入到计算机的使用者進行登入。
9. 如果無法正常工作，請确保:
   - 您不是在运行`gitea.exe`的同一台服务器上运行 Web 浏览器。應該在与服务器不同的域加入计算机（客户端）上运行 Web 浏览器。如果客户端和服务器都在同一台计算机上运行，则 NTLM 将优先于 Kerberos。
   - 主机上只有一个`HTTP/...`的 SPN。
   - SPN 中只包含主机名，不包含端口号。
   - 将 Web 應用程序的 URL 添加到"本地站点"。
   - 服务器和客户端的时钟差异不超過 5 分钟（取决于组策略）。
   - 在 Internet Explorer 中启用了"集成 Windows 身份驗證"（在"高级设置"下）。

遵循这些步骤，您應該能够成功启用和使用 SSPI 單点登入認證（SSO）。

## 反向代理認證

Gitea 支持通過读取反向代理传递的 HTTP 头中的登入名或者 email 地址来支持反向代理来認證。默认是不启用的，你可以用以下配置启用。

```ini
[service]
ENABLE_REVERSE_PROXY_AUTHENTICATION = true
```

默认的登入使用者名的 HTTP 头是 `X-WEBAUTH-USER`，你可以通過修改 `REVERSE_PROXY_AUTHENTICATION_USER` 来变更它。如果使用者不存在，可以自动建立使用者，当然你需要修改 `ENABLE_REVERSE_PROXY_AUTO_REGISTRATION=true` 来启用它。

默认的登入使用者 Email 的 HTTP 头是 `X-WEBAUTH-EMAIL`，你可以通過修改 `REVERSE_PROXY_AUTHENTICATION_EMAIL` 来变更它。如果使用者不存在，可以自动建立使用者，当然你需要修改 `ENABLE_REVERSE_PROXY_AUTO_REGISTRATION=true` 来启用它。你也可以通過修改 `ENABLE_REVERSE_PROXY_EMAIL` 来启用或停用这个 HTTP 头。

如果设置了 `ENABLE_REVERSE_PROXY_FULL_NAME=true`，则使用者的全名会从 `X-WEBAUTH-FULLNAME` 读取，这样在自动建立使用者时将使用这个字段作為使用者全名，你也可以通過修改 `REVERSE_PROXY_AUTHENTICATION_FULL_NAME` 来变更 HTTP 头。

你也可以通過修改 `REVERSE_PROXY_TRUSTED_PROXIES` 来设置反向代理的 IP 地址范围，加强安全性，默认值是 `127.0.0.0/8,::1/128`。 通過 `REVERSE_PROXY_LIMIT`， 可以设置最多信任几级反向代理。

你可以通過以下配置為 API 启用此認證方法：

```ini
[service]
ENABLE_REVERSE_PROXY_AUTHENTICATION_API = true
```

:::note
当此方法用于 API 时，反向代理负责处理 CSRF 保护。
:::
