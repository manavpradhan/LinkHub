/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    data: '@import "./components/style/themeToggle.css"',
    sourceMap: true,
  },
};

module.exports = nextConfig;
