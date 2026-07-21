---
date: "2026-07-19T00:00:00+00:00"
slug: "global-issue-search"
sidebar_position: 14
---

# Global issue search

Forgente's global issue search, at `/explore/issues`, searches issues and pull requests across every public repository on the instance. It's the instance-wide counterpart to the per-repository issue search and to the signed-in dashboard's issue list, which only covers repositories you're a member of.

## Using the search

1. Go to **Explore → Issues**.
2. Use the **Issues** / **Pull Requests** toggle to switch what you're searching.
3. Use the **Open** / **Closed** filter to narrow by state.
4. Enter keywords in the search box to match against issue and pull request content.

Results only include issues and pull requests from public repositories; private and limited-visibility repositories never appear here regardless of who is searching.

## Access

The page is available to anonymous visitors by default. If the instance administrator has enabled `REQUIRE_SIGNIN_VIEW` in `app.ini`, visitors must sign in first, the same as for every other page.
