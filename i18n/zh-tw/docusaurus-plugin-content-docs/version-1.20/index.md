---
date: "2016-11-08T16:00:00+02:00"

slug: /
sidebar_position: 10
---

# 關於 Gitea

Gitea 是一個自己託管的 Git 服務程序。他和 GitHub, Bitbucket or Gitlab 等比較類似。他是從 [Gogs](http://gogs.io) 發展而來，不過我們已經 Fork 並且命名為 Gitea。對於我們 Fork 的原因可以看 [這裡](https://blog.gitea.io/2016/12/welcome-to-gitea/)。

## 目標

Gitea 的首要目標是創建一個極易安裝，運行非常快速，安裝和使用體驗良好的自建 Git 服務。我們採用 Go 作為後端語言，這使我們只要生成一個可執行程序即可。並且他還支持跨平台，支持 Linux, macOS 和 Windows 以及各種架構，除了 x86，amd64，還包括 ARM 和 PowerPC。

## 功能特性

- 支持活動時間線
- 支持 SSH 以及 HTTP/HTTPS 協議
- 支持 SMTP、LDAP 和反向代理的用戶認證
- 支持反向代理子路徑
- 支持用戶、組織和倉庫管理系統
- 支持添加和刪除倉庫協作者
- 支持倉庫和組織級別 Web 鉤子（包括 Slack 集成）
- 支持倉庫 Git 鉤子和部署密鑰
- 支持倉庫工單（Issue）、合併請求（Pull Request）以及 Wiki
- 支持遷移和鏡像倉庫以及它的 Wiki
- 支持在線編輯倉庫文件和 Wiki
- 支持自定義源的 Gravatar 和 Federated Avatar
- 支持郵件服務
- 支持後台管理面板
- 支持 MySQL、PostgreSQL、SQLite3、MSSQL 和 TiDB(MySQL) 數據庫
- 支持多語言本地化（21 種語言）
- 支持軟體包註冊中心（Composer/Conan/Container/Generic/Helm/Maven/NPM/Nuget/PyPI/RubyGems）

## 系統要求

- 最低的系統硬件要求為一個廉價的樹莓派
- 如果用於團隊項目，建議使用 2 核 CPU 及 1GB 內存

## 瀏覽器支持

- Chrome, Firefox, Safari, Edge

## 組件

- Web 框架：[Chi](http://github.com/go-chi/chi)
- ORM: [XORM](https://xorm.io)
- UI 框架：
  - [jQuery](https://jquery.com)
  - [Fomantic UI](https://fomantic-ui.com)
  - [Vue3](https://vuejs.org)
  - 更多組件參見 package.json
- 編輯器：
  - [CodeMirror](https://codemirror.net)
  - [EasyMDE](https://github.com/Ionaru/easy-markdown-editor)
  - [Monaco Editor](https://microsoft.github.io/monaco-editor)
- 數據庫驅動：
  - [github.com/go-sql-driver/mysql](https://github.com/go-sql-driver/mysql)
  - [github.com/lib/pq](https://github.com/lib/pq)
  - [github.com/mattn/go-sqlite3](https://github.com/mattn/go-sqlite3)
  - [github.com/denisenkom/go-mssqldb](https://github.com/denisenkom/go-mssqldb)

## 集成支持

請訪問 [Awesome Gitea](https://gitea.com/gitea/awesome-gitea/) 獲得更多的第三方集成支持
