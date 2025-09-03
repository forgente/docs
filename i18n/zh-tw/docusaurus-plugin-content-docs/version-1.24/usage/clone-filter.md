---
date: "2023-05-23T09:00:00+08:00"

slug: "clone-filters"
sidebar_position: 25
aliases:
  - /zh-tw/clone-filters
---

# 克隆過滤器 (部分克隆)

Git 引入了 `--filter` 選项用于 `git clone` 命令，該選项可以過滤掉大文件和对象（如 blob），从而建立一个存放庫的部分克隆。克隆過滤器對於大型存放庫和/或按流量计费的连接特别有用，因為完全克隆（不使用 `--filter`）可能会很昂贵（需要下载所有历史数据）。

这需要 Git 2.22 或更高版本，無论是在 Gitea 服务器上還是在客户端上都需要如此。為了使克隆過滤器正常工作，請确保客户端上的 Git 版本至少与服务器上的版本相同（或更高）。以管理员身份登入到 Gitea，然后转到管理后台 -> 應用配置，查看服务器的 Git 版本。

默认情况下，克隆過滤器是启用的，除非在 `[git]` 下将 `DISABLE_PARTIAL_CLONE` 设置為 `true`。

請参阅 [GitHub 博客文章：了解部分克隆](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/) 以获取克隆過滤器的常见用法（無 Blob 和無树的克隆），以及 [GitLab 部分克隆文檔](https://docs.gitlab.com/ee/topics/git/partial_clone.html) 以获取更高级的用法（例如按文件大小過滤和取消過滤以将部分克隆转换為完全克隆）。
