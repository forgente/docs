---
date: "2020-01-16"
slug: "database-prep"
sidebar_position: 10
aliases:
  - /zh-tw/database-prep
---

# 数据库准备

在使用 Gitea 前，您需要准备一个数据库。Gitea 支持 PostgreSQL（>= 12）、MySQL（>= 8.0）、MariaDB（>= 10.4）、SQLite（内置） 和 MSSQL（>= 2012 SP4）这几种数据库。本页将指导您准备数据库。由于 PostgreSQL 和 MySQL 在生产环境中被广泛使用，因此本文檔将僅涵盖这两种数据库。如果您计划使用 SQLite，则可以忽略本章内容。

如果您使用不受支持的数据库版本，請通過 [联系我们](/help/support) 以获取有关我们的扩展支持的信息。我们可以為旧数据库提供测试和支持，並将这些修复集成到 Gitea 代码库中。

数据库实例可以与 Gitea 实例在相同机器上（本地数据库），也可以与 Gitea 实例在不同机器上（远程数据库）。

注意：以下所有步骤要求您的選择的数据库引擎已安裝在您的系统上。對於远程数据库设置，請在数据库实例上安裝服务器應用程序，在 Gitea 服务器上安裝客户端程序。客户端程序用于测试 Gitea 服务器与数据库之间的连接，而 Gitea 本身使用 Go 提供的数据库驱动程序完成相同的任务。此外，請确保服务器和客户端使用相同的引擎版本，以使某些引擎功能正常工作。出于安全原因，請使用安全密碼保护 `root`（MySQL）或 `postgres`（PostgreSQL）数据库超级使用者。以下步骤假设您在数据库和 Gitea 服务器上都使用 Linux。

## MySQL/MariaDB

1. 對於远程数据库设置，您需要让 MySQL 监听您的 IP 地址。编辑数据库实例上的 `/etc/mysql/my.cnf` 文件中的 `bind-address` 選项為：

   ```ini
   bind-address = 203.0.113.3
   ```

2. 在数据库实例上，使用 `root` 使用者登入到数据库控制台：

   ```
   mysql -u root -p
   ```

   按提示输入密碼。

3. 建立一个将被 Gitea 使用的数据库使用者，並使用密碼進行身份驗證。以下示例中使用了 `'gitea'` 作為密碼。請為您的实例使用一个安全密碼。

   對於本地数据库：

   ```sql
   SET old_passwords=0;
   CREATE USER 'gitea' IDENTIFIED BY 'gitea';
   ```

   對於远程数据库：

   ```sql
   SET old_passwords=0;
   CREATE USER 'gitea'@'192.0.2.10' IDENTIFIED BY 'gitea';
   ```

   其中 `192.0.2.10` 是您的 Gitea 实例的 IP 地址。

   根据需要替换上述使用者名和密碼。

4. 使用 UTF-8 字符集和大小写敏感的排序規則建立数据库。

   `utf8mb4_bin` 是 MySQL/MariaDB 的通用排序規則。
   Gitea 启动后会尝试把数据库修改為更合适的字符集 (`utf8mb4_0900_as_cs` 或者 `uca1400_as_cs`) 並在可能的情况下更改数据库。
   如果你想指定自己的字符集規則，可以在 `app.ini` 中设置 `[database].CHARSET_COLLATION`。

   ```sql
   CREATE DATABASE giteadb CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin';
   ```

   根据需要替换数据库名稱。

5. 将数据库上的所有权限授予上述建立的数据库使用者。

   對於本地数据库：

   ```sql
   GRANT ALL PRIVILEGES ON giteadb.* TO 'gitea';
   FLUSH PRIVILEGES;
   ```

   對於远程数据库：

   ```sql
   GRANT ALL PRIVILEGES ON giteadb.* TO 'gitea'@'192.0.2.10';
   FLUSH PRIVILEGES;
   ```

6. 通過 `exit` 退出数据库控制台。

7. 在您的 Gitea 服务器上，测试与数据库的连接：

   ```
   mysql -u gitea -h 203.0.113.3 -p giteadb
   ```

   其中 `gitea` 是数据库使用者名，`giteadb` 是数据库名稱，`203.0.113.3` 是数据库实例的 IP 地址。對於本地数据库，省略 `-h` 選项。

   到此您應該能够连接到数据库了。

## PostgreSQL

1. 對於远程数据库设置，通過编辑数据库实例上的 postgresql.conf 文件中的 `listen_addresses` 将 `PostgreSQL` 配置為监听您的 IP 地址：

   ```ini
   listen_addresses = 'localhost, 203.0.113.3'
   ```

