/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://omidshabab.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  exclude: [
    "/books/*",
    "/components/*",
    "/courses/*",
    "/podcasts/*",
    "/portfolio/*",
    "/subscription",
    "/about",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: [
          "/books/*",
          "/components/*",
          "/courses/*",
          "/podcasts/*",
          "/portfolio/*",
          "/subscription",
          "/about",
        ],
      },
    ],
  },
};

module.exports = config;
