const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    runtimeCaching
  },
  reactStrictMode: true,
    images: { domains: ['firebasestorage.googleapis.com', 'via.placeholder.com'], },
  
    rewrites: async () => [
      {
        source: "/public/privacy_policy.html",
        destination: "/pages/api/privacyPolicyFile.js",
      },
    ],

});

module.exports = nextConfig;