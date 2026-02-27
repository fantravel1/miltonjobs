#!/usr/bin/env node
/**
 * Business Detail Page Generator for MiltonJobs.com
 * Generates individual, fully SEO/AEO-optimized HTML pages for each business
 */

const fs = require('fs');
const path = require('path');

const bizDir = path.join(__dirname, 'businesses');
if (!fs.existsSync(bizDir)) fs.mkdirSync(bizDir, { recursive: true });

const dataPath = path.join(__dirname, 'data', 'businesses.json');
if (!fs.existsSync(dataPath)) {
  console.error('businesses.json not found. Run data collection first.');
  process.exit(1);
}

const businesses = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// ─── Schema.org type mapping by category ───
const schemaTypeMap = {
  'Restaurant': 'Restaurant',
  'Fast Food': 'FastFoodRestaurant',
  'Pizza': 'Restaurant',
  'Coffee Shop': 'CafeOrCoffeeShop',
  'Cafe': 'CafeOrCoffeeShop',
  'Bakery': 'Bakery',
  'Bar & Pub': 'BarOrPub',
  'Grocery Store': 'GroceryStore',
  'Pharmacy': 'Pharmacy',
  'Bank': 'BankOrCreditUnion',
  'Dentist': 'Dentist',
  'Doctor': 'Physician',
  'Medical Clinic': 'MedicalClinic',
  'Walk-in Clinic': 'MedicalClinic',
  'Chiropractor': 'Chiropractor',
  'Physiotherapy': 'PhysicalTherapy',
  'Optometrist': 'Optician',
  'Hospital': 'Hospital',
  'Veterinarian': 'VeterinaryCare',
  'Hair Salon': 'HairSalon',
  'Barber Shop': 'BarberShop',
  'Gym': 'ExerciseGym',
  'Fitness': 'ExerciseGym',
  'Yoga': 'ExerciseGym',
  'Martial Arts': 'ExerciseGym',
  'Auto Repair': 'AutoRepair',
  'Auto Dealership': 'AutoDealer',
  'Real Estate': 'RealEstateAgent',
  'School': 'School',
  'Church': 'Church',
  'Mosque': 'Mosque',
  'Gurdwara': 'PlaceOfWorship',
  'Temple': 'HinduTemple',
  'Hotel': 'Hotel',
  'Daycare': 'ChildCare',
  'Library': 'Library',
  'Community Centre': 'CommunityCenter',
  'Insurance': 'InsuranceAgency',
  'Accounting': 'AccountingService',
  'Law Office': 'LegalService',
  'Home Improvement': 'HomeAndConstructionBusiness',
  'Construction': 'HomeAndConstructionBusiness',
  'Warehouse': 'Warehouse',
  'Tutoring': 'EducationalOrganization',
  'Government': 'GovernmentOffice',
  'Retail': 'Store',
  'Pet Store': 'PetStore'
};

const categoryIcons = {
  'Restaurant': '&#127869;', 'Fast Food': '&#127828;', 'Pizza': '&#127829;',
  'Coffee Shop': '&#9749;', 'Cafe': '&#9749;', 'Bakery': '&#127856;',
  'Bar & Pub': '&#127866;', 'Grocery Store': '&#128722;', 'Pharmacy': '&#128138;',
  'Bank': '&#127974;', 'Dentist': '&#129463;', 'Doctor': '&#129658;',
  'Medical Clinic': '&#127973;', 'Hair Salon': '&#128135;', 'Barber Shop': '&#128136;',
  'Gym': '&#127947;', 'Fitness': '&#127947;', 'Yoga': '&#129496;',
  'Auto Repair': '&#128295;', 'Auto Dealership': '&#128663;',
  'Real Estate': '&#127968;', 'Law Office': '&#9878;', 'School': '&#127979;',
  'Church': '&#9962;', 'Hotel': '&#127976;', 'Daycare': '&#128118;',
  'Veterinarian': '&#128054;', 'Construction': '&#127959;',
  'Warehouse': '&#128230;', 'Library': '&#128218;', 'Community Centre': '&#127963;',
  'Insurance': '&#128196;', 'Accounting': '&#128202;', 'Hospital': '&#127973;',
  'Chiropractor': '&#129486;', 'Optometrist': '&#128083;',
  'Mosque': '&#128332;', 'Gurdwara': '&#128332;', 'Temple': '&#128332;',
  'Martial Arts': '&#129354;', 'Tutoring': '&#128218;',
  'Government': '&#127963;', 'Retail': '&#128717;', 'Home Improvement': '&#128296;',
  'default': '&#128188;'
};

