/**
 * MiltonJobs.com - SEO & Structured Data Helper
 * Injects JSON-LD schema markup for better search engine visibility
 */

(function () {
  'use strict';

  // Organization schema for MiltonJobs.com
  function injectOrganizationSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'MiltonJobs.com',
      'alternateName': 'Milton Jobs',
      'url': 'https://miltonjobs.com',
      'description': 'Free hyperlocal business directory and jobs hub for Milton, Ontario, Canada.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://miltonjobs.com/?search={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'MiltonJobs.com',
        'url': 'https://miltonjobs.com',
        'areaServed': {
          '@type': 'City',
          'name': 'Milton',
          'containedInPlace': {
            '@type': 'AdministrativeArea',
            'name': 'Ontario',
            'containedInPlace': {
              '@type': 'Country',
              'name': 'Canada'
            }
          }
        }
      }
    };
    injectSchema(schema);
  }

  // Local Business schema for individual businesses
  function injectLocalBusinessSchema(business) {
    if (!business) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': business.name,
      'description': business.description || business.services || '',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': business.address || '',
        'addressLocality': 'Milton',
        'addressRegion': 'ON',
        'addressCountry': 'CA'
      }
    };

    if (business.phone) {
      schema.telephone = business.phone;
    }

    if (business.website) {
      schema.url = business.website;
    }

    if (business.rating) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': business.rating,
        'bestRating': '5',
        'worstRating': '1'
      };
    }

    injectSchema(schema);
  }

  // BreadcrumbList schema
  function injectBreadcrumbSchema(items) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
    injectSchema(schema);
  }

  // FAQPage schema
  function injectFAQSchema(faqs) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
    injectSchema(schema);
  }

  // JobPosting schema
  function injectJobPostingSchema(job) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      'title': job.title,
      'description': job.description,
      'datePosted': job.datePosted || new Date().toISOString().split('T')[0],
      'jobLocation': {
        '@type': 'Place',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Milton',
          'addressRegion': 'ON',
          'addressCountry': 'CA'
        }
      },
      'hiringOrganization': {
        '@type': 'Organization',
        'name': job.employer || 'Various Milton Employers'
      }
    };

    if (job.salary) {
      schema.baseSalary = {
        '@type': 'MonetaryAmount',
        'currency': 'CAD',
        'value': {
          '@type': 'QuantitativeValue',
          'value': job.salary,
          'unitText': job.salaryUnit || 'YEAR'
        }
      };
    }

    injectSchema(schema);
  }

  // Helper to inject schema
  function injectSchema(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Auto-inject on page load
  document.addEventListener('DOMContentLoaded', () => {
    injectOrganizationSchema();

    // Inject FAQ schema from page if exists
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
      const faqs = Array.from(faqItems).map(item => ({
        question: item.querySelector('.faq-question')?.textContent?.trim() || '',
        answer: item.querySelector('.faq-answer p')?.textContent?.trim() || ''
      })).filter(f => f.question && f.answer);

      if (faqs.length > 0) {
        injectFAQSchema(faqs);
      }
    }
  });

  // Public API
  window.MiltonJobsSEO = {
    injectLocalBusinessSchema,
    injectBreadcrumbSchema,
    injectFAQSchema,
    injectJobPostingSchema
  };

})();
