const defaultLocale = "en";
const locales = ["en", "fa"];

const fetchLocalizedPosts = async (locale) => {
  const res = await fetch(`${process.env.API_BASE_URL}/posts?locale=${locale}`);
  const posts = await res.json();

  return posts.map((post) => ({
    loc: `${locale === defaultLocale ? "" : `/${locale}`}/blog/${post.slug}`,
    lastmod: post.updatedAt,
    changefreq: "weekly",
    priority: 0.8,
  }));
};

module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  i18n: true,
  locales: locales,
  defaultLocale: defaultLocale,
  exclude: ["/api/*"],
  async additionalPaths() {
    let localizedPosts = [];

    // Fetch posts for each locale
    for (const locale of locales) {
      const postsForLocale = await fetchLocalizedPosts(locale);
      localizedPosts = localizedPosts.concat(postsForLocale);
    }

    return localizedPosts;
  },
};
