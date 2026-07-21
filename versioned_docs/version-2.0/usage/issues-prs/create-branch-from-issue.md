---
date: "2026-07-19T00:00:00+00:00"
slug: "create-branch-from-issue"
sidebar_position: 14
---

# Create a branch from an issue

Forgente can create a Git branch directly from an issue, so you don't have to switch to the repository's code tab and name the branch by hand.

## Creating the branch

1. Open an issue (not a pull request) in a repository where you have code-write permission.
2. In the sidebar, select **Create branch**.
3. The modal prefills the branch name as `{issue-number}-{slugified-title}`, for example `123-fix-crash-on-login`. Edit it if you want a different name.
4. Optionally choose a different **Base branch** from the dropdown; it defaults to the repository's default branch.
5. Select **OK** to create the branch.

The branch is created immediately, and a timeline event is posted on the issue recording who created it and from what name.

The **Create branch** button is hidden on pull requests, archived repositories, and empty repositories, and requires code-write permission on the repository.

## Branches created from an issue

Once one or more branches have been created this way, the sidebar lists them under the **Create branch** button, each linking to the branch. Only branches that still exist are listed — deleting a branch removes it from this list.
