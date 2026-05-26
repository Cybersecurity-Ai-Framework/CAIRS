import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'data');
const apiDir = path.join(root, 'static', 'api');

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

async function main() {
  await mkdir(apiDir, { recursive: true });

  const standards = await readJson('standards.json');
  const cairs = await readJson('cairsExample.json');

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

  const rssItems = standards
    .map(
      (standard) => `    <item>
      <title>${escapeXml(`${standard.id} ${standard.title}`)}</title>
      <description>${escapeXml(standard.description)}</description>
      <guid>${escapeXml(standard.id)}</guid>
      <link>${escapeXml(standard.href)}</link>
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Cybersecurity AI Framework Standards</title>
    <description>Static RSS feed for CAIF standards and framework updates.</description>
    <link>/</link>
${rssItems}
  </channel>
</rss>
`;

  await writeFile(path.join(apiDir, 'rss.xml'), rss);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
