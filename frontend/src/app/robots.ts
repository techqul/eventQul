import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/dashboard', '/checkout', '/success'],
      },
    ],
    sitemap: 'https://eventqul.com/sitemap.xml',
    host: 'https://eventqul.com',
  };
}
