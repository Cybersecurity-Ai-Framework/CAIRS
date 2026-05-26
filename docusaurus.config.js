const repoOwner = process.env.GITHUB_REPOSITORY_OWNER || 'Cybersecurity-Ai-Framework';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'CAIRS';
const repoUrl = process.env.GITHUB_REPOSITORY
  ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
  : 'https://github.com/Cybersecurity-Ai-Framework/CAIRS';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cybersecurity AI Framework',
  tagline: 'The open standard for AI-powered cybersecurity validation and intelligence.',
  favicon: 'img/caif-shield.svg',
  url: process.env.SITE_URL || `https://${repoOwner}.github.io`,
  baseUrl: process.env.BASE_URL || (isGitHubActions ? `/${repoName}/` : '/'),
  organizationName: repoOwner,
  projectName: repoName,
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          editUrl: `${repoUrl}/edit/main/`
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      }
    ]
  ],
  themeConfig: {
    image: 'img/caif-social-card.svg',
    metadata: [
      {
        name: 'keywords',
        content:
          'CAIF, Cybersecurity AI Framework, AI security, vulnerability validation, risk scoring, proof of exploitability, appsec standard'
      }
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false
    },
    navbar: {
      hideOnScroll: false,
      title: 'Cybersecurity AI Framework',
      logo: {
        alt: 'Cybersecurity AI Framework shield logo',
        src: 'img/caif-shield.svg'
      },
      items: [
        {
          type: 'html',
          position: 'left',
          value: '<span class="navbar-version">v1.0</span>'
        },
        { to: '/', label: 'Home', position: 'left', exact: true },
        { to: '/docs/framework/introduction', label: 'Framework', position: 'left' },
        { to: '/docs/standards/caf-ai-001', label: 'Standards', position: 'left' },
        { to: '/docs/scoring/cairs-v1', label: 'AI Rating', position: 'left' },
        { to: '/docs/scoring/calculator', label: 'Calculator', position: 'left' },
        { to: '/docs/weaknesses/introduction', label: 'CWE', position: 'left' },
        { to: '/docs/findings/introduction', label: 'CVE / Findings', position: 'left' },
        { to: '/docs/framework/api-feeds', label: 'API / Feeds', position: 'left' },
        { to: '/docs/governance/community-model', label: 'Governance', position: 'left' },
        { href: repoUrl, label: 'GitHub', position: 'left' },
        {
          type: 'html',
          position: 'right',
          value:
            '<button class="navbar-search-placeholder" type="button" aria-label="Search"></button>'
        },
        {
          type: 'html',
          position: 'right',
          value: `<a class="navbar-community-cta" href="${repoUrl}/discussions">Join the Community</a>`
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Framework',
          items: [
            { label: 'Framework', to: '/docs/framework/introduction' },
            { label: 'Standards', to: '/docs/standards/caf-ai-001' },
            { label: 'CAIRS v1.0', to: '/docs/scoring/cairs-v1' },
            { label: 'API / Feeds', to: '/docs/framework/api-feeds' }
          ]
        },
        {
          title: 'Community',
          items: [
            { label: 'Governance', to: '/docs/governance/community-model' },
            { label: 'Contributors', to: '/docs/contributors/how-to-contribute' },
            { label: 'Become an Author', to: '/docs/contributors/become-an-author' },
            { label: 'GitHub Discussions', href: `${repoUrl}/discussions` }
          ]
        },
        {
          title: 'Registers',
          items: [
            { label: 'Weaknesses', to: '/docs/weaknesses/introduction' },
            { label: 'Findings', to: '/docs/findings/introduction' },
            { label: 'License', href: `${repoUrl}/blob/main/LICENSE` },
            { label: 'Contact', href: `${repoUrl}/issues/new/choose` }
          ]
        }
      ],
      copyright: `Cybersecurity AI Framework. Powered by Cyber Development. Open Source Community Standard.`
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula
    }
  }
};

module.exports = config;
