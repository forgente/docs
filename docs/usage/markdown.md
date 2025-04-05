---
date: "2025-04-05T00:00:00+08:00"
slug: "markdown"
---

# Markdown rendering

Gitea supports most of GitHub markdown features:

- [Basic formatting](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Advanced formatting](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting)

## Rendering options

Some Gitea's markdown rendering behaviors could be fine-tuned by global config options, see the `[markdown]` config section in the `app.example.ini`

## Link path resolving

When rendering links for `<a href>`, `<img src>` and `<video src>`, Gitea resolves the link paths in the rendering context.

- If the link is an absolute path with scheme, the link is kept as-is.
- If the link is an URL path, it is resolved with the base path of current rendering context.
  - In a comment-like context (issues, pull-requests, commit message), the base path is current repository's home link: `/owner-name/repo-name`.
  - In a repository file context (markdown files in the repository), the base path is current git ref path.

To make users easier to resolve a link to the Gitea instance's root path, Gitea has a special `/:root` path syntax. 

For example, when rendering a markdown file in `/owner-name/repo-name/src/branch/main/dir`:
  - Link `sub/file`is resolved to `/owner-name/repo-name/src/branch/main/dir/sub/file`
  - Link `/sub/file`is resolved to `/owner-name/repo-name/src/branch/main/sub/file`
  - If the link is used as `src` of an image or video, then it is resolved to `/owner-name/repo-name/raw/...`
  - Link `/:root/any-path` is always resolved to `/any-path` without any further processing.

Gitea also supports GitHub's `?raw=1` query parameter, a request to `/owner-name/repo-name/src/branch/main/file?raw=1` will be redirected to `/owner-name/repo-name/raw/branch/main/file` to make browsers able to load the raw content of the file.

## Issue and pull-request reference

Using issue/pull-request numbers in a list:

```
* #123
* #456
```

It will be rendered with issue titles to:

```
* the issue title (#123)
* the other issue title (#456)
```

## Math expressions

Gitea supports GitHub-like math expression formatting.

### Inline expression

  - ``` $\alpha$ ```: quoted by single-dollar `$`
  - ``` $$\alpha$$ ```: quoted by double-dollar `$$`
  - ``` $`\alpha`$ ```: quoted by dollar with backquotes, the backquotes could repeat like normal code blocks.

### Block expression

Using `$$`:

````
$$
\alpha
$$
````

Using code-block with language:

````
```math
\alpha
```
````
