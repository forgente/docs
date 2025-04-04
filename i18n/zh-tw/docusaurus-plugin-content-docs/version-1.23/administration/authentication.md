---
date: "2016-12-01T16:00:00+02:00"
slug: "authentication"
sidebar_position: 10
aliases:
  - /zh-tw/authentication
---

# 認證

## LDAP（輕量級目錄訪問協議）

LDAP via BindDN 和簡單身份驗證 LDAP 共享以下字段：

- 授權名稱 **（必填）**

  - 分配給新授權方法的名稱。

- 主機 **（必填）**

  - 可以訪問 LDAP 服務器的地址。
  - 例如：`mydomain.com`

- 端口 **（必填）**

  - 連接到服務器時使用的端口。
  - 例如：`389` 用於 LDAP 或 `636` 用於 LDAP SSL

- 啟用 TLS 加密（可選）

  - 是否在連接到 LDAP 服務器時使用 TLS。

- 管理員過濾器（可選）

  - 指定用戶是否應被授予管理員權限的 LDAP 過濾器。如果用戶帳戶通過過濾器，用戶將被授予管理員權限。
  - 例如：`(objectClass=adminAccount)`
  - Microsoft Active Directory（AD）的示例：`(memberOf=CN=admin-group,OU=example,DC=example,DC=org)`

- 用戶名屬性（可選）

  - 包含用戶名的用戶 LDAP 記錄的屬性。給定屬性值將在首次成功登錄後用於新 Gitea 帳戶用戶名。留空以使用登錄表單中給定的登錄名。
  - 當提供的登錄名與多個屬性匹配時，這很有用，但應僅使用單個特定屬性作為 Gitea 帳戶名，請參閱“用戶過濾器”。
  - 例如：`uid`
  - Microsoft Active Directory（AD）的示例：`sAMAccountName`

- 名字屬性（可選）

  - 包含用戶名字的用戶 LDAP 記錄的屬性。這將用於填充其帳戶信息。
  - 例如：`givenName`

- 姓氏屬性（可選）

  - 包含用戶姓氏的用戶 LDAP 記錄的屬性。這將用於填充其帳戶信息。
  - 例如：`sn`

- 電子郵件屬性 **（必填）**
  - 包含用戶電子郵件地址的用戶 LDAP 記錄的屬性。這將用於填充其帳戶信息。
  - 例如：`mail`

### LDAP via BindDN

添加以下字段：

- 綁定 DN（可選）

  - 綁定到 LDAP 服務器時使用的 DN。這可以留空以執行匿名搜索。
  - 例如：`cn=Search,dc=mydomain,dc=com`

- 綁定密碼（可選）

  - 上面指定的綁定 DN 的密碼（如果有）。_注意：密碼使用服務器上的 SECRET_KEY 加密存儲。仍然建議確保綁定 DN 具有盡可能少的權限。_

- 用戶搜索基礎 **（必填）**

  - 將搜索用戶帳戶的 LDAP 基礎。
  - 例如：`ou=Users,dc=mydomain,dc=com`

- 用戶過濾器 **（必填）**
  - 聲明如何查找嘗試進行身份驗證的用戶記錄的 LDAP 過濾器。`%[1]s` 匹配參數將替換為登錄表單中給定的登錄名。
  - 例如：`(&(objectClass=posixAccount)(|(uid=%[1]s)(mail=%[1]s)))`
  - Microsoft Active Directory（AD）的示例：`(&(objectCategory=Person)(memberOf=CN=user-group,OU=example,DC=example,DC=org)(sAMAccountName=%s)(!(UserAccountControl:1.2.840.113556.1.4.803:=2)))`
  - 要多次替換，應使用 `%[1]s`，例如當匹配提供的登錄名與多個屬性（例如用戶標識符、電子郵件甚至電話號碼）時。
  - 例如：`(&(objectClass=Person)(|(uid=%[1]s)(mail=%[1]s)(mobile=%[1]s)))`
