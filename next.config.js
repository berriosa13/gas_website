const withPWA = require('next-pwa');

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

module.exports = withPWA({
  pwa: { 
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV !== "development"
  },
  nextConfig
})
  
