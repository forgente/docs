---
date: "2026-07-19T00:00:00+00:00"
slug: "related-issues"
sidebar_position: 14
---

# Related issues

Related issues let you link two issues in the same repository that are relevant to each other, without any of the closing restrictions that issue dependencies impose. Marking an issue as related is purely informational: it doesn't block closing either issue.

## Adding a related issue

1. Open an issue and find the **Related Issues** section in the sidebar.
2. Enter the other issue's number (for example `#123` or `123`) in the input field and select the plus button.
3. The issue must exist in the same repository and can't be the current issue itself.

The relation is symmetric: adding it shows the link in both issues' **Related Issues** sections, and a timeline event is posted on each issue.

## Removing a related issue

Select the trash icon next to a related issue and confirm the removal. The relation is removed from both issues, and a timeline event is posted on each.

Adding and removing related issues requires write permission on issues in the repository.

:::note
Related issues are distinct from **Issue Dependencies**, which can block an issue from being closed until its dependencies are resolved. Use related issues for a lightweight, non-blocking cross-reference, and dependencies when closing order actually matters.
:::