- 啟用用戶同步
  - 此選項啟用定期任務，將 Gitea 用戶與 LDAP 服務器同步。默認週期為每 24 小時，但可以在 app.ini 文件中更改。請參閱 [sample app.ini](https://github.com/go-gitea/gitea/blob/main/custom/conf/app.example.ini) 中的 _cron.sync_external_users_ 部分以獲取有關該部分的詳細評論。上面描述的 _User Search Base_ 和 _User Filter_ 設置將限制哪些用戶可以使用 Gitea 以及哪些用戶將被同步。首次運行時，任務將創建所有符合給定設置的 LDAP 用戶，因此在處理大型企業 LDAP 目錄時請小心。

### 使用簡單身份驗證的 LDAP

添加以下字段：

- 用戶 DN **（必填）**

  - 用作用戶 DN 的模板。`%s` 匹配參數將替換為登錄表單中給定的登錄名。
  - 例如：`cn=%s,ou=Users,dc=mydomain,dc=com`
  - 例如：`uid=%s,ou=Users,dc=mydomain,dc=com`

- 用戶搜索基礎（可選）

  - 將搜索用戶帳戶的 LDAP 基礎。
  - 例如：`ou=Users,dc=mydomain,dc=com`

- 用戶過濾器 **（必填）**
  - 聲明何時允許用戶登錄的 LDAP 過濾器。`%[1]s` 匹配參數將替換為登錄表單中給定的登錄名。
  - 例如：`(&(objectClass=posixAccount)(|(cn=%[1]s)(mail=%[1]s)))`
  - 例如：`(&(objectClass=posixAccount)(|(uid=%[1]s)(mail=%[1]s)))`

### 驗證 LDAP 中的組成員資格

使用以下字段：

- 組搜索基礎 DN（可選）

  - 用於組的 LDAP DN。
  - 例如：`ou=group,dc=mydomain,dc=com`

- 包含用戶列表的組屬性（可選）

  - 列出/包含組成員的組對象的屬性。
  - 例如：`memberUid` 或 `member`

- 組中列出的用戶屬性（可選）

  - 用於在組對象中引用用戶的用戶屬性。
  - 例如：如果組對象包含 `member: bender` 並且用戶對象包含 `uid: bender`，則為 `uid`。
  - 例如：如果組對象包含 `member: uid=bender,ou=users,dc=planetexpress,dc=com`，則為 `dn`。

- 驗證 LDAP 中的組成員資格（可選）

  - 聲明如何在上述 DN 中查找有效組的 LDAP 過濾器。
  - 例如：`(|(cn=gitea_users)(cn=admins))`

## PAM（可插拔身份驗證模塊）

此過程啟用 PAM 身份驗證。用戶仍然可以使用用戶管理手動添加到系統中。PAM 提供了一種機制，可以通過測試它們來自動將用戶添加到當前數據庫中。要使用普通的 Linux 密碼，運行 Gitea 的用戶還必須具有對 `/etc/shadow` 的讀取訪問權限，以便在使用公鑰登錄時檢查帳戶的有效性。

**注意**：如果用戶已將 SSH 公鑰添加到 Gitea 中，則使用這些密鑰 _可能_ 會繞過登錄檢查系統。因此，如果您希望禁用使用 PAM 身份驗證的用戶，您 _應該_ 也使用內置用戶管理器手動禁用 Gitea 中的帳戶。

1. 配置和準備安裝。
   - 建議您創建一個管理用戶。
   - 可能還需要取消選擇自動註冊。
1. 數據庫初始化後，以新創建的管理用戶身份登錄。
1. 導航到用戶設置（右上角的圖標），然後選擇 `站點管理` -> `身份驗證源`，然後選擇 `添加身份驗證源`。
1. 填寫以下字段：
   - `身份驗證類型`：`PAM`
   - `名稱`：此處的任何值都應有效，如果您願意，可以使用“系統身份驗證”。
   - `PAM 服務名稱`：選擇 `/etc/pam.d/` 下列出的執行所需身份驗證的文件。[^1]
   - `PAM 電子郵件域`：附加到用戶身份驗證的電子郵件後綴。例如，如果登錄系統期望用戶名為 `gituser`，並且此字段設置為 `mail.com`，則 Gitea 將期望經過身份驗證的 GIT 實例的 `用戶電子郵件` 字段為 `gituser@mail.com`。[^2]

**注意**：PAM 支持是通過 [構建時標誌](installation/from-source.md#build) 添加的，官方提供的二進制文件未啟用此功能。PAM 需要必要的 libpam 動態庫可用，並且需要編譯器可以訪問必要的 PAM 開發標頭。

[^1]: 例如，使用 Debian "Bullseye" 上的標準 Linux 登錄，使用 `common-session-noninteractive` - 此值可能對其他版本的 Debian（包括 Ubuntu 和 Mint）有效，請參閱您的發行版文檔。
[^2]: **這是 PAM 的必填字段**。請注意：在上述示例中，用戶將以 `gituser` 而不是 `gituser@mail.com` 登錄 Gitea Web 界面。

## SMTP（簡單郵件傳輸協議）

此選項允許 Gitea 以 Gitea 用戶身份登錄到 SMTP 主機。要配置此項，請設置以下字段：

- 授權名稱 **（必填）**

  - 分配給新授權方法的名稱。

- SMTP 身份驗證類型 **（必填）**

  - 用於連接到 SMTP 主機的身份驗證類型，PLAIN 或 LOGIN。

- 主機 **（必填）**

  - 可以訪問 SMTP 主機的地址。
  - 例如：`smtp.mydomain.com`

- 端口 **（必填）**

  - 連接到服務器時使用的端口。
  - 例如：`587`

- 允許的域

  - 如果使用公共 SMTP 主機或具有多個域的 SMTP 主機，則限制哪些域可以登錄。
  - 例如：`gitea.com,mydomain.com,mydomain2.com`

- 強制 SMTPS

  - 默認情況下，將使用 SMTPS 連接到端口 465，如果您希望對其他端口使用 SMTPS，請設置此值。
  - 否則，如果服務器提供 `STARTTLS` 擴展，將使用此擴展。

- 跳過 TLS 驗證

  - 禁用身份驗證上的 TLS 驗證。

- 此身份驗證源已激活
  - 啟用或禁用此身份驗證源。

## FreeIPA

- 為了使用 FreeIPA 憑據登錄 Gitea，需要為 Gitea 創建一個綁定帳戶：

- 在 FreeIPA 服務器上，創建一個 `gitea.ldif` 文件，將 `dc=example,dc=com` 替換為您的 DN，並提供適當的安全密碼：

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

- 導入 LDIF（如果需要，將 localhost 更改為 IPA 服務器）。將提示輸入目錄管理員密碼：

  ```sh
  ldapmodify -h localhost -p 389 -x -D \
  "cn=Directory Manager" -W -f gitea.ldif
  ```

- 為 gitea_users 添加一個 IPA 組：

  ```sh
  ipa group-add --desc="Gitea Users" gitea_users
  ```

- 注意：有關 IPA 憑據的錯誤，請運行 `kinit admin` 並提供域管理員帳戶密碼。

- 以管理員身份登錄 Gitea，然後單擊管理面板下的“身份驗證”。然後單擊 `添加新源` 並填寫詳細信息，根據需要更改所有內容。

## SPNEGO 與 SSPI（Kerberos/NTLM，僅適用於 Windows）

Gitea 支持通過 Windows 中內置的安全支持提供程序接口（SSPI）為服務器的 Web 部分進行 SPNEGO 單點登錄身份驗證（RFC4559 定義的方案）。SSPI 僅在 Windows 環境中工作 - 當服務器和客戶端都運行 Windows 時。

在激活 SSPI 單點登錄身份驗證（SSO）之前，您必須準備好環境：

- 在活動目錄中創建一個單獨的用戶帳戶，該帳戶下將運行 `gitea.exe` 進程（例如，域 `domain.local` 下的 `user`）：

- 為運行 `gitea.exe` 的主機創建一個類別為 `HTTP` 的服務主體名稱：

  - 以特權域用戶（例如域管理員）身份啟動 `命令提示符` 或 `PowerShell`
  - 運行以下命令，將 `host.domain.local` 替換為運行 Web 應用程序的服務器的完全限定域名（FQDN），將 `domain\user` 替換為上一步中創建的帳戶名稱：

  ```sh
  setspn -A HTTP/host.domain.local domain\user
  ```

- 使用創建的用戶登錄（如果已登錄，請登出）

- 確保 `custom/conf/app.ini` 的 `[server]` 部分中的 `ROOT_URL` 是運行 Web 應用程序的服務器的完全限定域名 - 與創建服務主體名稱時使用的相同（例如 `host.domain.local`）

- 啟動 Web 服務器（`gitea.exe web`）

- 通過在 `站點管理 -> 身份驗證源` 中添加 `SPNEGO 與 SSPI` 身份驗證源來啟用 SSPI 身份驗證

- 使用任何域用戶登錄到同一域中的客戶端計算機（客戶端計算機，不同於運行 `gitea.exe` 的服務器）

- 如果您使用的是 Chrome 或 Edge，請將 Web 應用程序的 URL 添加到本地內部網站（`Internet 選項 -> 安全 -> 本地內部網站 -> 網站`）

- 啟動 Chrome 或 Edge 並導航到 Gitea 的 FQDN URL（例如 `http://host.domain.local:3000`）

- 單擊儀表板上的 `登錄` 按鈕，選擇 SSPI 以使用當前登錄到計算機的相同用戶自動登錄

- 如果不起作用，請確保：
  - 您未在運行 Gitea 的同一服務器上運行 Web 瀏覽器。您應該在域加入的計算機（客戶端）上運行 Web 瀏覽器，該計算機與服務器不同。如果客戶端和服務器都在同一計算機上運行，NTLM 將優先於 Kerberos。
  - 主機只有一個 `HTTP/...` SPN
  - SPN 僅包含主機名，不包含端口
  - 您已將 Web 應用程序的 URL 添加到 `本地內部網站區域`
  - 服務器和客戶端的時鐘不應相差超過 5 分鐘（取決於組策略）
  - Internet Explorer 中應啟用 `集成 Windows 身份驗證`（在 `高級設置` 下）

## 反向代理

Gitea 支持反向代理標頭身份驗證，它將讀取標頭作為受信任的登錄用戶名或用戶電子郵件地址。默認情況下未啟用此功能，您可以通過以下方式啟用它

```ini
[service]
ENABLE_REVERSE_PROXY_AUTHENTICATION = true
```

默認登錄用戶名在 `X-WEBAUTH-USER` 標頭中，您可以通過更
