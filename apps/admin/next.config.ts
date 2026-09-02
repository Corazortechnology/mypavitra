/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@puja/config", "@puja/types", "@puja/ui", "@puja/db"],
};

export default nextConfig;