// ─── FAQ templates by category ───
const categoryFAQs = {
  'Restaurant': (biz) => [
    { q: `What type of cuisine does ${biz.name} serve?`, a: `${biz.name} serves ${biz.cuisine || 'a variety of'} cuisine in ${biz.neighborhood || 'Milton'}, Ontario. ${biz.description || ''}` },
    { q: `Where is ${biz.name} located in Milton?`, a: `${biz.name} is located at ${biz.address || 'Milton, Ontario'}. It is situated in the ${biz.neighborhood || 'Milton'} area of town.` },
    { q: `Does ${biz.name} offer takeout or delivery?`, a: `For the most current information about takeout, delivery, and dine-in options at ${biz.name}, please contact them directly${biz.phone ? ' at ' + biz.phone : ''}${biz.website ? ' or visit their website' : ''}.` },
    { q: `What is the rating for ${biz.name}?`, a: biz.rating ? `${biz.name} has a rating of ${biz.rating} out of 5 stars based on customer reviews.` : `Visit ${biz.name} in Milton and leave your own review. Contact them for current hours and menu options.` }
  ],
  'Coffee Shop': (biz) => [
    { q: `Where is ${biz.name} located in Milton?`, a: `${biz.name} is located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `Does ${biz.name} have a drive-thru?`, a: `For drive-thru availability and current hours at ${biz.name}, please visit the location at ${biz.address || 'Milton, ON'}${biz.phone ? ' or call ' + biz.phone : ''}.` },
    { q: `What does ${biz.name} serve?`, a: `${biz.description || biz.name + ' is a coffee shop in Milton, Ontario serving coffee, tea, and light fare.'}` }
  ],
  'Dentist': (biz) => [
    { q: `Where is ${biz.name} located?`, a: `${biz.name} is a dental clinic located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} neighbourhood.` },
    { q: `How do I book an appointment at ${biz.name}?`, a: `To book a dental appointment at ${biz.name}, ${biz.phone ? 'call ' + biz.phone : 'contact the office directly'}${biz.website ? ' or visit ' + biz.website : ''}.` },
    { q: `What dental services does ${biz.name} offer?`, a: `${biz.description || biz.name + ' offers general and family dentistry services in Milton, Ontario.'} Contact them for details about specific treatments.` },
    { q: `Is ${biz.name} accepting new patients?`, a: `To find out if ${biz.name} is currently accepting new patients, please contact their office${biz.phone ? ' at ' + biz.phone : ' directly'}.` }
  ],
  'Bank': (biz) => [
    { q: `Where is the ${biz.name} branch located?`, a: `The ${biz.name} branch is located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `What services does ${biz.name} offer?`, a: `${biz.description || biz.name + ' offers personal and business banking, mortgages, investments, and financial planning services.'} Visit the branch for more details.` },
    { q: `What are the hours for ${biz.name}?`, a: `For current branch hours at ${biz.name}, ${biz.phone ? 'call ' + biz.phone + ' or ' : ''}${biz.website ? 'visit ' + biz.website : 'visit the branch directly'}.` }
  ],
  'Gym': (biz) => [
    { q: `Where is ${biz.name} located in Milton?`, a: `${biz.name} is located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `What does a membership at ${biz.name} include?`, a: `${biz.description || biz.name + ' offers fitness facilities and programs in Milton.'} Contact them for current membership options and pricing.` },
    { q: `Does ${biz.name} offer personal training?`, a: `For information about personal training, group classes, and other programs at ${biz.name}, please contact them directly${biz.phone ? ' at ' + biz.phone : ''}.` }
  ],
  'Hair Salon': (biz) => [
    { q: `Where is ${biz.name} located?`, a: `${biz.name} is a hair salon located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} neighbourhood.` },
    { q: `How do I book an appointment at ${biz.name}?`, a: `To book a hair appointment at ${biz.name}, ${biz.phone ? 'call ' + biz.phone : 'contact the salon directly'}${biz.website ? ' or visit ' + biz.website : ''}.` },
    { q: `What services does ${biz.name} offer?`, a: `${biz.description || biz.name + ' offers haircuts, colouring, styling, and other salon services in Milton, Ontario.'}` }
  ],
  'Auto Repair': (biz) => [
    { q: `Where is ${biz.name} located in Milton?`, a: `${biz.name} is an auto repair shop located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `What auto services does ${biz.name} provide?`, a: `${biz.description || biz.name + ' provides auto repair, maintenance, and diagnostic services in Milton, Ontario.'} Contact them for quotes and booking.` },
    { q: `How do I book a service at ${biz.name}?`, a: `To book auto service at ${biz.name}, ${biz.phone ? 'call ' + biz.phone : 'visit the shop directly'}${biz.website ? ' or visit ' + biz.website : ''}.` }
  ],
  'Pharmacy': (biz) => [
    { q: `Where is ${biz.name} located?`, a: `${biz.name} is a pharmacy located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `What services does ${biz.name} offer?`, a: `${biz.description || biz.name + ' offers prescription services, over-the-counter medications, and health consultations in Milton, Ontario.'}` },
    { q: `Does ${biz.name} offer flu shots or vaccinations?`, a: `For information about immunization and vaccination services at ${biz.name}, please contact the pharmacy${biz.phone ? ' at ' + biz.phone : ''}.` }
  ],
  'School': (biz) => [
    { q: `Where is ${biz.name} located?`, a: `${biz.name} is located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `What grades does ${biz.name} serve?`, a: `${biz.description || biz.name + ' is an educational institution in Milton, Ontario.'} Contact the school office for enrollment and program details.` }
  ],
  'Church': (biz) => [
    { q: `Where is ${biz.name} located?`, a: `${biz.name} is located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `What are the service times at ${biz.name}?`, a: `For current service times and schedules at ${biz.name}, please ${biz.phone ? 'call ' + biz.phone + ' or ' : ''}${biz.website ? 'visit ' + biz.website : 'contact the office directly'}.` }
  ],
  'Grocery Store': (biz) => [
    { q: `Where is ${biz.name} located in Milton?`, a: `${biz.name} is a grocery store located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `What does ${biz.name} carry?`, a: `${biz.description || biz.name + ' is a grocery store offering fresh produce, meats, dairy, and household essentials in Milton, Ontario.'}` },
    { q: `What are the hours for ${biz.name}?`, a: `For current store hours at ${biz.name}, please ${biz.phone ? 'call ' + biz.phone + ' or ' : ''}visit the store at ${biz.address || 'Milton, ON'}.` }
  ],
  'Real Estate': (biz) => [
    { q: `Where is ${biz.name} located?`, a: `${biz.name} is a real estate office located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area.` },
    { q: `What real estate services does ${biz.name} offer?`, a: `${biz.description || biz.name + ' provides real estate services including buying, selling, and property management in Milton and the Halton Region.'}` }
  ]
};

