import { Event, Organizer, Venue, User, Ticket, Category } from "@/types";
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
  },
];

// Organizers
export const ORGANIZERS: Organizer[] = [
  {
    id: "o1",
    name: "TechQul",
    slug: "techqul",
    logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1517245386807-b21b7b96f9a8?w=1200&h=400&fit=crop",
    description:
      "Leading technology event organizer in Bangladesh. We organize tech conferences, hackathons, and networking events for the vibrant tech community.",
    verified: true,
    rating: 4.8,
    totalEvents: 45,
    followers: 12500,
    socialLinks: {
      facebook: "https://facebook.com/techqul",
      twitter: "https://twitter.com/techqul",
      website: "https://techqul.com",
    },
  },
  {
    id: "o2",
    name: "Dhaka Events Hub",
    slug: "dhaka-events-hub",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=400&fit=crop",
    description:
      "Premium event management company specializing in corporate events, product launches, and brand activations.",
    verified: true,
    rating: 4.6,
    totalEvents: 78,
    followers: 8900,
    socialLinks: {
      facebook: "https://facebook.com/dhakaeventshub",
      instagram: "https://instagram.com/dhakaeventshub",
      website: "https://dhakaeventshub.com",
    },
  },
  {
    id: "o3",
    name: "Bangladesh Concert Arena",
    slug: "bd-concert-arena",
    logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=400&fit=crop",
    description:
      "The largest concert organizer in Bangladesh. From local artists to international superstars, we bring the best music to you.",
    verified: true,
    rating: 4.9,
    totalEvents: 120,
    followers: 45000,
    socialLinks: {
      facebook: "https://facebook.com/bdconcertarena",
      instagram: "https://instagram.com/bdconcertarena",
      twitter: "https://twitter.com/bdconcertarena",
    },
  },
  {
    id: "o4",
    name: "Startup Bangladesh",
    slug: "startup-bd",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=400&fit=crop",
    description:
      "Empowering the startup ecosystem through networking events, pitch competitions, and founder meetups.",
    verified: true,
    rating: 4.7,
    totalEvents: 56,
    followers: 15200,
    socialLinks: {
      facebook: "https://facebook.com/startupbangladesh",
      twitter: "https://twitter.com/startupbd",
      website: "https://startupbangladesh.org",
    },
  },
  {
    id: "o5",
    name: "Arts Council Bangladesh",
    slug: "arts-council-bd",
    logo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&h=400&fit=crop",
    description:
      "Preserving and promoting Bangladeshi culture through art exhibitions, cultural festivals, and workshops.",
    verified: true,
    rating: 4.8,
    totalEvents: 89,
    followers: 18000,
    socialLinks: {
      facebook: "https://facebook.com/artscouncilbd",
      instagram: "https://instagram.com/artscouncilbd",
      website: "https://artscouncilbd.org",
    },
  },
  {
    id: "o6",
    name: "Corporate Connect",
    slug: "corporate-connect",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=400&fit=crop",
    description:
      "Bangladesh's premier corporate event management company. We handle seminars, conferences, and annual meetings for MNCs.",
    verified: true,
    rating: 4.5,
    totalEvents: 92,
    followers: 6700,
    socialLinks: {
      facebook: "https://facebook.com/corporateconnectbd",
      website: "https://corporateconnectbd.com",
    },
  },
  {
    id: "o7",
    name: "Music Box Entertainment",
    slug: "music-box-entertainment",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=400&fit=crop",
    description:
      "Your gateway to the best live music experiences. We organize gigs, concerts, and music festivals across Bangladesh.",
    verified: true,
    rating: 4.6,
    totalEvents: 67,
    followers: 12300,
    socialLinks: {
      facebook: "https://facebook.com/musicboxentertainment",
      instagram: "https://instagram.com/musicboxbd",
    },
  },
  {
    id: "o8",
    name: "Sports Hub Bangladesh",
    slug: "sports-hub-bd",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=400&fit=crop",
    description:
      "Organizing sports events, tournaments, and fitness challenges to promote a healthy lifestyle in Bangladesh.",
    verified: true,
    rating: 4.4,
    totalEvents: 34,
    followers: 8900,
    socialLinks: {
      facebook: "https://facebook.com/sportshubbd",
      twitter: "https://twitter.com/sportshubbd",
    },
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
  startDate,
  endDate,
  timezone: "Asia/Dhaka",
  ticketTypes,
  status: new Date(startDate) > new Date() ? "upcoming" : "ongoing",
  capacity,
  soldTickets,
  featured,
  trending,
  tags: [],
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
});

