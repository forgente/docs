---
date: "2023-05-23T09:00:00+08:00"
slug: "profile-readme"
sidebar_position: 12
---

# 个人资料 README

要在您的 Gitea 个人资料页面显示一个 Markdown 文件，只需建立一个名為 `.profile` 的存放庫，並编辑其中的 `README.md` 文件。Gitea 将自动获取該文件並在您的存放庫上方显示。

注意：您可以将此存放庫设為私有。这样可以隐藏您的源文件，使其对公众不可见，並允许您将某些文件设為私有。但是，README.md 文件将是您个人资料上唯一存在的文件。如果您希望完全私有化 .profile 存放庫，则需删除或重命名 README.md 文件。

使用者示例 `.profile/README.md`:

![个人资料自述文件截图](/images/usage/profile-readme.png)
