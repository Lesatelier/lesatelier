/** @type {import('next').NextConfig} */
const nextConfig = {
  // serverExternalPackages replaces experimental.serverComponentsExternalPackages in Next 15+
  serverExternalPackages: ['docx', 'pptxgenjs', 'jszip'],
};

module.exports = nextConfig;