export const EVENTS: Event[] = [
  // Concerts
  createEvent(
    "e1",
    "James LIVE in Dhaka 2025",
    "james-live-dhaka-2025",
    "Legendary Bangladeshi rock star James performs live at ICCB. Experience an unforgettable night of music!",
    "James, the legendary Bangladeshi rock guitarist and vocalist, is back with a spectacular live performance. Known for his soulful voice and electrifying guitar solos, James has been dominating the music scene for decades. This concert will feature his greatest hits including 'Bijli', 'Din Bari Jay', and many more fan favorites. The event will be held at the prestigious International Convention City Bashundhara with state-of-the-art sound and lighting systems. Don't miss this opportunity to witness the legend perform live!",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    "o3",
    "v1",
    "1",
    new Date("2025-03-15T19:00:00"),
    new Date("2025-03-15T23:00:00"),
    [
      {
        id: "t1",
        name: "VIP Pass",
        description: "Front row seats with meet & greet",
        price: 5000,
        currency: "BDT",
        available: 50,
        maxPerPurchase: 4,
        benefits: ["Front row seating", "Meet & greet", "Exclusive merchandise", "Complimentary refreshments"],
      },
      {
        id: "t2",
        name: "Premium",
        description: "Premium seating with great view",
        price: 2500,
        currency: "BDT",
        available: 200,
        maxPerPurchase: 6,
        benefits: ["Premium seating", "Early entry", "Exclusive merchandise"],
      },
      {
        id: "t3",
        name: "Regular",
        description: "Standard entry",
        price: 1000,
        currency: "BDT",
        available: 500,
        maxPerPurchase: 10,
        benefits: ["Standard seating", "Event access"],
      },
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
  createEvent(
    "e4",
    "AI & Machine Learning Workshop",
    "ai-ml-workshop",
    "Hands-on workshop on AI and ML fundamentals. Perfect for beginners and intermediate learners.",
    "This intensive one-day workshop covers the fundamentals of Artificial Intelligence and Machine Learning. Learn from industry experts as they guide you through real-world projects and case studies. Topics include neural networks, deep learning, natural language processing, and computer vision. Bring your laptop and leave with practical skills you can apply immediately.",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    "o1",
    "v2",
    "2",
    new Date("2025-03-05T10:00:00"),
    new Date("2025-03-05T17:00:00"),
    [
      {
        id: "t9",
        name: "Workshop Ticket",
        description: "Full workshop access with materials",
        price: 3500,
        currency: "BDT",
        available: 50,
        maxPerPurchase: 3,
        benefits: ["Workshop access", "Course materials", "Certificate", "Lunch"],
      },
    ],
    100,
    67,
    false,
    true
  ),
  // Corporate Events
  createEvent(
    "e5",
    "Bangladesh Business Awards 2025",
    "bangladesh-business-awards-2025",
    "The prestigious business awards ceremony recognizing excellence in Bangladeshi business.",
    "The Bangladesh Business Awards 2025 recognizes and celebrates outstanding achievements in the Bangladeshi business community. This black-tie event brings together industry leaders, entrepreneurs, and policymakers for an evening of networking and recognition. Categories include Startup of the Year, CEO of the Year, Best CSR Initiative, and many more.",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
    "o6",
    "v3",
    "3",
    new Date("2025-02-20T18:00:00"),
    new Date("2025-02-20T23:00:00"),
    [
      {
        id: "t10",
        name: "Corporate Table (10 seats)",
        description: "Reserved table for corporate guests",
        price: 50000,
        currency: "BDT",
        available: 15,
        maxPerPurchase: 5,
        benefits: ["Reserved table", "Branding opportunities", "10 tickets"],
      },
      {
        id: "t11",
        name: "Individual Ticket",
        description: "Single entry ticket",
        price: 5000,
        currency: "BDT",
        available: 100,
        maxPerPurchase: 10,
        benefits: ["Event access", "3-course dinner", "Networking"],
      },
    ],
    400,
    280,
    true,
    false
  ),
  // Sports
  createEvent(
    "e6",
    "Bangladesh Premier League Final 2025",
    "bpl-final-2025",
    "The biggest cricket match of the year - BPL Final at Bangladesh Army Stadium.",
    "Witness the most anticipated cricket match of the year as the top two teams battle for the Bangladesh Premier League trophy. The atmosphere will be electric as thousands of fans cheer for their favorite teams. Enjoy world-class cricket, entertainment, and an unforgettable experience at the historic Bangladesh Army Stadium.",
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop",
    "o8",
    "v5",
    "4",
    new Date("2025-02-14T14:00:00"),
    new Date("2025-02-14T22:00:00"),
    [
      {
        id: "t12",
        name: "VIP Gallery",
        description: "Premium VIP gallery seating",
        price: 10000,
        currency: "BDT",
        available: 100,
        maxPerPurchase: 10,
        benefits: ["VIP seating", "Food & beverage", "Air-conditioned", "Premium view"],
      },
      {
        id: "t13",
        name: "Grand Stand",
        description: "Covered grandstand seating",
        price: 3000,
        currency: "BDT",
        available: 2000,
        maxPerPurchase: 20,
        benefits: ["Covered seating", "Great view"],
      },
      {
        id: "t14",
        name: "General Stand",
        description: "General admission stand",
        price: 500,
        currency: "BDT",
        available: 5000,
        maxPerPurchase: 50,
        benefits: ["Event access", "Stand seating"],
      },
    ],
    15000,
    12100,
    true,
    true
  ),
  // Arts & Culture
  createEvent(
    "e7",
    "Bangladeshi Art Exhibition 2025",
    "bangladeshi-art-exhibition-2025",
    "A showcase of contemporary Bangladeshi art featuring works from emerging and established artists.",
    "Immerse yourself in the vibrant world of Bangladeshi contemporary art at this month-long exhibition. Featuring over 200 artworks from 50 artists, the exhibition showcases paintings, sculptures, installations, and digital art that reflect the rich cultural heritage and modern perspectives of Bangladesh. Meet the artists at special weekend events and workshops.",
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=600&fit=crop",
    "o5",
    "v2",
    "5",
    new Date("2025-03-01T10:00:00"),
    new Date("2025-03-31T20:00:00"),
    [
      {
        id: "t15",
        name: "Opening Night VIP",
        description: "Exclusive opening night access",
        price: 2000,
        currency: "BDT",
        available: 50,
        maxPerPurchase: 4,
        benefits: ["Opening night", "Meet artists", "Complimentary drinks", "Catalog"],
      },
      {
        id: "t16",
        name: "General Admission",
        description: "Regular exhibition entry",
        price: 200,
        currency: "BDT",
        available: 1000,
        maxPerPurchase: 10,
        benefits: ["Exhibition access", "Audio guide"],
      },
    ],
    2000,
    1450,
    true,
    false
  ),
  // Food Festival
  createEvent(
    "e8",
    "Dhaka Street Food Festival 2025",
    "dhaka-street-food-festival-2025",
    "Celebrate the diverse street food culture of Bangladesh at this vibrant food festival.",
    "Taste the best of Bangladeshi street food at this three-day culinary extravaganza. From Fuchka to Pitha, from Biriyani to Bharta, sample authentic flavors from street vendors and restaurants across Dhaka. Live cooking demonstrations, eating competitions, and entertainment make this a perfect family outing.",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    "o2",
    "v1",
    "6",
    new Date("2025-02-21T11:00:00"),
    new Date("2025-02-23T22:00:00"),
    [
      {
        id: "t17",
        name: "Food Pass",
        description: "All-day food tasting pass",
        price: 1500,
        currency: "BDT",
        available: 500,
        maxPerPurchase: 10,
        benefits: ["Unlimited tasting", "Cooking demo access", "Recipe book"],
      },
      {
        id: "t18",
        name: "Entry Only",
        description: "Venue entry",
        price: 200,
        currency: "BDT",
        available: 2000,
        maxPerPurchase: 20,
        benefits: ["Venue access"],
      },
    ],
    5000,
    3890,
    false,
    true
  ),
  // Startup & Networking
  createEvent(
    "e9",
    "Startup Pitch Night Dhaka",
    "startup-pitch-night-dhaka",
    "Watch Bangladesh's most promising startups pitch to top investors and win funding.",
    "Startup Pitch Night Dhaka brings together the country's most innovative startups and leading investors for an evening of groundbreaking ideas and potential investment. 10 selected startups will pitch their businesses to a panel of VC judges and an audience of industry experts. Network with founders, investors, and ecosystem enablers.",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    "o4",
    "v3",
    "7",
    new Date("2025-03-08T18:00:00"),
    new Date("2025-03-08T21:00:00"),
    [
      {
        id: "t19",
        name: "Investor Pass",
        description: "For accredited investors",
        price: 0,
        currency: "BDT",
        available: 50,
        maxPerPurchase: 2,
        benefits: ["VIP access", "Founder meetings", "Deal flow access"],
      },
      {
        id: "t20",
        name: "General Admission",
        description: "Standard entry",
        price: 500,
        currency: "BDT",
        available: 300,
        maxPerPurchase: 5,
        benefits: ["Event access", "Networking", "Refreshments"],
      },
    ],
    500,
    320,
    false,
    true
  ),
  // Workshop
  createEvent(
    "e10",
    "Photography Masterclass with Anwar Hossain",
    "photography-masterclass",
    "Learn photography from legendary Bangladeshi photographer Anwar Hossain.",
    "Join this exclusive photography masterclass with the renowned Anwar Hossain. Over two intensive days, learn composition, lighting, storytelling, and post-processing techniques. This hands-on workshop includes photo walks around Old Dhaka and personal portfolio reviews. Suitable for intermediate to advanced photographers.",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
    "o5",
    "v2",
    "8",
    new Date("2025-03-20T09:00:00"),
    new Date("2025-03-21T17:00:00"),
    [
      {
        id: "t21",
        name: "Full Workshop",
        description: "2-day masterclass with all materials",
        price: 12000,
        currency: "BDT",
        available: 20,
        maxPerPurchase: 2,
        benefits: ["2-day workshop", "Photo walk", "Portfolio review", "Certificate"],
      },
    ],
    30,
    24,
    false,
    false
  ),
  // More concerts
  createEvent(
    "e11",
    "Warfaze Reunion Concert",
    "warfaze-reunion-concert",
    "Iconic heavy metal band Warfaze reunites for a special one-night only performance.",
    "After years of anticipation, Warfaze - Bangladesh's legendary heavy metal band - reunites for a spectacular one-night performance. Experience their greatest hits including 'Oshamasajik', 'Bashonto', and many more. This historic reunion concert will feature the classic lineup performing together again.",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    "o3",
    "v6",
    "1",
    new Date("2025-04-05T19:00:00"),
    new Date("2025-04-05T23:30:00"),
    [
      {
        id: "t22",
        name: "VIP",
        description: "VIP entry with backstage access",
        price: 8000,
        currency: "BDT",
        available: 30,
        maxPerPurchase: 4,
        benefits: ["VIP entry", "Backstage tour", "Meet the band", "Merchandise pack"],
      },
      {
        id: "t23",
        name: "Regular",
        description: "Standard entry",
        price: 2000,
        currency: "BDT",
        available: 800,
        maxPerPurchase: 8,
        benefits: ["Event access", "Standing area"],
      },
    ],
    2000,
    1450,
    true,
    true
  ),
  // More tech events
  createEvent(
    "e12",
    "Dhaka Python Meetup - March 2025",
    "dhaka-python-meetup",
    "Monthly gathering of Python developers in Dhaka. Learn, share, and network.",
    "Join the Dhaka Python community for our monthly meetup. This month's topic is 'Building Scalable Web Applications with FastAPI'. Features talks by local developers, hands-on coding sessions, and networking opportunities. Both beginners and experienced developers welcome!",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    "o1",
    "v4",
    "2",
    new Date("2025-03-15T18:30:00"),
    new Date("2025-03-15T21:00:00"),
    [
      {
        id: "t24",
        name: "Free Entry",
        description: "RSVP required",
        price: 0,
        currency: "BDT",
        available: 100,
        maxPerPurchase: 2,
        benefits: ["Event access", "Pizza", "Swag"],
      },
    ],
    150,
    89,
    false,
    false
  ),
  // More corporate events
  createEvent(
    "e13",
    "HR Summit Bangladesh 2025",
    "hr-summit-bangladesh",
    "The premier HR conference featuring global thought leaders and industry experts.",
    "HR Summit Bangladesh 2025 brings together HR professionals, business leaders, and thought leaders to discuss the future of work and human resources. Topics include remote work management, employee engagement, AI in HR, talent acquisition, and leadership development. Network with peers and learn from the best in the industry.",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    "o6",
    "v2",
    "3",
    new Date("2025-03-25T09:00:00"),
    new Date("2025-03-25T17:00:00"),
    [
      {
        id: "t25",
        name: "Professional Pass",
        description: "Full conference access",
        price: 7500,
        currency: "BDT",
        available: 200,
        maxPerPurchase: 5,
        benefits: ["All sessions", "Workshop materials", "Lunch", "Certificate"],
      },
    ],
    300,
    178,
    false,
    false
  ),
  // More sports
  createEvent(
    "e14",
    "Dhaka Marathon 2025",
    "dhaka-marathon-2025",
    "Run through the streets of Dhaka in this exciting annual marathon event.",
    "Join thousands of runners for the annual Dhaka Marathon. Choose from full marathon (42km), half marathon (21km), 10K, or 5K fun run categories. The route takes you through historic parts of Dhaka with views of the city's landmarks. All finishers receive medals and certificates.",
    "https://images.unsplash.com/photo-1452626038306-1aae2e751c39?w=800&h=600&fit=crop",
    "o8",
    "v5",
    "4",
    new Date("2025-02-28T06:00:00"),
    new Date("2025-02-28T12:00:00"),
    [
      {
        id: "t26",
        name: "Full Marathon",
        description: "42km race",
        price: 1500,
        currency: "BDT",
        available: 500,
        maxPerPurchase: 3,
        benefits: ["Race bib", "Timing chip", "Finisher medal", "T-shirt"],
      },
      {
        id: "t27",
        name: "Half Marathon",
        description: "21km race",
        price: 1000,
        currency: "BDT",
        available: 800,
        maxPerPurchase: 3,
        benefits: ["Race bib", "Timing chip", "Finisher medal", "T-shirt"],
      },
      {
        id: "t28",
        name: "Fun Run 5K",
        description: "5km fun run",
        price: 300,
        currency: "BDT",
        available: 2000,
        maxPerPurchase: 5,
        benefits: ["Race bib", "Finisher medal"],
      },
    ],
    5000,
    3890,
    false,
    true
  ),
  // Cultural event
  createEvent(
    "e15",
    "Pahela Baishakh Celebration 2025",
    "pahela-baishakh-2025",
    "Welcome the Bengali New Year with traditional music, dance, and festivities.",
    "Celebrate Pahela Baishakh, the Bengali New Year, with an authentic cultural experience. The event features traditional music performances by Baul artists, folk dance shows, traditional crafts fair, and authentic Bengali food. Join us in welcoming the new year with joy, tradition, and community spirit.",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    "o5",
    "v2",
    "5",
    new Date("2025-04-14T06:00:00"),
    new Date("2025-04-14T18:00:00"),
    [
      {
        id: "t29",
        name: "Family Pass",
        description: "Entry for 4 family members",
        price: 800,
        currency: "BDT",
        available: 500,
        maxPerPurchase: 5,
        benefits: ["Family entry", "Traditional food platter"],
      },
      {
        id: "t30",
        name: "Individual",
        description: "Single entry",
        price: 200,
        currency: "BDT",
        available: 3000,
        maxPerPurchase: 10,
        benefits: ["Event access"],
      },
    ],
    5000,
    3210,
    true,
    true
  ),
];

// Users
export const USERS: User[] = [
  {
    id: "u1",
    name: "Ahmed Rahman",
    email: "ahmed@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    role: "user",
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
    role: "user",
    joinedDate: new Date("2024-03-20"),
    phone: "+880181234567",
    location: "Chittagong",
    bio: "Music lover and concert goer",
  },
];

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
