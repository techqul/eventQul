import { Event } from '@/types';

export function generateEventStructuredData(event: Event) {
  const lowestPrice = Math.min(...event.ticketTypes.map((t) => parseFloat(t.price)));

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.longDescription,
    startDate: new Date(event.startDate).toISOString(),
    endDate: event.endDate ? new Date(event.endDate).toISOString() : undefined,
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue.address,
        addressLocality: event.venue.city,
        addressCountry: 'BD',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer.name,
      url: event.organizer.socialLinks?.website,
    },
    offers: {
      '@type': 'Offer',
      price: lowestPrice,
      priceCurrency: 'BDT',
      availability: event.soldTickets < event.capacity
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      url: `https://eventqul.com/events/${event.slug}`,
      validFrom: new Date(event.createdAt).toISOString(),
    },
    performer: {
      '@type': 'PerformingGroup',
      name: event.organizer.name,
    },
    image: event.coverImage,
    url: `https://eventqul.com/events/${event.slug}`,
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EventQul',
    url: 'https://eventqul.com',
    description: "Bangladesh's premier event ticket marketplace",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+8801712345678',
      contactType: 'customer service',
    },
    sameAs: [
      'https://facebook.com/eventqul',
      'https://twitter.com/eventqul',
      'https://instagram.com/eventqul',
    ],
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EventQul',
    url: 'https://eventqul.com',
    description: 'Discover and book tickets to the best events in Bangladesh',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://eventqul.com/events?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}
