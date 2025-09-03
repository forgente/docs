---
date: "2023-05-23T09:00:00+08:00"
slug: "search-engines-indexation"
sidebar_position: 60
aliases:
  - /zh-tw/search-engines-indexation
---

# 搜索引擎索引

默认情况下，您的 Gitea 安裝将被搜索引擎索引。
如果您不希望您的存放庫对搜索引擎可见，請進一步阅读。

## 使用 robots.txt 阻止搜索引擎索引

為了使 Gitea 為顶级安裝提供自定义的`robots.txt`（默认為空的 404），請在 [`custom`文件夹或`CustomPath`]（administration/customizing-gitea.md）中建立一个名為 `public/robots.txt` 的文件。

有关如何配置 `robots.txt` 的示例，請参考 [https://moz.com/learn/seo/robotstxt](https://moz.com/learn/seo/robotstxt)。

```txt
User-agent: *
Disallow: /
```

如果您将 Gitea 安裝在子目錄中，则需要在顶级目錄中建立或编辑 `robots.txt`。

```txt
User-agent: *
Disallow: /gitea/
```
