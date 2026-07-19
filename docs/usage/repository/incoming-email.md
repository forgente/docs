---
date: "2022-12-01T00:00:00+00:00"
slug: "incoming-email"
sidebar_position: 130
aliases:
  - /en-us/incoming-email
  - /incoming-email
---

# Incoming Email

Gitea supports the execution of several actions through incoming mails. This page describes how to set this up.

## Requirements

Handling incoming email messages requires an IMAP-enabled email account.
The recommended strategy is to use [email sub-addressing](https://en.wikipedia.org/wiki/Email_address#Sub-addressing) but a catch-all mailbox does work too.
The receiving email address contains a user/action specific token which tells Gitea which action should be performed.
This token is expected in the `To` and `Delivered-To` header fields.

Gitea tries to detect automatic responses to skip and the email server should be configured to reduce the incoming noise too (spam, newsletter).

## Configuration

To activate the handling of incoming email messages you have to configure the `email.incoming` section in the configuration file.

The `REPLY_TO_ADDRESS` contains the address an email client will respond to.
This address needs to contain the `%{token}` placeholder which will be replaced with a token describing the user/action.
This placeholder must only appear once in the address and must be in the user part of the address (before the `@`).

An example using email sub-addressing may look like this: `incoming+%{token}@example.com`

If a catch-all mailbox is used, the placeholder may be used anywhere in the user part of the address: `incoming+%{token}@example.com`, `incoming_%{token}@example.com`, `%{token}@example.com`

## Creating issues by email

When incoming email is configured, Forgente lets you create an issue by sending an email, in addition to replying to existing issues and pull requests by email.

On a repository's issue list, users with issue-write permission see a **New issue via email** link. Selecting it opens a mail client addressed to a personal, tokenized address for that repository. Sending a message there creates an issue:

- The email subject becomes the issue title.
- The email body becomes the issue description.

The issue is created as the user the token belongs to, so keep the address private the same way you would a reply-by-email token. A blank subject is rejected and the issue is not created. Attachments on the email are not attached to the created issue.

The link only appears when `[email.incoming]` is enabled and the repository is not archived.

## Security

Be careful when choosing the domain used for receiving incoming email.
It's recommended receiving incoming email on a subdomain, such as `incoming.example.com` to prevent potential security problems with other services running on `example.com`.
