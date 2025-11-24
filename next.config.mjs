/** @type {import('next').NextConfig} */ 
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Optimize for Vercel deployment
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure static assets are properly cached
  async headers() {
    return [
      {
        source: '/Banque d_images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
