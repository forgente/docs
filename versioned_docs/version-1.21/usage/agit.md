---
date: "	2022-09-01T20:50:42+0000"
slug: "agit"
sidebar_position: 12
aliases:
  - /en-us/agit-setup
---

# AGit Setup

In Gitea `1.13`, support for [AGit](https://git-repo.info/en/2020/03/agit-flow-and-git-repo/) was added. AGit enables users to create pull requests directly, even without write permissions of the repository, eliminating the need to fork it. This helps reduce the number of duplicated repositories and minimizes unnecessary disk usage.

:::note
Git version 2.29 or higher is required on the server side for this to work.
:::

## Creating PRs with AGit

AGit allows to create PRs while pushing code to the remote repo.
This can be done by pushing to the branch followed by a specific refspec (a location identifier known to git).
The following example illustrates this:

```shell
git push origin HEAD:refs/for/main
```

The command has the following structure:

- `HEAD`: The target branch
- `refs/<for|draft|for-review>/<branch>`: The target PR type
  - `for`: Create a normal PR with `<branch>` as the target branch
  - `draft`/ `for-review`: Currently ignored silently
- `<branch>/<session>`: The target branch to open the PR
- `-o <topic|title|description>`: Options for the PR
  - `title`: The PR title
  - `topic`: The branch name the PR should be opened for
  - `description`: The PR description
  - `force-push`: confirm force update the target branch

Here's another advanced example for creating a new PR targeting `main` with `topic`, `title`, and `description`:

```shell
git push origin HEAD:refs/for/main -o topic="Topic of my PR" -o title="Title of the PR" -o description="# The PR Description\nThis can be **any** markdown content.\n- [x] Ok"
```
