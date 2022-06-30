/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['firebasestorage.googleapis.com'], },

  rewrites: async () => [
    {
      source: "/public/privacy_policy.html",
      destination: "/pages/api/privacyPolicyFile.js",
    },
  ],
  
}

module.exports = nextConfig
