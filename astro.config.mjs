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
        ] },
        { label: 'Guides', items: [
          { label: 'From a database to an ontology', slug: 'guides/database-to-ontology' },
          { label: 'Query with SPARQL', slug: 'guides/query-sparql' },
          { label: 'Query with Cypher', slug: 'guides/query-cypher' },
          { label: 'Time travel', slug: 'guides/time-travel' },
        ] },
        { label: 'AI and agents', items: [
          { label: 'MCP overview', slug: 'ai/mcp-overview' },
          { label: 'Connect a client', slug: 'ai/connect-a-client' },
          { label: 'Tool reference', slug: 'ai/mcp-tools' },
          { label: 'Agent patterns', slug: 'ai/patterns' },
        ] },
        { label: 'API', items: [
          { label: 'Overview', slug: 'api/overview' },
          { label: 'Reference', slug: 'api/reference' },
        ] },
        { label: 'Client libraries', slug: 'sdks' },
        { label: 'Operators', items: [
          { label: 'Run it yourself', slug: 'operators/deploy' },
          { label: 'Authentication', slug: 'operators/authentication' },
        ] },
        { label: 'Reference', items: [
          { label: 'Standards', slug: 'reference/standards' },
          { label: 'Known limits', slug: 'reference/limits' },
        ] },
        { label: 'Project', items: [
          { label: 'Licences', slug: 'project/licences' },
          { label: 'Security', slug: 'project/security' },
        ] },
      ],
    }),
  ],
});