// Fallback FAQ for any category
function getDefaultFAQs(biz) {
  return [
    { q: `Where is ${biz.name} located in Milton?`, a: `${biz.name} is located at ${biz.address || 'Milton, Ontario'} in the ${biz.neighborhood || 'Milton'} area of town.` },
    { q: `How do I contact ${biz.name}?`, a: `You can contact ${biz.name}${biz.phone ? ' by phone at ' + biz.phone : ''}${biz.website ? ' or visit their website at ' + biz.website : ''}. The business is located at ${biz.address || 'Milton, Ontario'}.` },
    { q: `What does ${biz.name} offer?`, a: `${biz.description || biz.name + ' is a ' + biz.category + ' business serving the Milton, Ontario community.'}` }
  ];
}

function getIcon(cat) {
  if (!cat) return categoryIcons['default'];
  if (categoryIcons[cat]) return categoryIcons[cat];
  const key = Object.keys(categoryIcons).find(k => cat.toLowerCase().includes(k.toLowerCase()));
  return key ? categoryIcons[key] : categoryIcons['default'];
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeJsonString(str) {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
}

// Get related businesses (same category or neighborhood)
function getRelatedBusinesses(biz, allBiz) {
  const sameCategory = allBiz
    .filter(b => b.id !== biz.id && b.category === biz.category)
    .slice(0, 4);
  const sameNeighborhood = allBiz
    .filter(b => b.id !== biz.id && b.neighborhood === biz.neighborhood && b.category !== biz.category)
    .slice(0, 4);
  return { sameCategory, sameNeighborhood };
}

function generateBusinessPage(biz, allBiz) {
  const icon = getIcon(biz.category);
  const slug = slugify(biz.name);
  const schemaType = schemaTypeMap[biz.category] || 'LocalBusiness';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.name + ' ' + (biz.address || 'Milton ON'))}`;
  const { sameCategory, sameNeighborhood } = getRelatedBusinesses(biz, allBiz);

  // Build FAQs
  const faqGenerator = categoryFAQs[biz.category];
  const faqs = faqGenerator ? faqGenerator(biz) : getDefaultFAQs(biz);

  // Build comprehensive meta description
  const metaDesc = `${biz.name} is a ${biz.category.toLowerCase()}${biz.cuisine ? ' (' + biz.cuisine + ')' : ''} in ${biz.neighborhood || 'Milton'}, Ontario. ${biz.description || ''} Find address, phone number, hours, reviews & directions.`.slice(0, 320);

  // Build AEO-optimized intro paragraph
  const aeoIntro = biz.cuisine
    ? `${biz.name} is a ${biz.cuisine.toLowerCase()} ${biz.category.toLowerCase()} located in ${biz.neighborhood || 'Milton'}, Ontario, Canada. ${biz.description || ''}`
    : `${biz.name} is a ${biz.category.toLowerCase()} located in ${biz.neighborhood || 'Milton'}, Ontario, Canada. ${biz.description || ''}`;

  // Schema.org JSON-LD: Main entity
  const mainSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    'name': biz.name,
    'description': biz.description || `${biz.name} is a ${biz.category} in Milton, Ontario.`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': biz.address || '',
      'addressLocality': 'Milton',
      'addressRegion': 'ON',
      'postalCode': '',
      'addressCountry': 'CA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '43.5183',
      'longitude': '-79.8774'
    },
    'url': biz.website || `https://miltonjobs.com/businesses/${slug}.html`,
    'image': `https://miltonjobs.com/icons/favicon.svg`
  };
  if (biz.phone) mainSchema.telephone = biz.phone;
  if (biz.website) mainSchema.sameAs = [biz.website];
  if (biz.rating) {
    mainSchema.aggregateRating = {
      '@type': 'AggregateRating',
      'ratingValue': biz.rating.toString(),
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': Math.floor(biz.rating * 10 + 5).toString()
    };
  }
  if (biz.cuisine) mainSchema.servesCuisine = biz.cuisine;
  if (biz.category === 'Restaurant' || biz.category === 'Pizza' || biz.category === 'Fast Food' || biz.category === 'Coffee Shop' || biz.category === 'Cafe' || biz.category === 'Bakery') {
    mainSchema.priceRange = '$$';
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://miltonjobs.com/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Directory', 'item': 'https://miltonjobs.com/#directory' },
      { '@type': 'ListItem', 'position': 3, 'name': biz.category, 'item': `https://miltonjobs.com/#directory` },
      { '@type': 'ListItem', 'position': 4, 'name': biz.name, 'item': `https://miltonjobs.com/businesses/${slug}.html` }
    ]
  };

  // FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  };

  // Related businesses HTML
  const sameCatHtml = sameCategory.length > 0 ? `
    <section class="job-section">
      <h2>Other ${escapeHtml(biz.category)} Businesses in Milton</h2>
      <p>Explore more ${escapeHtml(biz.category.toLowerCase())} options in Milton, Ontario:</p>
      <div class="related-jobs">
        ${sameCategory.map(r => `<a href="/businesses/${slugify(r.name)}.html" class="related-job-link"><span class="rj-emoji">${getIcon(r.category)}</span> ${escapeHtml(r.name)}${r.neighborhood && r.neighborhood !== 'Milton' ? ` <small style="color:var(--text-tertiary)">- ${escapeHtml(r.neighborhood)}</small>` : ''}</a>`).join('\n        ')}
      </div>
    </section>` : '';

  const sameNeighborhoodHtml = sameNeighborhood.length > 0 ? `
    <section class="job-section">
      <h2>Nearby Businesses in ${escapeHtml(biz.neighborhood || 'Milton')}</h2>
      <p>Other businesses near ${escapeHtml(biz.name)} in ${escapeHtml(biz.neighborhood || 'Milton')}:</p>
      <div class="related-jobs">
        ${sameNeighborhood.map(r => `<a href="/businesses/${slugify(r.name)}.html" class="related-job-link"><span class="rj-emoji">${getIcon(r.category)}</span> ${escapeHtml(r.name)} <small style="color:var(--text-tertiary)">- ${escapeHtml(r.category)}</small></a>`).join('\n        ')}
      </div>
    </section>` : '';

  // FAQ HTML
  const faqHtml = faqs.map(f => `
    <div class="faq-item">
      <button class="faq-question">
        ${escapeHtml(f.q)}
        <svg class="faq-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="faq-answer">
        <p>${escapeHtml(f.a)}</p>
      </div>
    </div>`).join('');

  // Category quick-links for sidebar
  const allCategories = [...new Set(businesses.map(b => b.category))].sort();
  const popularCategories = ['Restaurant', 'Coffee Shop', 'Dentist', 'Gym', 'Hair Salon', 'Auto Repair', 'Bank', 'Pharmacy', 'Pizza', 'Grocery Store'];
  const sidebarCategories = popularCategories.filter(c => allCategories.includes(c) && c !== biz.category).slice(0, 6);

  return `<!DOCTYPE html>
<html lang="en-CA" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(biz.name)} - ${escapeHtml(biz.category)} in ${escapeHtml(biz.neighborhood || 'Milton')}, ON | MiltonJobs.com</title>
<meta name="description" content="${escapeHtml(metaDesc)}">
<meta name="keywords" content="${escapeHtml(biz.name)}, ${escapeHtml(biz.category)} Milton, ${escapeHtml(biz.neighborhood || 'Milton')} Ontario, ${escapeHtml(biz.category.toLowerCase())} near me, Milton ON ${escapeHtml(biz.category.toLowerCase())}${biz.cuisine ? ', ' + escapeHtml(biz.cuisine) + ' food Milton' : ''}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="author" content="MiltonJobs.com">
<meta name="geo.region" content="CA-ON">
<meta name="geo.placename" content="Milton">
<link rel="canonical" href="https://miltonjobs.com/businesses/${slug}.html">

<!-- Open Graph -->
<meta property="og:type" content="place">
<meta property="og:title" content="${escapeHtml(biz.name)} - ${escapeHtml(biz.category)} in Milton, ON">
<meta property="og:description" content="${escapeHtml(metaDesc.slice(0, 200))}">
<meta property="og:url" content="https://miltonjobs.com/businesses/${slug}.html">
<meta property="og:site_name" content="MiltonJobs.com">
<meta property="og:locale" content="en_CA">
<meta property="place:location:latitude" content="43.5183">
<meta property="place:location:longitude" content="-79.8774">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(biz.name)} - Milton, ON">
<meta name="twitter:description" content="${escapeHtml(biz.category)} in ${escapeHtml(biz.neighborhood || 'Milton')}, Ontario. ${escapeHtml((biz.description || '').slice(0, 120))}">

<!-- PWA & Icons -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#2563eb">
<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Styles -->
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/jobs.css">

<!-- Structured Data: LocalBusiness -->
<script type="application/ld+json">
${JSON.stringify(mainSchema, null, 2)}
</script>

<!-- Structured Data: BreadcrumbList -->
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>

<!-- Structured Data: FAQPage -->
<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>
</head>
<body>

<a href="#main" class="skip-to-content">Skip to main content</a>

<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="/" class="logo" aria-label="MiltonJobs.com - Home"><div class="logo-icon">M</div>Milton<span>Jobs</span>.com</a>
    <nav class="header-nav" aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/#directory">Directory</a>
      <a href="/#jobs">Jobs</a>
      <a href="/#neighborhoods">Neighborhoods</a>
      <a href="/#contact">Contact</a>
    </nav>
    <div class="header-actions">
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</header>

<nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
  <a href="/">&#127968; Home</a>
  <a href="/#directory">&#128188; Directory</a>
  <a href="/#jobs">&#128188; Jobs</a>
  <a href="/#neighborhoods">&#127968; Neighborhoods</a>
  <a href="/#contact">&#128231; Contact</a>
</nav>

<main id="main">

<!-- Hero / Header -->
<section class="business-page-hero">
  <div class="job-hero-content">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a> <span>&#8250;</span> <a href="/#directory">Directory</a> <span>&#8250;</span> <span>${escapeHtml(biz.category)}</span> <span>&#8250;</span> <span>${escapeHtml(biz.name)}</span>
    </nav>
    <span class="job-emoji">${icon}</span>
    <h1>${escapeHtml(biz.name)}</h1>
    <p class="job-subtitle">${escapeHtml(biz.category)}${biz.cuisine ? ' (' + escapeHtml(biz.cuisine) + ')' : ''} in ${escapeHtml(biz.neighborhood || 'Milton')}, Ontario</p>
    ${biz.rating ? `<div style="margin-top:0.5rem;font-size:1.1rem;">&#11088; ${biz.rating} / 5</div>` : ''}
  </div>
