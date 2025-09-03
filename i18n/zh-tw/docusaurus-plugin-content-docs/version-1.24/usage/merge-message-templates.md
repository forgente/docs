---
date: "2023-05-23T09:00:00+08:00"
slug: "merge-message-templates"
sidebar_position: 15

aliases:
  - /zh-tw/merge-message-templates
---

# 合並消息模板

## 文件名

PR 默认合並消息模板可能的文件名：

- `.gitea/default_merge_message/MERGE_TEMPLATE.md`
- `.gitea/default_merge_message/REBASE_TEMPLATE.md`
- `.gitea/default_merge_message/REBASE-MERGE_TEMPLATE.md`
- `.gitea/default_merge_message/SQUASH_TEMPLATE.md`
- `.gitea/default_merge_message/MANUALLY-MERGED_TEMPLATE.md`
- `.gitea/default_merge_message/REBASE-UPDATE-ONLY_TEMPLATE.md`

## 变量

您可以在这些模板中使用以下以 `${}` 包围的变量，这些变量遵循 [os.Expand](https://pkg.go.dev/os#Expand) 语法：

- BaseRepoOwnerName：此合並請求的基础存放庫所有者名稱
- BaseRepoName：此合並請求的基础存放庫名稱
- BaseBranch：此合並請求的基础存放庫目标分支名稱
- HeadRepoOwnerName：此合並請求的源存放庫所有者名稱
- HeadRepoName：此合並請求的源存放庫名稱
- HeadBranch：此合並請求的源存放庫分支名稱
- PullRequestTitle：合並請求的标题
- PullRequestDescription：合並請求的描述
- PullRequestPosterName：合並請求的提交者名稱
- PullRequestIndex：合並請求的索引号
- PullRequestReference：合並請求的引用字符与索引号。例如，#1、!2
- ClosingIssues：返回一个包含将由此合並請求关闭的所有工單的字符串。例如 `close #1, close #2`
- ReviewedOn: 該提交所属的合並請求。例如： `Reviewed-on: https://gitea.com/foo/bar/pulls/1`
- ReviewedBy: 谁同意的此合並請求。例如： `Reviewed-by: Jane Doe <jane.doe@example.com>`

## 变基（Rebase）

在没有合並提交的情况下進行变基时，`REBASE_TEMPLATE.md` 修改最后一次提交的消息。此模板還提供以下附加变量：

- CommitTitle：提交的标题
- CommitBody：提交的正文文本
