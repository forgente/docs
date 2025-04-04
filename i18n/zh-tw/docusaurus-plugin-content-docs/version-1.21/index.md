---
date: "2016-11-08T16:00:00+02:00"

slug: /
sidebar_position: 10
---

# 關於 Gitea

Gitea 是一個輕量級的 DevOps 平台軟體。從開發計劃到產品成型的整個軟體生命週期，他都能夠高效而輕鬆地幫助團隊和開發者。包括 Git 託管、代碼審查、團隊協作、軟體包註冊和 CI/CD。它與 GitHub、Bitbucket 和 GitLab 等比較類似。
Gitea 最初是從 [Gogs](http://gogs.io) 分支而來，幾乎所有代碼都已更改。對於我們 Fork 的原因可以看
[這裡](https://blog.gitea.com/welcome-to-gitea/)。

## 目標

Gitea 的首要目標是創建一個極易安裝，運行非常快速，安裝和使用體驗良好
的自建 Git 服務。

採用 Go 作為後端語言，只需生成一個可執行程序即可。
支持 Linux, macOS 和 Windows 等多平台，
支持主流的 x86，amd64、
ARM 和 PowerPC 等架構。

## 功能特性

- 代碼託管：Gitea 支持創建和管理倉庫、瀏覽提交歷史和代碼文件、審查和合併代碼提交、管理協作者、管理分支等。它還支持許多常見的 Git 特性，例如標籤、Cherry-pick、hook、集成協作工具等。
- 輕量級和快速: Gitea 的設計目標之一就是輕量級和快速響應。它不像一些大型的代碼託管平台那樣臃腫，因此在性能方面表現出色，適用於資源有限的伺服器環境。由於其輕量級設計，Gitea 在資源消耗方面相對較低，可以在資源有限的環境下運行良好。
- 易於部署和維護: 輕鬆地部署在各種伺服器上，不需要複雜的配置和依賴。這使得個人開發者或小團隊可以方便地設置和管理自己的 Git 服務。
- 安全性: Gitea 注重安全性，提供了用戶權限管理、訪問控制列表等功能，可以確保代碼和數據的安全性。
- 代碼評審：代碼評審同時支持 Pull Request workflow 和 AGit workflow。評審人可以在線瀏覽代碼，並提交評審意見或問題。 提交者可以接收到評審意見，並在線回 覆或修改代碼。代碼評審可以幫助用戶和企業提高代碼質量。
- CI/CD: Gitea Actions 支持 CI/CD 功能，該功能兼容 GitHub Actions，用戶可以採用熟悉的 YAML 格式編寫 workflows，也可以重 用大量的已有的 Actions 插件。Actions 插件支持從任意的 Git 網站中下載。
- 項目管理：Gitea 通過看板和工單來跟踪一個項目的需求，功能和 bug。工單支持分支，標籤、里程碑、 指派、時間跟踪、到期時間、依賴關係等功能。
- 制品庫: Gitea 支持超過 20 種不同種類的公有或私有軟體包管理，包括：Cargo, Chef, Composer, Conan, Conda, Container, Helm, Maven, npm, NuGet, Pub, PyPI, RubyGems, Vagrant 等
- 開源社區支持: Gitea 是一個基於 MIT 許可證的開源項目,Gitea 擁有一個活躍的開源社區，能夠持續地進行開發和改進，同時也積極接受社區貢獻，保持了平台的更新和創新。
- 多語言支持： Gitea 提供多種語言界面，適應全球範圍內的用戶，促進了國際化和本地化。

更多功能特性：詳見：https://docs.gitea.com/installation/comparison#general-features

## 系統要求

- 樹莓派 Pi3 功能強大，足以運行 Gitea 來處理小型工作負載。
- 對於小型團隊/項目而言，2 個 CPU 內核和 1GB 內存通常就足夠了。
- 在 UNIX 系統上，Gitea 應使用專用的非 root 系統賬戶運行。
  - 注意：Gitea 管理 `~/.ssh/authorized_keys` 文件。以普通用戶身份運行 Gitea 可能會破壞該用戶的登錄能力。
- [Git](https://git-scm.com/) 需要 2.0.0 或更高版本。
  - [Git Large File Storage](https://git-lfs.github.com/) 如果啟用，且 Git 版本大於等於 2.1.2，則該選項可用
  - 如果 Git 版本大於等於 2.18，將自動啟用 Git 提交歷史圖形化展示功能

## 瀏覽器支持

- 最後 2 個版本的 Chrome, Firefox, Safari 和 Edge
- Firefox ESR

## 技術棧

- Web 框架： [Chi](http://github.com/go-chi/chi)
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
