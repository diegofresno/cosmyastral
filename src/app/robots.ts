import type { MetadataRoute } from 'next';

const SITE = 'https://cosmyastral.com';

const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'Amazonbot',
  'DuckAssistBot',
  'CCBot',
  'cohere-ai',
  'Meta-ExternalAgent', 'FacebookBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: '/' })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
