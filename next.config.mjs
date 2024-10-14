import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true
  },
  // temporary. Because of Deno runtime and next-on-pages depends on Vercel build
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true
    }
    return config
  }
}

export default withNextIntl(nextConfig)
