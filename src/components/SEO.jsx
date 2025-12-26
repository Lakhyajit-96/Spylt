import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// SEO Configuration for different pages
const seoConfig = {
  '/': {
    title: 'SPYLT™ - Premium Protein + Caffeine Beverages | Fuel Your Passion',
    description: 'Revolutionary beverages combining 20g premium whey protein with 95mg natural caffeine in 6 incredible flavors. Zero sugar, lactose-free, 150 calories. Fuel your passion with SPYLT™.',
    keywords: 'protein drinks, caffeine beverages, functional drinks, whey protein, natural caffeine, fitness nutrition, post workout, pre workout, healthy drinks, SPYLT',
    ogType: 'website',
    ogImage: '/images/Final.png'
  },
  '/spylt-flavors': {
    title: 'SPYLT™ Flavors - 6 Incredible Protein + Caffeine Combinations',
    description: 'Discover our 6 signature flavors: Chocolate Milk, Strawberry Milk, Cookies & Cream, Peanut Butter Chocolate, Vanilla Milkshake, and Max Chocolate Milk. Each with 20g protein and 95mg caffeine.',
    keywords: 'SPYLT flavors, chocolate milk protein, strawberry protein drink, cookies cream beverage, peanut butter chocolate, vanilla milkshake protein, protein flavors',
    ogType: 'product',
    ogImage: '/images/brown-drink.webp'
  },
  '/company': {
    title: 'About SPYLT™ - Our Story, Mission & Team | Premium Beverage Brand',
    description: 'Founded in 2019 by nutrition scientists, SPYLT™ revolutionizes functional beverages. Learn about our mission, leadership team, awards, and commitment to sustainability.',
    keywords: 'SPYLT company, beverage brand story, nutrition scientists, functional beverage innovation, sustainable packaging, company mission',
    ogType: 'website',
    ogImage: '/images/hero-img.png'
  },
  '/contact': {
    title: 'Contact SPYLT™ - Get in Touch | Customer Support & Business Inquiries',
    description: 'Contact SPYLT™ for customer support, business partnerships, media inquiries, or general questions. Multiple contact methods and office locations available.',
    keywords: 'contact SPYLT, customer support, business partnerships, media inquiries, wholesale opportunities, beverage distribution',
    ogType: 'website',
    ogImage: '/images/nav-logo.svg'
  },
  '/tasty-talk': {
    title: 'Tasty Talk Blog - Nutrition Tips, Fitness Advice & SPYLT™ Lifestyle',
    description: 'Explore our blog for nutrition science, fitness tips, healthy recipes, and the SPYLT™ lifestyle. Expert advice for active professionals and fitness enthusiasts.',
    keywords: 'nutrition blog, fitness tips, protein nutrition, caffeine benefits, healthy lifestyle, workout nutrition, recovery drinks',
    ogType: 'blog',
    ogImage: '/images/blue-drink.webp'
  },
  '/chug-club': {
    title: 'SPYLT™ Chug Club - Exclusive Community & Loyalty Rewards',
    description: 'Join the SPYLT™ Chug Club for exclusive rewards, early access to new flavors, community events, and special discounts. Fuel your passion with fellow enthusiasts.',
    keywords: 'SPYLT loyalty program, Chug Club, exclusive rewards, community membership, early access, special discounts',
    ogType: 'website',
    ogImage: '/images/red-drink.webp'
  },
  '/student-marketing': {
    title: 'SPYLT™ Student Programs - Campus Partnerships & Bulk Discounts',
    description: 'Special programs for students and educational institutions. Campus partnerships, bulk discounts, and nutrition education initiatives for the next generation.',
    keywords: 'student discounts, campus partnerships, bulk protein drinks, educational nutrition, college programs, student athletes',
    ogType: 'website',
    ogImage: '/images/orange-drink.webp'
  },
  '/dairy-dealers': {
    title: 'SPYLT™ B2B Partnerships - Wholesale & Distribution Opportunities',
    description: 'Partner with SPYLT™ for wholesale distribution, retail partnerships, and B2B opportunities. Premium functional beverages for your business.',
    keywords: 'wholesale protein drinks, beverage distribution, B2B partnerships, retail opportunities, functional beverage wholesale',
    ogType: 'website',
    ogImage: '/images/white-drink.webp'
  },
  '/privacy-policy': {
    title: 'Privacy Policy - SPYLT™ Data Protection & User Privacy',
    description: 'SPYLT™ privacy policy outlining our commitment to protecting your personal information, data collection practices, and user rights under GDPR and CCPA.',
    keywords: 'privacy policy, data protection, GDPR compliance, user privacy, personal information, data security',
    ogType: 'website',
    ogImage: '/images/nav-logo.svg'
  },
  '/terms-of-service': {
    title: 'Terms of Service - SPYLT™ Legal Terms & Conditions',
    description: 'SPYLT™ terms of service covering website usage, product information, legal rights, and user responsibilities. Please read before using our services.',
    keywords: 'terms of service, legal terms, user agreement, website terms, product terms, legal conditions',
    ogType: 'website',
    ogImage: '/images/nav-logo.svg'
  }
};

