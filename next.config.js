/**
 *  @type {import('next').NextConfig}
 */
const withImages = require("next-images");
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = withImages({
  reactStrictMode: true,
  webpack5: false,
  esModule: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/verify-student/:path*',
        destination: `${process.env.URL}/verify-student/:path*`,
      },
    ];
  },
  async middleware() {
    const proxy = createProxyMiddleware('/verify-student', {
      target: `${process.env.URL}`,
      changeOrigin: true,
    });

    return {
      '/api': proxy,
    };
  },
});