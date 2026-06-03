---
title: API and Feeds
sidebar_label: API / Feeds
---

# API and Feeds

CAIF uses static API-style files so the public website can stay lightweight and GitHub Pages-ready while still supporting integrations.

Current MVP feeds:

- `/api/standards.json`
- `/api/weaknesses.json`
- `/api/findings.json`
- `/api/cairs.json`
- `/api/caif-cvss.json`
- `/api/bbp-vdp-programs.json`
- `/api/bbp-vdp-programs.rss.xml`
- `/api/programs.json`
- `/api/rss.xml`

These files are generated during build from repository data files where possible. Future GitHub Actions can update them after approved Pull Requests land.

## No backend required

The MVP does not require a database, serverless function, paid search service, or private API. The official repository is the system of record.
