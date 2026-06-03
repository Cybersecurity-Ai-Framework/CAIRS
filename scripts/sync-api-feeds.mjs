import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'data');
const apiDir = path.join(root, 'static', 'api');
const repoOwner = process.env.GITHUB_REPOSITORY_OWNER || 'Cybersecurity-Ai-Framework';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'CAIRS';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const siteUrl = (process.env.SITE_URL || `https://${repoOwner.toLowerCase()}.github.io`).replace(/\/$/, '');
const baseUrl = process.env.BASE_URL || `/${repoName}/`;

async function readJson(fileName) {
  const file = await readFile(path.join(dataDir, fileName), 'utf8');
  return JSON.parse(file);
}

function apiEnvelope(kind, data) {
  return {
    framework: 'Cybersecurity AI Framework',
    shortName: 'CAIF',
    version: '1.0',
    kind,
    generatedAt: process.env.GITHUB_ACTIONS === 'true' ? new Date().toISOString() : 'local-static-build',
    data
  };
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function siteLink(href) {
  if (/^https?:\/\//.test(href)) return href;
  return `${siteUrl}${baseUrl}${href.replace(/^\//, '')}`;
}

async function main() {
  await mkdir(apiDir, { recursive: true });

  const standards = await readJson('standards.json');
  const cairs = await readJson('cairsExample.json');
  const caifCvss = await readJson('caifCvssMetrics.json');
  const programFeeds = await readJson('programFeeds.json');
  const programFeedsWithUrls = {
    ...programFeeds,
    programs: programFeeds.programs.map((program) => ({
      ...program,
      url: siteLink(program.href)
    }))
  };

  const weaknesses = [
    {
      id: 'CAIF-CWE-000',
      title: 'Weakness register placeholder',
      status: 'Open for community contribution',
      href: '/docs/weaknesses/introduction'
    }
  ];

  const findings = [
    {
      id: 'CAIF-FINDING-000',
      title: 'Finding register placeholder',
      status: 'Open for community contribution',
      href: '/docs/findings/introduction'
    }
  ];

  await writeFile(
    path.join(apiDir, 'standards.json'),
    `${JSON.stringify(apiEnvelope('standards', standards), null, 2)}\n`
  );
  await writeFile(
    path.join(apiDir, 'weaknesses.json'),
    `${JSON.stringify(apiEnvelope('weaknesses', weaknesses), null, 2)}\n`
  );
  await writeFile(
    path.join(apiDir, 'findings.json'),
    `${JSON.stringify(apiEnvelope('findings', findings), null, 2)}\n`
  );
  await writeFile(
    path.join(apiDir, 'cairs.json'),
    `${JSON.stringify(apiEnvelope('cairs-example', cairs), null, 2)}\n`
  );
  await writeFile(
    path.join(apiDir, 'caif-cvss.json'),
    `${JSON.stringify(apiEnvelope('caif-cvss-v1', caifCvss), null, 2)}\n`
  );
  await writeFile(
    path.join(apiDir, 'bbp-vdp-programs.json'),
    `${JSON.stringify(apiEnvelope('bbp-vdp-programs', programFeedsWithUrls), null, 2)}\n`
  );
  await writeFile(
    path.join(apiDir, 'programs.json'),
    `${JSON.stringify(apiEnvelope('programs', programFeedsWithUrls.programs), null, 2)}\n`
  );

  const rssItems = standards
    .map(
      (standard) => `    <item>
      <title>${escapeXml(`${standard.id} ${standard.title}`)}</title>
      <description>${escapeXml(standard.description)}</description>
      <guid>${escapeXml(standard.id)}</guid>
      <link>${escapeXml(siteLink(standard.href))}</link>
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Cybersecurity AI Framework Standards</title>
    <description>Static RSS feed for CAIF standards and framework updates.</description>
    <link>${escapeXml(siteLink('/'))}</link>
${rssItems}
  </channel>
</rss>
`;

  await writeFile(path.join(apiDir, 'rss.xml'), rss);

  const programRssItems = programFeedsWithUrls.programs
    .map(
      (program) => `    <item>
      <title>${escapeXml(`${program.programType} ${program.name}`)}</title>
      <description>${escapeXml(
        `${program.platform} | ${program.rewardRange} | Targets: ${program.targets.join(', ')} | ${program.status}`
      )}</description>
      <guid>${escapeXml(program.id)}</guid>
      <link>${escapeXml(program.url)}</link>
      <pubDate>${escapeXml(new Date(`${program.publishedDate}T00:00:00Z`).toUTCString())}</pubDate>
    </item>`
    )
    .join('\n');

  const programRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>CAIF BBP / VDP Program Feed</title>
    <description>Static RSS feed for community-reviewed bug bounty and vulnerability disclosure program metadata.</description>
    <link>${escapeXml(siteLink('/research-opportunities'))}</link>
${programRssItems}
  </channel>
</rss>
`;

  await writeFile(path.join(apiDir, 'bbp-vdp-programs.rss.xml'), programRss);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
