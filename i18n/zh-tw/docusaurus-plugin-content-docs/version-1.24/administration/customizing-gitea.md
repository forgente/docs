---
date: "2017-04-15T14:56:00+02:00"
slug: "customizing-gitea"
sidebar_position: 100

aliases:
  - /zh-tw/customizing-gitea
---

# 自定义 Gitea 配置

Gitea 引用 `custom` 目錄中的自定义配置文件来覆盖配置、模板等默认配置。

如果从二進制部署 Gitea ，则所有默认路径都将相對於該 gitea 二進制文件；如果从发行版安裝，则可能会将这些路径修改為 Linux 文件系统标准。Gitea
将会自动建立包括 `custom/` 在内的必要應用目錄，應用本身的配置存放在
`custom/conf/app.ini` 当中。在发行版中可能会以 `/etc/gitea/` 的形式為 `custom` 设置一个符号链接，查看配置详情請移步：

- [快速备忘單](../administration/config-cheat-sheet.md)
- [完整配置清單](https://github.com/go-gitea/gitea/blob/main/custom/conf/app.example.ini)

如果您在 binary 同目錄下無法找到 `custom` 文件夹，請检查您的 `GITEA_CUSTOM`
环境变量配置， 因為它可能被配置到了其他地方（可能被一些启动脚本设置指定了目錄）。

- [环境变量清單](../administration/environment-variables.md)

**注：** 必須完全重启 Gitea 以使配置生效。

## 使用自定义 /robots.txt

将 [想要展示的内容](http://www.robotstxt.org/) 存放在 `custom` 目錄中的
`robots.txt` 文件来让 Gitea 使用自定义的`/robots.txt` （默认：空 404）。

## 使用自定义的公共文件

将自定义的公共文件（比如页面和图片）作為 webroot 放在 `custom/public/` 中来让 Gitea 提供这些自定义内容（符号链接将被追踪）。

举例说明：`image.png` 存放在 `custom/public/assets/`中，那么它可以通過链接 http://gitea.domain.tld/assets/image.png 访问。

## 修改默认头像

替换以下目錄中的 png 图片： `custom/public/assets/img/avatar\_default.png`

## 自定义 Gitea 页面

您可以改变 Gitea `custom/templates` 的每个單页面。您可以在 Gitea 源码的 `templates` 目錄中找到用于覆盖的模板文件，應用将根据
`custom/templates` 目錄下的路径结构進行匹配和覆盖。

包含在 `{{` 和 `}}` 中的任何语句都是 Gitea 的模板语法，如果您不完全理解这些组件，不建议您对它们進行修改。

### 添加链接和页签

如果您只是想添加额外的链接到顶部导航栏或额外的選项卡到存儲库视图，您可以将它们放在您 `custom/templates/custom/` 目錄下的 `extra_links.tmpl` 和 `extra_tabs.tmpl` 文件中。

举例说明：假设您需要在网站放置一个静态的“关于”页面，您只需将該页面放在您的
"custom/public/"目錄下（比如 `custom/public/impressum.html`）並且将它与 `custom/templates/custom/extra_links.tmpl` 链接起来即可。

这个链接應当使用一个名為“item”的 class 来匹配当前样式，您可以使用 `{{AppSubUrl}}` 来获取 base URL:
`<a class="item" href="{{AppSubUrl}}/assets/impressum.html">Impressum</a>`

同理，您可以将页签添加到 `extra_tabs.tmpl` 中，使用同样的方式来添加页签。它的具體样式需要与
`templates/repo/header.tmpl` 中已有的其他選项卡的样式匹配
([source in GitHub](https://github.com/go-gitea/gitea/blob/main/templates/repo/header.tmpl))

### 页面的其他新增内容

除了 `extra_links.tmpl` 和 `extra_tabs.tmpl`，您可以在您的 `custom/templates/custom/` 目錄中存放一些其他有用的模板，例如：

- `header.tmpl`，在 `<head>` 标记结束之前的模板，例如添加自定义 CSS 文件
- `body_outer_pre.tmpl`，在 `<body>` 标记开始处的模板
- `body_inner_pre.tmpl`，在顶部导航栏之前，但在主 container 内部的模板，例如添加一个 `<div class="full height">`
- `body_inner_post.tmpl`，在主 container 结束处的模板
- `body_outer_post.tmpl`，在底部 `<footer>` 元素之前.
- `footer.tmpl`，在 `<body>` 標籤结束处的模板，可以在这里填写一些附加的 Javascript 脚本。

## 自定义 gitignores，labels， licenses， locales 以及 readmes

将自定义文件放在 `custom/options` 下相應子的文件夹中即可

## 更改 Gitea 外观

内置主题是“gitea-light”、“gitea-dark”和“gitea-auto”（自动适應操作系统设置）。

默认主题可以通過 `app.ini` 的 [ui](../administration/config-cheat-sheet.md#界面) 部分中的 `DEFAULT_THEME` 進行更改。
