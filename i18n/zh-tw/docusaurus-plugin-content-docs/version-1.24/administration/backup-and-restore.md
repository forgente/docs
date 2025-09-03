---
date: "2018-06-06T09:33:00+08:00"
slug: "backup-and-restore"
sidebar_position: 11

aliases:
  - /zh-tw/backup-and-restore
---

# 备份与恢复

Gitea 已经实現了 `dump` 命令可以用来备份所有需要的文件到一个 zip 压缩文件。該压缩文件可以被用来進行数据恢复。

## 备份一致性

為了确保 Gitea 实例的一致性，在备份期间必須关闭它。

Gitea 包括数据库、文件和 Git 存放庫，当它被使用时所有这些都会发生变化。例如，当迁移正在進行时，在数据库中建立一个事务，而 Git 存放庫正在被复制。如果备份发生在迁移的中间，Git 存放庫可能是不完整的，尽管数据库声稱它是完整的，因為它是在之后被转儲的。避免这种竞争条件的唯一方法是在备份期间停止 Gitea 实例。

## 备份命令 (`dump`)

先转到 git 使用者的权限: `su git`. 再 Gitea 目錄运行 `./gitea dump`。一般会显示类似如下的输出：

```
2016/12/27 22:32:09 Creating tmp work dir: /tmp/gitea-dump-417443001
2016/12/27 22:32:09 Dumping local repositories.../home/git/gitea-repositories
2016/12/27 22:32:22 Dumping database...
2016/12/27 22:32:22 Packing dump files...
2016/12/27 22:32:34 Removing tmp work dir: /tmp/gitea-dump-417443001
2016/12/27 22:32:34 Finish dumping in file gitea-dump-1482906742.zip
```

最后生成的 `gitea-dump-1482906742.zip` 文件将会包含如下内容：

- `app.ini` - 如果原先存儲在默认的 custom/ 目錄之外，则是配置文件的可選副本
- `custom/` - 所有保存在 `custom/` 目錄下的配置和自定义的文件。
- `data/` - 数据目錄（APP_DATA_PATH），如果使用文件会话，则不包括会话。該目錄包括 `attachments`、`avatars`、`lfs`、`indexers`、如果使用 SQLite 则包括 SQLite 文件。
- `repos/` - 存放庫目錄的完整副本。
- `gitea-db.sql` - 数据库 dump 出来的 SQL。
- `log/` - Logs 文件，如果用作迁移不是必須的。

中间备份文件将会在临时目錄進行建立，如果您要重新指定临时目錄，可以用 `--tempdir` 參數，或者用 `TMPDIR` 环境变量。

## 备份数据库

`gitea dump` 建立的 SQL 转儲使用 XORM，Gitea 管理员可能更喜欢使用本地的 MySQL 和 PostgreSQL 转儲工具。使用 XORM 转儲数据库时仍然存在一些问题，可能会导致在尝试恢复时出現问题。

```sh
# mysql
mysqldump -u$USER -p$PASS --database $DATABASE > gitea-db.sql
# postgres
pg_dump -U $USER $DATABASE > gitea-db.sql
```

### 使用 Docker （`dump`）

在使用 Docker 时，使用 `dump` 命令有一些注意事项。

必須以 `gitea/conf/app.ini` 中指定的 `RUN_USER = <OS_USERNAME>` 執行該命令；並且，為了让备份文件夹的压缩過程能够顺利執行，`docker exec` 命令必須在 `--tempdir` 内部執行。

示例：

```none
docker exec -u <OS_USERNAME> -it -w <--tempdir> $(docker ps -qf 'name=^<NAME_OF_DOCKER_CONTAINER>$') bash -c '/usr/local/bin/gitea dump -c </path/to/app.ini>'
```

\*注意：`--tempdir` 指的是 Gitea 使用的 Docker 环境的临时目錄；如果您没有指定自定义的 `--tempdir`，那么 Gitea 将使用 `/tmp` 或 Docker 容器的 `TMPDIR` 环境变量。對於 `--tempdir`，請相應调整您的 `docker exec` 命令選项。

结果應該是一个文件，存儲在指定的 `--tempdir` 中，类似于：`gitea-dump-1482906742.zip`

## 恢复命令 (`restore`)

当前還没有恢复命令，恢复需要人工進行。主要是把文件和数据库進行恢复。

例如：

```sh
unzip gitea-dump-1610949662.zip
cd gitea-dump-1610949662
mv app.ini /etc/gitea/conf/app.ini
mv data/* /var/lib/gitea/data/
mv log/* /var/lib/gitea/log/
mv repos/* /var/lib/gitea/gitea-repositories/
chown -R gitea:gitea /etc/gitea/conf/app.ini /var/lib/gitea

# mysql
mysql --default-character-set=utf8mb4 -u$USER -p$PASS $DATABASE <gitea-db.sql
# sqlite3
sqlite3 $DATABASE_PATH <gitea-db.sql
# postgres
psql -U $USER -d $DATABASE < gitea-db.sql

service gitea restart
```

如果安裝方式发生了变化（例如 二進制 -> Docker），或者 Gitea 安裝到了与之前安裝不同的目錄，则需要重新生成存放庫 Git 钩子。

在 Gitea 运行时，並从 Gitea 二進制文件所在的目錄執行：`./gitea admin regenerate hooks`

这样可以确保存放庫 Git 钩子中的應用程序和配置文件路径与当前安裝一致。如果这些路径没有更新，存放庫的 `push` 操作将失败。

### 使用 Docker (`restore`)

在基于 Docker 的 Gitea 实例中，也没有恢复命令的支持。恢复過程与前面描述的步骤相同，但路径不同。

示例：

```sh
# 在容器中打开 bash 会话
docker exec --user git -it 2a83b293548e bash
# 在容器内解压您的备份文件
unzip gitea-dump-1610949662.zip
cd gitea-dump-1610949662
# 恢复 Gitea 数据
mv data/* /data/gitea
# 恢复存放庫本身
mv repos/* /data/git/gitea-repositories/
# 调整文件权限
chown -R git:git /data
# 重新生成 Git 钩子
/usr/local/bin/gitea -c '/data/gitea/conf/app.ini' admin regenerate hooks
```

Gitea 容器中的默认使用者是 `git`（1000:1000）。請用您的 Gitea 容器 ID 或名稱替换 `2a83b293548e`。

### 使用 Docker-rootless (`restore`)

在 Docker-rootless 容器中的恢复工作流程只是要使用的目錄不同：

```sh
# 在容器中打开 bash 会话
docker exec --user git -it 2a83b293548e bash
# 在容器内解压您的备份文件
unzip gitea-dump-1610949662.zip
cd gitea-dump-1610949662
# 恢复 app.ini
mv data/conf/app.ini /etc/gitea/app.ini
# 恢复 Gitea 数据
mv data/* /var/lib/gitea
# 恢复存放庫本身
mv repos/* /var/lib/gitea/git/gitea-repositories
# 调整文件权限
chown -R git:git /etc/gitea/app.ini /var/lib/gitea
# 重新生成 Git 钩子
/usr/local/bin/gitea -c '/etc/gitea/app.ini' admin regenerate hooks
```
