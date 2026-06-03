---
id: bbp-vdp-feeds
title: BBP / VDP Program Feeds
sidebar_label: BBP / VDP Feeds
---

# BBP / VDP Program Feeds

CAIF publishes a community-reviewed feed of bug bounty programs, vulnerability disclosure programs, targets, reward ranges, platforms, and researcher opportunity signals.

The feed is intentionally static for the public MVP. The official repository remains the source of truth, and contributors propose updates through GitHub Issues or Pull Requests.

## Feed files

- `/api/bbp-vdp-programs.json`
- `/api/bbp-vdp-programs.rss.xml`
- `/api/programs.json`

## Contribution rules

- Only submit public program metadata.
- Do not include private source code, private targets, invite-only details, or credentials.
- Verify scope against the official program owner or platform before testing.
- Label programs as BBP or VDP and include whether a bounty is listed.
- Maintainers may reject entries that cannot be verified from public sources.

## Public access boundary

The feed supports public researcher awareness only. It does not grant access to private source code, private program intelligence, restricted targets, or paid platform data.

## Future automation

Future GitHub Actions can update the feed after maintainer review by syncing approved JSON data into the static API files during build.
