/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Framework',
      collapsed: false,
      items: ['framework/introduction', 'framework/api-feeds']
    },
    {
      type: 'category',
      label: 'Standards',
      collapsed: false,
      items: [
        'standards/caf-ai-001',
        'standards/caf-ai-002',
        'standards/caf-ai-003',
        'standards/caf-ai-004',
        'standards/caf-ai-005',
        'standards/caf-ai-006',
        'standards/caf-ai-007'
      ]
    },
    {
      type: 'category',
      label: 'Scoring',
      collapsed: false,
      items: ['scoring/cairs-v1', 'scoring/calculator']
    },
    {
      type: 'category',
      label: 'Registers',
      collapsed: false,
      items: ['weaknesses/introduction', 'findings/introduction']
    },
    {
      type: 'category',
      label: 'Governance',
      collapsed: false,
      items: ['governance/community-model']
    },
    {
      type: 'category',
      label: 'Contributors',
      collapsed: false,
      items: ['contributors/how-to-contribute', 'contributors/become-an-author']
    }
  ]
};

module.exports = sidebars;
