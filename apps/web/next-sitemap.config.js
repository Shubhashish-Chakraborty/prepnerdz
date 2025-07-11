/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://prepnerdz.tech', // final domain
    generateRobotsTxt: true,           // Important for SEO!
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    generateIndexSitemap: true,
    exclude: ['/admin'],               // Optional
};
