import { MetadataRoute } from 'next'
// import { appInfo } from './config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // allow: '/',
      disallow: '/',
    },
    // sitemap: `https://${appInfo.domain}/sitemap.xml`,
  }
}
