export async function GET() {
  const baseUrl = "https://www.prepnerdz.tech";

  // Static pages
  const staticRoutes = [
    "about",
    // "change-contact",
    // "change-username",
    "contact-us",
    "contributors",
    "dashboard",
    "leaderboard",
    "mybookmarks",
    "privacy-policy",
    "terms-and-conditions",
    "testimonials",
    "forgot-password",
    // "upload-avatar",
  ];

  const staticUrls = staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}/${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
