import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    WWW_GOOGLE_ANALYTICS_ID: process.env.WWW_GOOGLE_ANALYTICS_ID,
    SITE_URL: process.env.SITE_URL,
  },
};

export default withNextIntl(nextConfig);
