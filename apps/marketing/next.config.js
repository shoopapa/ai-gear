/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/privacy",
        destination: "/privacy.html",
      },
    ];
  },
};

module.exports = nextConfig;
