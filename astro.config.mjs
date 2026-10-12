// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.graphowl.app',
  integrations: [
    starlight({
      title: 'GraphOWL',
      description: 'Documentation for GraphOWL, the knowledge graph engine.',
      logo: { light: './public/brand/logo-light.svg', dark: './public/brand/logo-dark.svg', replacesTitle: true },
      favicon: '/favicon.png',
      customCss: ['./src/styles/brand.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/graphowl/graphowl' }],
      editLink: { baseUrl: 'https://github.com/graphowl/docs/edit/main/' },
      lastUpdated: true,
      sidebar: [
        { label: 'Start here', items: [
          { label: 'What is GraphOWL', slug: 'start/what-is-graphowl' },
          { label: 'Quickstart', slug: 'start/quickstart' },
          { label: 'Concepts in ten minutes', slug: 'start/concepts' },
          { label: 'Glossary', slug: 'start/glossary' },
          { label: 'FAQ', slug: 'start/faq' },
        ] },
        { label: 'Guides', items: [
          { label: 'From a database to an ontology', slug: 'guides/database-to-ontology' },
          { label: 'Load data', slug: 'guides/load-data' },
          { label: 'Query with SPARQL', slug: 'guides/query-sparql' },
          { label: 'Query with Cypher', slug: 'guides/query-cypher' },
          { label: 'Search', slug: 'guides/search' },
          { label: 'Time travel', slug: 'guides/time-travel' },
          { label: 'Reason and validate', slug: 'guides/reasoning-and-validation' },
          { label: 'Virtual graphs', slug: 'guides/virtual-graphs' },
          { label: 'Workspaces and packs', slug: 'guides/workspaces-and-packs' },
          { label: 'Export your data', slug: 'guides/export' },
        ] },
        { label: 'Cookbooks', items: [
          { label: 'Overview', slug: 'cookbooks' },
          { label: 'Dairy traceability', slug: 'cookbooks/dairy-traceability' },
          { label: 'A data catalog', slug: 'cookbooks/data-catalog' },
          { label: 'Rules and compliance', slug: 'cookbooks/compliance-rules' },
          { label: 'Agent memory', slug: 'cookbooks/agent-memory' },
        ] },
        { label: 'AI and agents', items: [
          { label: 'MCP overview', slug: 'ai/mcp-overview' },
          { label: 'Connect a client', slug: 'ai/connect-a-client' },
          { label: 'Tools by family', slug: 'ai/tool-families' },
          { label: 'Tool reference', slug: 'ai/mcp-tools' },
          { label: 'Agent patterns', slug: 'ai/patterns' },
        ] },
        { label: 'API', items: [
          { label: 'Overview', slug: 'api/overview' },
          { label: 'Errors', slug: 'api/errors' },
          { label: 'Reference', slug: 'api/reference' },
        ] },
        { label: 'Client libraries', slug: 'sdks' },
        { label: 'Operators', items: [
          { label: 'Run it yourself', slug: 'operators/deploy' },
          { label: 'Run it on', slug: 'operators/platforms' },
          { label: 'Configuration', slug: 'operators/configuration' },
          { label: 'Authentication', slug: 'operators/authentication' },
          { label: 'Security model', slug: 'operators/security-model' },
          { label: 'Backup and restore', slug: 'operators/backup-restore' },
          { label: 'Observability', slug: 'operators/observability' },
          { label: 'Upgrades', slug: 'operators/upgrades' },
        ] },
        { label: 'Reference', items: [
          { label: 'Standards', slug: 'reference/standards' },
          { label: 'Formats', slug: 'reference/formats' },
          { label: 'Known limits', slug: 'reference/limits' },
        ] },
        { label: 'Project', items: [
          { label: 'Changelog', slug: 'project/changelog' },
          { label: 'Licences', slug: 'project/licences' },
          { label: 'Security', slug: 'project/security' },
        ] },
      ],
    }),
  ],
});