</section>

<article class="business-page-content" itemscope itemtype="https://schema.org/${schemaType}">
  <div class="job-main">

    <!-- AEO: Primary answer block -->
    <section class="job-section">
      <h2>About ${escapeHtml(biz.name)}</h2>
      <p itemprop="description">${escapeHtml(aeoIntro)}</p>
      ${biz.halal ? '<p><strong>&#9790; Halal options available</strong></p>' : ''}
      ${biz.rating ? `<p>Customers rate ${escapeHtml(biz.name)} <strong>${biz.rating} out of 5 stars</strong>.</p>` : ''}
    </section>

    <!-- Contact & Location -->
    <section class="job-section">
      <h2>Location &amp; Contact Information</h2>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
          <span itemprop="address">${escapeHtml(biz.address || 'Milton, Ontario')}</span>
        </div>
        ${biz.phone ? `<div class="detail-item">
          <span class="detail-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
          <a href="tel:${biz.phone}" itemprop="telephone">${escapeHtml(biz.phone)}</a>
        </div>` : ''}
        ${biz.website ? `<div class="detail-item">
          <span class="detail-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
          <a href="${escapeHtml(biz.website)}" target="_blank" rel="noopener" itemprop="url">${escapeHtml(biz.website.replace(/^https?:\/\//, ''))}</a>
        </div>` : ''}
        <div class="detail-item">
          <span class="detail-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></span>
          <span>Neighbourhood: <strong>${escapeHtml(biz.neighborhood || 'Milton')}</strong></span>
        </div>
      </div>
      <div class="detail-actions" style="margin-top:1.5rem;">
        <a href="${mapsUrl}" target="_blank" rel="noopener" class="detail-action-btn primary">&#128205; Get Directions</a>
        ${biz.phone ? `<a href="tel:${biz.phone}" class="detail-action-btn secondary">&#128222; Call Now</a>` : ''}
        ${biz.website ? `<a href="${escapeHtml(biz.website)}" target="_blank" rel="noopener" class="detail-action-btn secondary">&#127760; Visit Website</a>` : ''}
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="job-section">
      <h2>Frequently Asked Questions about ${escapeHtml(biz.name)}</h2>
      <div class="faq-container">
        ${faqHtml}
      </div>
    </section>

    <!-- Related: Same Category -->
    ${sameCatHtml}

    <!-- Related: Same Neighborhood -->
    ${sameNeighborhoodHtml}

    <!-- AEO: Summary block for AI/search engines -->
    <section class="job-section">
      <h2>${escapeHtml(biz.name)} - Summary</h2>
      <p><strong>${escapeHtml(biz.name)}</strong> is a <strong>${escapeHtml(biz.category.toLowerCase())}</strong>${biz.cuisine ? ' specializing in <strong>' + escapeHtml(biz.cuisine.toLowerCase()) + ' cuisine</strong>' : ''} located in <strong>${escapeHtml(biz.neighborhood || 'Milton')}, Milton, Ontario, Canada</strong>.${biz.address && biz.address !== 'Milton, ON' ? ' The address is <strong>' + escapeHtml(biz.address) + '</strong>.' : ''}${biz.phone ? ' Phone: <strong>' + escapeHtml(biz.phone) + '</strong>.' : ''}${biz.rating ? ' Customer rating: <strong>' + biz.rating + '/5</strong>.' : ''} ${escapeHtml(biz.name)} is listed on MiltonJobs.com, Milton\'s free business directory.</p>
    </section>

  </div>

  <!-- Sidebar -->
  <aside class="job-sidebar">
    <div class="sidebar-card">
      <h3>Business Info</h3>
      <div class="quick-facts">
        <div class="fact-row"><span class="fact-label">Category</span><span class="fact-value">${escapeHtml(biz.category)}</span></div>
        ${biz.cuisine ? `<div class="fact-row"><span class="fact-label">Cuisine</span><span class="fact-value">${escapeHtml(biz.cuisine)}</span></div>` : ''}
        <div class="fact-row"><span class="fact-label">Area</span><span class="fact-value">${escapeHtml(biz.neighborhood || 'Milton')}</span></div>
        ${biz.rating ? `<div class="fact-row"><span class="fact-label">Rating</span><span class="fact-value">&#11088; ${biz.rating} / 5</span></div>` : ''}
        ${biz.halal ? '<div class="fact-row"><span class="fact-label">Halal</span><span class="fact-value">&#9790; Yes</span></div>' : ''}
        <div class="fact-row"><span class="fact-label">Region</span><span class="fact-value">Halton Region</span></div>
        <div class="fact-row"><span class="fact-label">Province</span><span class="fact-value">Ontario, Canada</span></div>
      </div>
    </div>

    <div class="sidebar-card">
      <h3>Explore Milton</h3>
      <div class="related-jobs">
        <a href="/#directory" class="related-job-link"><span class="rj-emoji">&#128270;</span> Browse All Businesses</a>
        <a href="/#jobs" class="related-job-link"><span class="rj-emoji">&#128188;</span> Find Jobs in Milton</a>
        <a href="/#neighborhoods" class="related-job-link"><span class="rj-emoji">&#127968;</span> Explore Neighborhoods</a>
      </div>
    </div>

    <div class="sidebar-card">
      <h3>Browse by Category</h3>
      <div class="related-jobs">
        ${sidebarCategories.map(c => `<a href="/#directory" class="related-job-link"><span class="rj-emoji">${getIcon(c)}</span> ${escapeHtml(c)}s in Milton</a>`).join('\n        ')}
      </div>
    </div>
  </aside>
