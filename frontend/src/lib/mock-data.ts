import { Event, Organizer, Venue, Ticket } from "@/types";
import { CATEGORIES } from "./constants";

// Venues
export const VENUES: Venue[] = [
  {
    id: "v1",
    name: "International Convention City Bashundhara",
    slug: "iccb",
    address: "Plot No. EW(P) 04, Street 02, Civil Aviation, Bashundhara R/A",
    city: "Dhaka",
    area: "Bashundhara",
    capacity: 5000,
    mapImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    facilities: ["Parking", "AC", "WiFi", "Catering", "Stage"],
    coordinates: { lat: 23.8142, lng: 90.4134 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v2",
    name: "Bangabandhu International Conference Center",
    slug: "bicc",
    address: "Agargaon, Sher-e-Bangla Nagar",
    city: "Dhaka",
    area: "Agargaon",
    capacity: 3000,
    mapImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    facilities: ["Parking", "AC", "WiFi", "Catering", "Simultaneous Interpretation"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v3",
    name: "Le Méridien Dhaka",
    slug: "le-meridien",
    address: "122, Gulshan Avenue, Gulshan 2",
    city: "Dhaka",
    area: "Gulshan",
    capacity: 800,
    mapImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    facilities: ["Parking", "AC", "WiFi", "Restaurant", "Gym"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v4",
    name: "Gulshan Club",
    slug: "gulshan-club",
    address: "Gulshan Avenue, Gulshan 2",
    city: "Dhaka",
    area: "Gulshan",
    capacity: 500,
    mapImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    facilities: ["Parking", "AC", "WiFi", "Restaurant", "Bar"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v5",
    name: "Bangladesh Army Stadium",
    slug: "army-stadium",
    address: "Dhanmondi, Dhaka",
    city: "Dhaka",
    area: "Dhanmondi",
    capacity: 15000,
    mapImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    facilities: ["Parking", "Floodlights", "VIP Boxes", "Food Court"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v6",
    name: "Shaheed Suhrawardy Indoor Stadium",
    slug: "suhrawardy-stadium",
    address: "Indoor Stadium, Mirpur Road",
    city: "Dhaka",
    area: "Mirpur",
    capacity: 5000,
    mapImage: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800",
    facilities: ["Parking", "AC", "WiFi", "Locker Rooms"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v7",
    name: "Chattogram Commerce College Auditorium",
    slug: "ccc-auditorium",
    address: "Nasirabad, Chittagong",
    city: "Chittagong",
    area: "Nasirabad",
    capacity: 1000,
    mapImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
    facilities: ["Parking", "AC", "Sound System"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v8",
    name: "Sylhet International University Auditorium",
    slug: "siu-auditorium",
    address: "Zindabazar, Sylhet",
    city: "Sylhet",
    area: "Zindabazar",
    capacity: 700,
    mapImage: "https://images.unsplash.com/photo-1475724077659-12340855d6c2?w=800",
    facilities: ["Parking", "AC", "Projector", "Sound System"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Organizers
export const ORGANIZERS: Organizer[] = [
  {
    id: "o1",
    userId: "u1",
    name: "TechQul",
    slug: "techqul",
    logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1517245386807-b21b7b96f9a8?w=1200&h=400&fit=crop",
    description:
      "Leading technology event organizer in Bangladesh. We organize tech conferences, hackathons, and networking events for the vibrant tech community.",
    isVerified: true,
    rating: "4.8",
    totalEvents: 45,
    followers: 12500,
    commissionRate: "10.00",
    socialLinks: {
      facebook: "https://facebook.com/techqul",
      twitter: "https://twitter.com/techqul",
      website: "https://techqul.com",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "o2",
    userId: "u2",
    name: "Dhaka Events Hub",
    slug: "dhaka-events-hub",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=400&fit=crop",
    description:
      "Premium event management company specializing in corporate events, product launches, and brand activations.",
    isVerified: true,
    rating: "4.6",
    totalEvents: 78,
    followers: 8900,
    commissionRate: "10.00",
    socialLinks: {
      facebook: "https://facebook.com/dhakaeventshub",
      instagram: "https://instagram.com/dhakaeventshub",
      website: "https://dhakaeventshub.com",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "o3",
    userId: "u3",
    name: "HSC 95 Society",
    slug: "hsc-95-society",
    logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=400&fit=crop",
    description:
      "The largest reunion organizer in Bangladesh. We organize annual reunions, family gatherings, and social events for family and friends.",
    isVerified: true,
    rating: "4.9",
    totalEvents: 120,
    followers: 45000,
    commissionRate: "10.00",
    socialLinks: {
      facebook: "https://facebook.com/bdconcertarena",
      instagram: "https://instagram.com/bdconcertarena",
      twitter: "https://twitter.com/bdconcertarena",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "o4",
    userId: "u4",
    name: "Startup Bangladesh",
    slug: "startup-bd",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=400&fit=crop",
    description:
      "Empowering the startup ecosystem through networking events, pitch competitions, and founder meetups.",
    isVerified: true,
    rating: "4.7",
    totalEvents: 56,
    followers: 15200,
    commissionRate: "10.00",
    socialLinks: {
      facebook: "https://facebook.com/startupbangladesh",
      twitter: "https://twitter.com/startupbd",
      website: "https://startupbangladesh.org",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "o5",
    userId: "u5",
    name: "Arts Council Bangladesh",
    slug: "arts-council-bd",
    logo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&h=400&fit=crop",
    description:
      "Preserving and promoting Bangladeshi culture through art exhibitions, cultural festivals, and workshops.",
    isVerified: true,
    rating: "4.8",
    totalEvents: 89,
    followers: 18000,
    commissionRate: "10.00",
    socialLinks: {
      facebook: "https://facebook.com/artscouncilbd",
      instagram: "https://instagram.com/artscouncilbd",
      website: "https://artscouncilbd.org",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "o6",
    userId: "u6",
    name: "Corporate Connect",
    slug: "corporate-connect",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=400&fit=crop",
    description:
      "Bangladesh's premier corporate event management company. We handle seminars, conferences, and annual meetings for MNCs.",
    isVerified: true,
    rating: "4.5",
    totalEvents: 92,
    followers: 6700,
    commissionRate: "10.00",
    socialLinks: {
      facebook: "https://facebook.com/corporateconnectbd",
      website: "https://corporateconnectbd.com",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "o7",
    userId: "u7",
    name: "Music Box Entertainment",
    slug: "music-box-entertainment",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=400&fit=crop",
    description:
      "Your gateway to the best live music experiences. We organize gigs, concerts, and music festivals across Bangladesh.",
    isVerified: true,
    rating: "4.6",
    totalEvents: 67,
    followers: 12300,
    commissionRate: "10.00",
    socialLinks: {
      facebook: "https://facebook.com/musicboxentertainment",
      instagram: "https://instagram.com/musicboxbd",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "o8",
    userId: "u8",
    name: "Sports Hub Bangladesh",
    slug: "sports-hub-bd",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=400&fit=crop",
    description:
      "Organizing sports events, tournaments, and fitness challenges to promote a healthy lifestyle in Bangladesh.",
    isVerified: true,
    rating: "4.4",
    totalEvents: 34,
    followers: 8900,
    commissionRate: "10.00",
    socialLinks: {
      facebook: "https://facebook.com/sportshubbd",
      twitter: "https://twitter.com/sportshubbd",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Events
const createEvent = (
  id: string,
  title: string,
  slug: string,
  description: string,
  longDescription: string,
  coverImage: string,
  organizerId: string,
  venueId: string,
  categoryId: string,
  startDate: Date,
  endDate: Date,
  ticketTypes: any[],
  capacity: number,
  soldTickets: number,
  featured: boolean = false,
  trending: boolean = false
): Event => ({
  id,
  title,
  slug,
  description,
  longDescription,
  coverImage,
  gallery: [coverImage],
  organizer: ORGANIZERS.find((o) => o.id === organizerId)!,
  venue: VENUES.find((v) => v.id === venueId)!,
  category: CATEGORIES.find((c) => c.id === categoryId)!,
  startDate: startDate.toISOString(),
  endDate: endDate.toISOString(),
  timezone: "Asia/Dhaka",
  ticketTypes,
  status: new Date(startDate) > new Date() ? "upcoming" : "ongoing",
  capacity,
  soldTickets,
  featured,
  trending,
  tags: [],
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  organizerId,
  venueId,
  categoryId,
});

export const EVENTS: Event[] = [
  // Concerts
  createEvent(
    "e1",
    "30 Years Celebration of HSC '95 Society",
    "hsc96-society-30-years",
    "এইচএসসি ৯৫ সোসাইটির ৩০ বছর পূর্তি উদযাপন।",
    "এইচএসসি ৯৫ সোসাইটির ৩০ বছর পূর্তি উদযাপন উপলক্ষে আয়োজিত এই বিশেষ অনুষ্ঠানে প্রাক্তন শিক্ষার্থীদের এক মিলনমেলার আয়োজন করা হয়েছে। দীর্ঘ তিন দশকের পথচলায় গড়ে ওঠা বন্ধুত্ব, স্মৃতি ও অভিজ্ঞতাকে একত্রে উদযাপন করাই এই আয়োজনের মূল উদ্দেশ্য।",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    "o3",
    "v1",
    "1",
    new Date("2026-10-30T16:00:00"),
    new Date("2026-10-30T23:59:00"),
    [
      {
        id: "t5",
        name: "Regular",
        description: "Standard seating",
        price: 1500,
        currency: "BDT",
        available: 300,
        maxPerPurchase: 8,
        benefits: ["Event access", "Standard seating"],
      }
    ],
    3000,
    2450,
    true,
    true
  ),
  createEvent(
    "e2",
    "Nusrat Fateh Ali Khan Tribute Night",
    "nusrat-tribute-night",
    "A mesmerizing evening of Qawwali music paying tribute to the legendary Nusrat Fateh Ali Khan.",
    "Join us for an unforgettable evening of soul-stirring Qawwali music as renowned artists from Bangladesh and Pakistan pay tribute to the legendary Nusrat Fateh Ali Khan. The event will feature his most famous compositions performed by talented musicians who have mastered the art of Qawwali. Experience the spiritual and musical journey that has captivated millions worldwide.",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    "o7",
    "v3",
    "1",
    new Date("2025-02-28T20:00:00"),
    new Date("2025-02-28T23:30:00"),
    [
      {
        id: "t4",
        name: "VIP Table",
        description: "VIP table seating for 4",
        price: 8000,
        currency: "BDT",
        available: 20,
        maxPerPurchase: 2,
        benefits: ["VIP table", "Complimentary dinner", "Private seating area"],
      },
      {
        id: "t5",
        name: "Regular",
        description: "Standard seating",
        price: 1500,
        currency: "BDT",
        available: 300,
        maxPerPurchase: 8,
        benefits: ["Event access", "Standard seating"],
      },
    ],
    500,
    320,
    true,
    false
  ),
  // Tech Conferences
  createEvent(
    "e3",
    "Bangladesh Tech Summit 2025",
    "bangladesh-tech-summit-2025",
    "The largest tech conference in Bangladesh featuring speakers from top global tech companies.",
    "Bangladesh Tech Summit 2025 brings together the brightest minds in technology from Bangladesh and around the world. This two-day conference will feature keynote speakers from Google, Microsoft, Amazon, and other tech giants. Topics will include AI, Blockchain, Cloud Computing, Fintech, and the future of work. Network with industry leaders, attend hands-on workshops, and discover the latest innovations shaping our digital future.",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    "o1",
    "v2",
    "2",
    new Date("2025-04-10T09:00:00"),
    new Date("2025-04-11T18:00:00"),
    [
      {
        id: "t6",
        name: "All Access Pass",
        description: "Full conference access + workshops",
        price: 15000,
        currency: "BDT",
        available: 100,
        maxPerPurchase: 5,
        benefits: ["All sessions", "Workshops", "Networking dinner", "Digital swag bag"],
      },
      {
        id: "t7",
        name: "Conference Pass",
        description: "Main conference access",
        price: 8000,
        currency: "BDT",
        available: 400,
        maxPerPurchase: 10,
        benefits: ["Keynote sessions", "Panel discussions", "Lunch included"],
      },
      {
        id: "t8",
        name: "Student Pass",
        description: "Discounted rate for students",
        price: 3000,
        currency: "BDT",
        available: 150,
        maxPerPurchase: 1,
        benefits: ["Conference access", "Student networking", "Certificate"],
      },
    ],
    1500,
    980,
    true,
    true
  ),
];

// Users - commented out due to type mismatch with new User interface
// TODO: Update to match new User type structure with firstName, lastName, etc.
/*
export const USERS: User[] = [
  {
    id: "u1",
    name: "Ahmed Rahman",
    email: "ahmed@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    role: UserRole.USER,
    joinedDate: new Date("2024-01-15"),
    phone: "+880171234567",
    location: "Dhaka",
    bio: "Tech enthusiast and event lover",
  },
  {
    id: "u2",
    name: "Fatima Akter",
    email: "fatima@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    role: UserRole.USER,
    joinedDate: new Date("2024-03-20"),
    phone: "+880181234567",
    location: "Chittagong",
    bio: "Music lover and concert goer",
  },
];
*/

// Mock Tickets (purchased)
export const TICKETS: Ticket[] = [
  {
    id: "tk1",
    orderId: "ord-001",
    eventId: "e1",
    eventName: "James LIVE in Dhaka 2025",
    eventDate: new Date("2025-03-15T19:00:00"),
    eventCoverImage: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    ticketType: "VIP Pass",
    quantity: 2,
    totalPrice: 10000,
    purchaseDate: new Date("2025-01-10T14:30:00"),
    status: "confirmed",
    qrCode: "QR-JAMES-VIP-001",
    attendee: {
      name: "Ahmed Rahman",
      email: "ahmed@example.com",
      phone: "+880171234567",
    },
  },
  {
    id: "tk2",
    orderId: "ord-002",
    eventId: "e3",
    eventName: "Bangladesh Tech Summit 2025",
    eventDate: new Date("2025-04-10T09:00:00"),
    eventCoverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    ticketType: "Conference Pass",
    quantity: 1,
    totalPrice: 8000,
    purchaseDate: new Date("2025-01-05T11:20:00"),
    status: "confirmed",
    qrCode: "QR-TECH-CON-002",
    attendee: {
      name: "Fatima Akter",
      email: "fatima@example.com",
      phone: "+880181234567",
    },
  },
];

// Export helper functions
export function getFeaturedEvents(): Event[] {
  return EVENTS.filter((e) => e.featured);
}

export function getTrendingEvents(): Event[] {
  return EVENTS.filter((e) => e.trending);
}

export function getUpcomingEvents(): Event[] {
  return EVENTS.filter((e) => new Date(e.startDate) > new Date()).sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export function getEventById(id: string): Event | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export function getEventsByCategory(categoryId: string): Event[] {
  return EVENTS.filter((e) => e.category.id === categoryId);
}

export function getEventsByOrganizer(organizerId: string): Event[] {
  return EVENTS.filter((e) => e.organizer.id === organizerId);
}

export function getEventsByVenue(venueId: string): Event[] {
  return EVENTS.filter((e) => e.venue.id === venueId);
}

export function searchEvents(query: string): Event[] {
  const lowerQuery = query.toLowerCase();
  return EVENTS.filter(
    (e) =>
      e.title.toLowerCase().includes(lowerQuery) ||
      e.description.toLowerCase().includes(lowerQuery) ||
      e.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedEvents(eventId: string, limit: number = 4): Event[] {
  const event = getEventById(eventId);
  if (!event) return [];
  return EVENTS.filter(
    (e) =>
      e.id !== eventId &&
      (e.category.id === event.category.id || e.venue.city === event.venue.city)
  ).slice(0, limit);
}
