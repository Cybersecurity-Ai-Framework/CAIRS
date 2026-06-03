---
id: caif-cvss-v1
title: CAIF-CVSS v1.0
sidebar_label: CAIF-CVSS v1.0
---

# CAIF-CVSS v1.0

CAIF-CVSS is the Cybersecurity AI Framework scoring profile for AI-assisted vulnerability validation and prioritization.

It is inspired by the structure of FIRST CVSS v4.0, including base exploitability, attack requirements, vulnerable system impact, subsequent system impact, threat maturity, and environmental context. CAIF-CVSS adds CAIF-owned dimensions for AI exploit acceleration, evidence quality, exposure, and business impact.

CAIF-CVSS is not a replacement for the official FIRST CVSS calculator. Use official CVSS for vendor severity and CAIF-CVSS for community validation, proof quality, and prioritization context.

## Metric groups

### Base exploitability

- Attack Vector
- Attack Complexity
- Attack Requirements
- Privileges Required
- User Interaction

### System impact

- Vulnerable System Confidentiality
- Vulnerable System Integrity
- Vulnerable System Availability
- Subsequent System Confidentiality
- Subsequent System Integrity
- Subsequent System Availability

### AI and evidence intelligence

- Exploit Maturity
- AI Exploit Acceleration
- Evidence Quality

### Exposure and business context

- Exposure
- Business Impact
- Safety / Human Impact

## Vector format

CAIF-CVSS vectors use a CAIF namespace so they are not confused with official CVSS vectors:

```text
CAIF-CVSS:1.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:L/SC:L/SI:L/SA:N/E:P/AIX:H/EQ:C/EX:E/BI:H/SF:N
```

## Calculator

The interactive calculator is available at `/calculator`.

The MVP scoring formula is intentionally transparent and lightweight. It is expected to change through community review before CAIF-CVSS becomes a stable standard.