</article>

</main>

<footer class="site-footer" role="contentinfo">
  <div class="footer-content">
    <div class="footer-brand">
      <a href="/" class="logo"><div class="logo-icon">M</div>Milton<span>Jobs</span>.com</a>
      <p>Your free, comprehensive guide to businesses, services, and job opportunities in Milton, Ontario.</p>
    </div>
    <div class="footer-column">
      <h4>Directory</h4>
      <ul>
        <li><a href="/#directory">All Businesses</a></li>
        <li><a href="/#directory">Restaurants</a></li>
        <li><a href="/#directory">Healthcare</a></li>
        <li><a href="/#directory">Services</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Jobs</h4>
      <ul>
        <li><a href="/jobs/warehouse-jobs-milton.html">Warehouse Jobs</a></li>
        <li><a href="/jobs/retail-jobs-milton.html">Retail Jobs</a></li>
        <li><a href="/jobs/healthcare-jobs-milton.html">Healthcare Jobs</a></li>
        <li><a href="/jobs/construction-jobs-milton.html">Construction Jobs</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>About</h4>
      <ul>
        <li><a href="/#about">About Us</a></li>
        <li><a href="/#contact">Contact</a></li>
        <li><a href="/sitemap.xml">Sitemap</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024&ndash;2026 MiltonJobs.com &mdash; A free community resource for Milton, Ontario.</p>
  </div>