2. PostgreSQL 默认使用 `md5` 质询-響應加密方案進行密碼身份驗證。現在这个方案不再被认為是安全的。改用 SCRAM-SHA-256 方案，通過编辑数据库服务器上的` postgresql.conf` 配置文件：

   ```ini
   password_encryption = scram-sha-256
   ```

   重启 PostgreSQL 以應用該设置。

3. 在数据库服务器上，以超级使用者身份登入到数据库控制台：

   ```
   su -c "psql" - postgres
   ```

4. 建立具有登入权限和密碼的数据库使用者（在 PostgreSQL 术语中稱為角色）。請使用安全的、强密碼，而不是下面的 `'gitea'`：

   ```sql
   CREATE ROLE gitea WITH LOGIN PASSWORD 'gitea';
   ```

   根据需要替换使用者名和密碼。

5. 使用 UTF-8 字符集建立数据库，並由之前建立的数据库使用者拥有。可以根据预期内容使用任何 `libc` 排序規則，使用 `LC_COLLATE` 和 `LC_CTYPE` 參數指定：

   ```sql
   CREATE DATABASE giteadb WITH OWNER gitea TEMPLATE template0 ENCODING UTF8 LC_COLLATE 'en_US.UTF-8' LC_CTYPE 'en_US.UTF-8';
   ```

   根据需要替换数据库名稱。

6. 通過将以下身份驗證規則添加到 `pg_hba.conf`，允许数据库使用者访问上面建立的数据库。

   對於本地数据库：

   ```ini
   local    giteadb    gitea    scram-sha-256
   ```

   對於远程数据库：

   ```ini
   host    giteadb    gitea    192.0.2.10/32    scram-sha-256
   ```

   根据您自己的数据库名稱、使用者和 Gitea 实例的 IP 地址進行替换。

   注意：`pg_hba.conf` 上的規則按顺序评估，也就是第一个匹配的規則将用于身份驗證。您的 PostgreSQL 安裝可能附带了适用于所有使用者和数据库的通用身份驗證規則。如果是这种情况，您可能需要将此处提供的規則放置在此类通用規則之上。

   重启 PostgreSQL 以應用新的身份驗證規則。

7. 在您的 Gitea 服务器上，测试与数据库的连接。

   對於本地数据库：

   ```
   psql -U gitea -d giteadb
   ```

   對於远程数据库：

   ```
   psql "postgres://gitea@203.0.113.3/giteadb"
   ```

   其中 `gitea` 是数据库使用者，`giteadb` 是数据库名稱，`203.0.113.3` 是您的数据库实例的 IP 地址。

   您應該会被提示输入数据库使用者的密碼，並连接到数据库。

## 使用 TLS 進行数据库连接

如果 Gitea 和您的数据库实例之间的通信是通過私有网络進行的，或者如果 Gitea 和数据库运行在同一台服务器上，那么可以省略本节，因為 Gitea 和数据库实例之间的安全性不会受到严重威胁。但是，如果数据库实例位于公共网络上，請使用 TLS 对数据库连接進行加密，以防止第三方拦截流量数据。

### 先决条件

- 您需要两个有效的 TLS 证书，一个用于数据库实例（数据库服务器），一个用于 Gitea 实例（数据库客户端）。两个证书都必須由受信任的 CA 签名。
- 数据库证书必須在 `X509v3 Extended Key Usage` 扩展属性中包含 `TLS Web Server Authentication`，而客户端证书则需要在相應的属性中包含 `TLS Web Client Authentication`。
- 在数据库服务器证书中，`Subject Alternative Name` 或 `Common Name` 条目之一必須是数据库实例的完全限定域名（FQDN）（例如 `db.example.com`）。在数据库客户端证书中，上述提到的条目之一必須包含 Gitea 将用于连接的数据库使用者名。
- 您需要将 Gitea 和数据库服务器的域名映射到它们各自的 IP 地址。可以為它们设置 DNS 记录，也可以在每个系统上的 `/etc/hosts`（Windows 中的 `%WINDIR%\System32\drivers\etc\hosts`）中添加本地映射。这样可以通過域名而不是 IP 地址進行数据库连接。有关详细信息，請参阅您系统的文檔。

### PostgreSQL TLS

Gitea 使用的 PostgreSQL 驱动程序支持双向 TLS。在双向 TLS 中，数据库客户端和服务器通過将各自的证书发送给对方進行驗證来相互認證。换句话说，服务器驗證客户端证书，客户端驗證服务器证书。

1. 在数据库实例所在的服务器上，放置以下凭据：

   - `/path/to/postgresql.crt`: 数据库实例证书
   - `/path/to/postgresql.key`: 数据库实例私钥
   - `/path/to/root.crt`: 用于驗證客户端证书的 CA 证书链

