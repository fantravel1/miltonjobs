#!/usr/bin/env node
/**
 * Sitemap Generator for MiltonJobs.com
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://miltonjobs.com';
const today = new Date().toISOString().split('T')[0];

// Collect all pages
const urls = [];

// Homepage
urls.push({ loc: '/', changefreq: 'daily', priority: '1.0' });

// Job pages
const jobsDir = path.join(__dirname, 'jobs');
if (fs.existsSync(jobsDir)) {
  fs.readdirSync(jobsDir).filter(f => f.endsWith('.html')).forEach(f => {
    urls.push({ loc: `/jobs/${f}`, changefreq: 'weekly', priority: '0.8' });
  });
}

// Business pages
const bizDir = path.join(__dirname, 'businesses');
if (fs.existsSync(bizDir)) {
  fs.readdirSync(bizDir).filter(f => f.endsWith('.html')).forEach(f => {
    urls.push({ loc: `/businesses/${f}`, changefreq: 'monthly', priority: '0.6' });
  });
}

// Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap.xml with ${urls.length} URLs`);