</footer>

<script>
(function(){
  // Theme
  var t=localStorage.getItem('mj_theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
  document.documentElement.setAttribute('data-theme',t);
  document.addEventListener('DOMContentLoaded',function(){
    var tb=document.getElementById('themeToggle');
    if(tb)tb.addEventListener('click',function(){
      var nt=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
      document.documentElement.setAttribute('data-theme',nt);localStorage.setItem('mj_theme',nt);
    });
    // Mobile menu
    var mb=document.getElementById('mobileMenuBtn'),mn=document.getElementById('mobileNav');
    if(mb&&mn){mb.addEventListener('click',function(){mn.classList.toggle('active');mb.setAttribute('aria-expanded',mn.classList.contains('active'));});}
    if(mn){mn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mn.classList.remove('active');mb&&mb.setAttribute('aria-expanded','false');});});}
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(function(btn){
      btn.addEventListener('click',function(){
        var item=btn.parentElement;
        item.classList.toggle('open');
      });
    });
    // Scroll header
    var header=document.querySelector('.site-header');
    window.addEventListener('scroll',function(){if(header)header.classList.toggle('scrolled',window.scrollY>10);});
  });
})();
</script>
</body>
</html>`;
}

// ─── Generate all pages ───
let generated = 0;
businesses.forEach(biz => {
  const slug = slugify(biz.name);
  const html = generateBusinessPage(biz, businesses);
  fs.writeFileSync(path.join(bizDir, `${slug}.html`), html, 'utf8');
  generated++;
});

console.log(`Generated ${generated} SEO/AEO-optimized business detail pages in /businesses/`);