2. 在 `postgresql.conf` 中添加以下選项：

   ```ini
   ssl = on
   ssl_ca_file = '/path/to/root.crt'
   ssl_cert_file = '/path/to/postgresql.crt'
   ssl_key_file = '/path/to/postgresql.key'
   ssl_min_protocol_version = 'TLSv1.2'
   ```

3. 根据 PostgreSQL 的要求，调整凭据的所有权和权限：

   ```
   chown postgres:postgres /path/to/root.crt /path/to/postgresql.crt /path/to/postgresql.key
   chmod 0600 /path/to/root.crt /path/to/postgresql.crt /path/to/postgresql.key
   ```

4. 编辑 `pg_hba.conf` 規則，僅允许 Gitea 数据库使用者通過 SSL 连接，並要求客户端证书驗證。

   對於 PostgreSQL 12：

   ```ini
   hostssl    giteadb    gitea    192.0.2.10/32    scram-sha-256    clientcert=verify-full
   ```

   對於 PostgreSQL 11 及更早版本：

   ```ini
   hostssl    giteadb    gitea    192.0.2.10/32    scram-sha-256    clientcert=1
   ```

   根据需要替换数据库名稱、使用者和 Gitea 实例的 IP 地址。

5. 重新启动 PostgreSQL 以應用上述配置。

6. 在运行 Gitea 实例的服务器上，将以下凭据放置在运行 Gitea 的使用者的主目錄下（例如 `git`）：

   - `~/.postgresql/postgresql.crt`: 数据库客户端证书
   - `~/.postgresql/postgresql.key`: 数据库客户端私钥
   - `~/.postgresql/root.crt`: 用于驗證服务器证书的 CA 证书链

   注意：上述文件名在 PostgreSQL 中是硬编码的，無法更改。

7. 根据需要调整凭据、所有权和权限：

   ```
   chown git:git ~/.postgresql/postgresql.crt ~/.postgresql/postgresql.key ~/.postgresql/root.crt
   chown 0600 ~/.postgresql/postgresql.crt ~/.postgresql/postgresql.key ~/.postgresql/root.crt
   ```

8. 测试与数据库的连接：

   ```
   psql "postgres://gitea@example.db/giteadb?sslmode=verify-full"
   ```

   您将被提示输入数据库使用者的密碼，然后连接到数据库。

### MySQL/MariaDB TLS

虽然 Gitea 使用的 MySQL 驱动程序也支持双向 TLS，但目前 Gitea 僅支持單向 TLS。有关详细信息，請参见工單＃10828。

在單向 TLS 中，数据库客户端在连接握手期间驗證服务器发送的证书，而服务器则假定连接的客户端是合法的，因為不進行客户端证书驗證。

1. 在数据库实例上放置以下凭据：

   - `/path/to/mysql.crt`: 数据库实例证书
   - `/path/to/mysql.key`: 数据库实例密钥
   - `/path/to/ca.crt`: CA 证书链。在單向 TLS 中不使用此文件，但用于驗證双向 TLS 中的客户端证书。

2. 将以下選项添加到 `my.cnf`：

   ```ini
   [mysqld]
   ssl-ca = /path/to/ca.crt
   ssl-cert = /path/to/mysql.crt
   ssl-key = /path/to/mysql.key
   tls-version = TLSv1.2,TLSv1.3
   ```

3. 调整凭据的所有权和权限：

   ```
   chown mysql:mysql /path/to/ca.crt /path/to/mysql.crt /path/to/mysql.key
   chmod 0600 /path/to/ca.crt /path/to/mysql.crt /path/to/mysql.key
   ```

4. 重新启动 MySQL 以應用设置。

5. Gitea 的数据库使用者可能已经建立過，但只会对运行 Gitea 的服务器的 IP 地址進行身份驗證。要对其域名進行身份驗證，請重新建立使用者，並设置其需要通過 TLS 连接到数据库：

   ```sql
   DROP USER 'gitea'@'192.0.2.10';
   CREATE USER 'gitea'@'example.gitea' IDENTIFIED BY 'gitea' REQUIRE SSL;
   GRANT ALL PRIVILEGES ON giteadb.* TO 'gitea'@'example.gitea';
   FLUSH PRIVILEGES;
   ```

   根据需要替换数据库使用者名、密碼和 Gitea 实例域名。

6. 确保用于驗證数据库服务器证书的 CA 证书链位于数据库和 Gitea 服务器的系统证书存儲中。請参考系统文檔中有关将 CA 证书添加到证书存儲的说明。

7. 在运行 Gitea 的服务器上，测试与数据库的连接：

   ```
   mysql -u gitea -h example.db -p --ssl
   ```

   至此應該成功连接到数据库了。