// Structured Data Schema for different page types
const generateStructuredData = (pathname) => {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SPYLT",
    "alternateName": "SPYLT Beverages",
    "url": "https://github.com/Lakhyajit-96/Spylt",
    "logo": "/images/nav-logo.svg",
    "description": "Premium functional beverages combining protein and caffeine",
    "foundingDate": "2019",
    "founder": {
      "@type": "Person",
      "name": "Lakhyajit"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-SPYLT",
      "contactType": "customer service",
      "email": "hello@spylt.com"
    },
    "sameAs": [
      "https://instagram.com/spylt",
      "https://tiktok.com/@spylt",
      "https://youtube.com/@spylt",
      "https://linkedin.com/company/spylt"
    ]
  };

  switch (pathname) {
    case '/':
      return {
        ...baseOrganization,
        "@type": ["Organization", "Brand"],
        "brand": {
          "@type": "Brand",
          "name": "SPYLT",
          "slogan": "Fuel Your Passion"
        }
      };

    case '/spylt-flavors':
      return {
        "@context": "https://schema.org",
        "@type": "ProductCollection",
        "name": "SPYLT Flavors",
        "description": "Premium protein and caffeine beverages in 6 incredible flavors",
        "brand": {
          "@type": "Brand",
          "name": "SPYLT"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "4.99",
          "highPrice": "6.99",
          "availability": "https://schema.org/InStock"
        }
      };

    case '/company':
      return {
        ...baseOrganization,
        "numberOfEmployees": "50-100",
        "industry": "Food and Beverage",
        "award": [
          "2024 Beverage Innovation Award - Best New Product",
          "2023 Taste Awards - Gold Medal Winner",
          "2023 Brand of the Year - Functional Beverages"
        ]
      };

    case '/contact':
      return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "mainEntity": {
          "@type": "Organization",
          "name": "SPYLT",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Milk Street, Suite 500",
            "addressLocality": "Dairy Valley",
            "addressRegion": "CA",
            "postalCode": "90210",
            "addressCountry": "US"
          },
          "telephone": "+1-555-123-SPYLT",
          "email": "hello@spylt.com"
        }
      };

    default:
      return baseOrganization;
  }
};

// SEO Hook for automatic meta tag management
export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const config = seoConfig[pathname] || seoConfig['/'];

    // Update document title
    document.title = config.title;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', config.description);
    updateMetaTag('keywords', config.keywords);

    // Open Graph tags
    updateMetaTag('og:title', config.title, true);
    updateMetaTag('og:description', config.description, true);
    updateMetaTag('og:type', config.ogType, true);
    updateMetaTag('og:image', config.ogImage, true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:site_name', 'SPYLT™', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', config.title);
    updateMetaTag('twitter:description', config.description);
    updateMetaTag('twitter:image', config.ogImage);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'Lakhyajit');
    updateMetaTag('copyright', '© 2025 Lakhyajit. All rights reserved.');
    updateMetaTag('language', 'en-US');
    updateMetaTag('revisit-after', '7 days');

    // Structured Data
    const structuredData = generateStructuredData(pathname);
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    
    scriptTag.textContent = JSON.stringify(structuredData);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

  }, [location]);
};

// Generate XML Sitemap data
export const generateSitemap = () => {
  const baseUrl = 'https://github.com/Lakhyajit-96/Spylt';
  const pages = Object.keys(seoConfig);
  
  const sitemapData = pages.map(path => ({
    url: `${baseUrl}${path}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? '1.0' : '0.8'
  }));

  return sitemapData;
};

// Robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://github.com/Lakhyajit-96/Spylt/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /.env
Disallow: /node_modules/

# Allow important resources
Allow: /images/
Allow: /videos/
Allow: /fonts/
Allow: /*.css
Allow: /*.js`;
};

export default {
  useSEO,
  generateSitemap,
  generateRobotsTxt,
  seoConfig
};