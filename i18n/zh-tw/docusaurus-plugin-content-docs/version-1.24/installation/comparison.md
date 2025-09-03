---
date: "2019-02-14T11:51:04+08:00"
slug: "comparison"
sidebar_position: 5
aliases:
  - /zh-tw/comparison
---

# 对比 Gitea 与其它 Git 托管工具

这里列出了 Gitea 与其它一些 Git 托管工具之间的异同，以便确认 Gitea 是否能够满足您的需求。

請注意，此列表中的某些表项可能已经過时，因為我们並没有定期检查其它产品的功能是否有所更改。你可以前往 [Github issue](https://github.com/go-gitea/gitea/issues) 来帮助我们更新過时的内容，感谢！

_表格中的符号含义:_

- _✓ - 支持_

- _⁄ - 部分支持_

- _✘ - 不支持_

- _⚙️ - 由第三方服务或插件支持_

#### 主要特性

| 特性                             | Gitea                                               | Gogs | GitHub EE | GitLab CE | GitLab EE | BitBucket      | RhodeCode CE |
| -------------------------------- | --------------------------------------------------- | ---- | --------- | --------- | --------- | -------------- | ------------ |
| 开源免费                         | ✓                                                   | ✓    | ✘         | ✓         | ✘         | ✘              | ✓            |
| 低资源开销 (RAM/CPU)             | ✓                                                   | ✓    | ✘         | ✘         | ✘         | ✘              | ✘            |
| 支持多种数据库                   | ✓                                                   | ✓    | ✘         | ⁄         | ⁄         | ✓              | ✓            |
| 支持多种操作系统                 | ✓                                                   | ✓    | ✘         | ✘         | ✘         | ✘              | ✓            |
| 升级简便                         | ✓                                                   | ✓    | ✘         | ✓         | ✓         | ✘              | ✓            |
| 可观测性                         | **✘**                                               | ✘    | ✓         | ✓         | ✓         | ✓              | ?            |
| 支持第三方渲染工具               | ✓                                                   | ✘    | ✘         | ✘         | ✘         | ✓              | ?            |
| WebAuthn (2FA)                   | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓              | ?            |
| 扩展 API                         | ✓                                                   | ✓    | ✓         | ✓         | ✓         | ✓              | ✓            |
| 内置軟體包/容器注册中心          | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✘              | ✘            |
| 同步提交到外部存放庫 (push mirror) | ✓                                                   | ✓    | ✘         | ✓         | ✓         | ✘              | ✓            |
| 同步外部存放庫的提交 (pull mirror) | ✓                                                   | ✘    | ✘         | ✓         | ✓         | ✘              | ?            |
| 浅色和深色主题                   | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✘              | ?            |
| 自定义主题支持                   | ✓                                                   | ✓    | ✘         | ✘         | ✘         | ✓              | ✘            |
| 支持 Markdown                    | ✓                                                   | ✓    | ✓         | ✓         | ✓         | ✓              | ✓            |
| 支持 CSV                         | ✓                                                   | ✘    | ✓         | ✘         | ✘         | ✓              | ?            |
| Git 驱动的静态 pages             | [⚙️][gitea-pages-server], [⚙️][gitea-caddy-plugin]  | ✘    | ✓         | ✓         | ✓         | ✘              | ✘            |
| Git 驱动的集成化 wiki            | ✓                                                   | ✓    | ✓         | ✓         | ✓         | ✓ (cloud only) | ✘            |
| 部署令牌                         | ✓                                                   | ✓    | ✓         | ✓         | ✓         | ✓              | ✓            |
| 存放庫写权限令牌                   | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓              | ✓            |
| RSS Feeds                        | ✓                                                   | ✘    | ✓         | ✘         | ✘         | ✘              | ✘            |
| 内置 CI/CD                       | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✘              | ✘            |
| 子組織：組織内的組織             | [✘](https://github.com/go-gitea/gitea/issues/1872)  | ✘    | ✘         | ✓         | ✓         | ✘              | ✓            |
| 多实例交互                       | [/](https://github.com/go-gitea/gitea/issues/18240) | ✘    | ✘         | ✘         | ✘         | ✘              | ✘            |
| Markdown 绘图                    | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✘              | ✘            |
| Markdown 数学公式                | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✘              | ✘            |

#### 代码管理

| 特性                 | Gitea                                               | Gogs | GitHub EE | GitLab CE | GitLab EE | BitBucket | RhodeCode CE |
| -------------------- | --------------------------------------------------- | ---- | --------- | --------- | --------- | --------- | ------------ |
| 存放庫主题描述         | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✘         | ✘            |
| 存放庫内代码搜索       | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✓            |
| 全局代码搜索         | ✓                                                   | ✘    | ✓         | ✘         | ✓         | ✓         | ✓            |
| Git LFS 2.0          | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✓            |
| 組織里程碑           | [✘](https://github.com/go-gitea/gitea/issues/14622) | ✘    | ✘         | ✓         | ✓         | ✘         | ✘            |
| 细粒度使用者角色       | ✓                                                   | ✘    | ✘         | ✓         | ✓         | ✘         | ✘            |
| 提交人的身份驗證     | ⁄                                                   | ✘    | ?         | ✓         | ✓         | ✓         | ✘            |
| GPG 签名的提交       | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✓            |
| SSH 签名的提交       | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ?         | ?            |
| 拒绝未通過驗證的提交 | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✓            |
| 外部存放庫迁移         | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✓            |
| 存放庫活跃度页面       | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✓            |
| 分支管理             | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✓            |
| 建立新分支           | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✘         | ✘            |
| 在线代码编辑         | ✓                                                   | ✓    | ✓         | ✓         | ✓         | ✓         | ✓            |
| 提交的统计图表       | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✓            |
| 模板存放庫             | ✓                                                   | ✘    | ✓         | ✘         | ✓         | ✓         | ✘            |
| Git Blame            | ✓                                                   | ✘    | ✓         | ✓         | ✓         | ✓         | ✘            |
| 可视化镜像变化       | ✓                                                   | ✘    | ✓         | ?         | ?         | ?         | ?            |

#### 工單管理

| 特性                | Gitea                                              | Gogs                                          | GitHub EE | GitLab CE                                                               | GitLab EE | BitBucket      | RhodeCode CE |
| ------------------- | -------------------------------------------------- | --------------------------------------------- | --------- | ----------------------------------------------------------------------- | --------- | -------------- | ------------ |
| 工單跟踪            | ✓                                                  | ✓                                             | ✓         | ✓                                                                       | ✓         | ✓ (cloud only) | ✘            |
| 工單模板            | ✓                                                  | ✓                                             | ✓         | ✓                                                                       | ✓         | ✘              | ✘            |
| 標籤                | ✓                                                  | ✓                                             | ✓         | ✓                                                                       | ✓         | ✘              | ✘            |
| 时间跟踪            | ✓                                                  | ✘                                             | ✓         | ✓                                                                       | ✓         | ✘              | ✘            |
| 支持多个负责人      | ✓                                                  | ✘                                             | ✓         | ✘                                                                       | ✓         | ✘              | ✘            |
| 关联的工單          | ✘                                                  | ✘                                             | ⁄         | [✓](https://docs.gitlab.com/ce/user/project/issues/related_issues.html) | ✓         | ✘              | ✘            |
| 私密工單            | [✘](https://github.com/go-gitea/gitea/issues/3217) | ✘                                             | ✘         | ✓                                                                       | ✓         | ✘              | ✘            |
| 评论反馈            | ✓                                                  | ✘                                             | ✓         | ✓                                                                       | ✓         | ✘              | ✘            |
| 锁定讨论            | ✓                                                  | ✘                                             | ✓         | ✓                                                                       | ✓         | ✘              | ✘            |
| 工單批处理          | ✓                                                  | ✘                                             | ✓         | ✓                                                                       | ✓         | ✘              | ✘            |
| 工單看板            | [✓](https://github.com/go-gitea/gitea/pull/8346)   | ✘                                             | ✘         | ✓                                                                       | ✓         | ✘              | ✘            |
| 从工單建立分支      | ✘                                                  | ✘                                             | ✘         | ✓                                                                       | ✓         | ✘              | ✘            |
| 从评论建立工單      | ✓                                                  | ✘                                             | ✓         | ✓                                                                       | ✓         | ✘              | ✘            |
| 工單搜索            | ✓                                                  | ✘                                             | ✓         | ✓                                                                       | ✓         | ✓              | ✘            |
| 工單全局搜索        | [✘](https://github.com/go-gitea/gitea/issues/2434) | ✘                                             | ✓         | ✓                                                                       | ✓         | ✓              | ✘            |
| 工單依赖关系        | ✓                                                  | ✘                                             | ✘         | ✘                                                                       | ✘         | ✘              | ✘            |
| 通過 Email 建立工單 | [✘](https://github.com/go-gitea/gitea/issues/6226) | [✘](https://github.com/gogs/gogs/issues/2602) | ✘         | ✓                                                                       | ✓         | ✓              | ✘            |
| 服务台              | [✘](https://github.com/go-gitea/gitea/issues/6219) | ✘                                             | ✘         | [✓](https://gitlab.com/groups/gitlab-org/-/epics/3103)                  | ✓         | ✘              | ✘            |

#### Pull/Merge requests

| 特性                                 | Gitea                                              | Gogs | GitHub EE | GitLab CE                                                                         | GitLab EE | BitBucket                                                                | RhodeCode CE |
| ------------------------------------ | -------------------------------------------------- | ---- | --------- | --------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------ | ------------ |
| Pull/Merge requests                  | ✓                                                  | ✓    | ✓         | ✓                                                                                 | ✓         | ✓                                                                        | ✓            |
| Squash merging                       | ✓                                                  | ✘    | ✓         | [✓](https://docs.gitlab.com/ce/user/project/merge_requests/squash_and_merge.html) | ✓         | ✓                                                                        | ✓            |
| Rebase merging                       | ✓                                                  | ✓    | ✓         | ✘                                                                                 | ⁄         | ✘                                                                        | ✓            |
| 评论 Pull/Merge request 中的某行代码 | ✓                                                  | ✘    | ✓         | ✓                                                                                 | ✓         | ✓                                                                        | ✓            |
| 指定 Pull/Merge request 的审核人     | ✓                                                  | ✘    | ⁄         | ✓                                                                                 | ✓         | ✓                                                                        | ✓            |
| 解决 Merge 冲突                      | [✘](https://github.com/go-gitea/gitea/issues/5158) | ✘    | ✓         | ✓                                                                                 | ✓         | ✓                                                                        | ✘            |
| 限制某些使用者的 push 和 merge 权限    | ✓                                                  | ✘    | ✓         | ⁄                                                                                 | ✓         | ✓                                                                        | ✓            |
| 回退某些 commits 或 merge request    | [✓](https://github.com/go-gitea/gitea/issues/5158) | ✘    | ✓         | ✓                                                                                 | ✓         | ✓                                                                        | ✘            |
| Pull/Merge requests 模板             | ✓                                                  | ✓    | ✓         | ✓                                                                                 | ✓         | ✘                                                                        | ✘            |
| 查看 Cherry-picking 的更改           | [✓](https://github.com/go-gitea/gitea/issues/5158) | ✘    | ✘         | ✓                                                                                 | ✓         | ✘                                                                        | ✘            |
| 下载 Patch                           | ✓                                                  | ✘    | ✓         | ✓                                                                                 | ✓         | [/](https://jira.atlassian.com/plugins/servlet/mobile#issue/BCLOUD-8323) | ✘            |
| Merge queues                         | ✘                                                  | ✘    | ✓         | ✘                                                                                 | ✓         | ✘                                                                        | ✘            |

#### 第三方集成

| 特性                       | Gitea                                              | Gogs                                          | GitHub EE | GitLab CE | GitLab EE | BitBucket | RhodeCode CE |
| -------------------------- | -------------------------------------------------- | --------------------------------------------- | --------- | --------- | --------- | --------- | ------------ |
| 支持 Webhook               | ✓                                                  | ✓                                             | ✓         | ✓         | ✓         | ✓         | ✓            |
| 自定义 Git 钩子            | ✓                                                  | ✓                                             | ✓         | ✓         | ✓         | ✓         | ✓            |
| 集成 AD / LDAP             | ✓                                                  | ✓                                             | ✓         | ✓         | ✓         | ✓         | ✓            |
| 支持多个 LDAP / AD 服务    | ✓                                                  | ✓                                             | ✘         | ✘         | ✓         | ✓         | ✓            |
| LDAP 使用者同步              | ✓                                                  | ✘                                             | ✓         | ✓         | ✓         | ✓         | ✓            |
| SAML 2.0 service provider  | [✘](https://github.com/go-gitea/gitea/issues/5512) | [✘](https://github.com/gogs/gogs/issues/1221) | ✓         | ✓         | ✓         | ✓         | ✘            |
| 支持 OpenId 连接           | ✓                                                  | ✘                                             | ✓         | ✓         | ✓         | ?         | ✘            |
| 集成 OAuth 2.0（外部授权） | ✓                                                  | ✘                                             | ⁄         | ✓         | ✓         | ?         | ✓            |
| 作為 OAuth 2.0 provider    | [✓](https://github.com/go-gitea/gitea/pull/5378)   | ✘                                             | ✓         | ✓         | ✓         | ✓         | ✘            |
| 二次驗證 (2FA)             | ✓                                                  | ✓                                             | ✓         | ✓         | ✓         | ✓         | ✘            |
| 集成 Mattermost/Slack      | ✓                                                  | ✓                                             | ⁄         | ✓         | ✓         | ⁄         | ✓            |
| 集成 Discord               | ✓                                                  | ✓                                             | ✓         | ✓         | ✓         | ✘         | ✘            |
| 集成 Microsoft Teams       | ✓                                                  | ✘                                             | ✓         | ✓         | ✓         | ✓         | ✘            |
| 显示外部 CI/CD 的状态      | ✓                                                  | ✘                                             | ✓         | ✓         | ✓         | ✓         | ✓            |

[gitea-caddy-plugin]: https://github.com/42wim/caddy-gitea
[gitea-pages-server]: https://codeberg.org/Codeberg/pages-server
