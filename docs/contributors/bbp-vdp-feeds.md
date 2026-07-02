---
title: BBP / VDP Program Feeds
sidebar_label: BBP / VDP Feeds
---

# BBP / VDP Program Feeds

CAIF publishes a community-reviewed feed of bug bounty programs, vulnerability disclosure programs, targets, reward ranges, platforms, and researcher opportunity signals.

The feed is intentionally static for the public MVP. The official repository remains the source of truth, and contributors propose updates through GitHub Issues or Pull Requests.

The website reads the published JSON feed at runtime and refreshes it while the Research Opportunities page is open. GitHub Pages can also rebuild the feed on a schedule, so updates merged into the official repository become visible without adding a backend or database.

## Feed files

- `/api/bbp-vdp-programs.json`
- `/api/bbp-vdp-programs.rss.xml`
- `/api/programs.json`

Each program record should include both an internal CAIF details link and an official public program URL. The official URL is used for researcher deeplinks and must point to the program owner, platform, or verified disclosure page.

## Contribution rules

- Only submit public program metadata.
- Do not include private source code, private targets, invite-only details, or credentials.
- Verify scope against the official program owner or platform before testing.
- Label programs as BBP or VDP and include whether a bounty is listed.
- Include the public program URL so researchers can open the official scope and rules from the feed.
- Maintainers may reject entries that cannot be verified from public sources.

## Public access boundary

The feed supports public researcher awareness only. It does not grant access to private source code, private program intelligence, restricted targets, or paid platform data.

## Research opportunities

The public program list is available on the Research Opportunities page.
