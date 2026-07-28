import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Concerts & Music",
    nameBengali: "কনসার্ট ও সঙ্গীত",
    slug: "concerts",
    icon: "Music",
    color: "from-pink-500 to-rose-500",
    eventCount: 156,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Tech Conferences",
    nameBengali: "টেক কনফারেন্স",
    slug: "tech-conferences",
    icon: "Laptop",
    color: "from-blue-500 to-cyan-500",
    eventCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Corporate Events",
    nameBengali: "কর্পোরেট ইভেন্ট",
    slug: "corporate-events",
    icon: "Briefcase",
    color: "from-purple-500 to-indigo-500",
    eventCount: 124,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Sports",
    nameBengali: "খেলাধুলা",
    slug: "sports",
    icon: "Trophy",
    color: "from-green-500 to-emerald-500",
    eventCount: 67,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Arts & Culture",
    nameBengali: "শিল্প ও সংস্কৃতি",
    slug: "arts-culture",
    icon: "Palette",
    color: "from-orange-500 to-amber-500",
    eventCount: 93,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Food & Festival",
    nameBengali: "খাবার ও উৎসব",
    slug: "food-festival",
    icon: "Utensils",
    color: "from-red-500 to-pink-500",
    eventCount: 78,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Startup & Networking",
    nameBengali: "স্টার্টআপ ও নেটওয়ার্কিং",
    slug: "startup-networking",
    icon: "Rocket",
    color: "from-violet-500 to-purple-500",
    eventCount: 112,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Workshops",
    nameBengali: "ওয়ার্কশপ",
    slug: "workshops",
    icon: "GraduationCap",
    color: "from-teal-500 to-cyan-500",
    eventCount: 145,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const CITIES = [
  { id: "1", name: "Dhaka", nameBengali: "ঢাকা" },
  { id: "2", name: "Chittagong", nameBengali: "চট্টগ্রাম" },
  { id: "3", name: "Sylhet", nameBengali: "সিলেট" },
  { id: "4", name: "Rajshahi", nameBengali: "রাজশাহী" },
  { id: "5", name: "Khulna", nameBengali: "খুলনা" },
];

export const TIMEZONES = [
  "Asia/Dhaka",
  "UTC",
  "Asia/Kolkata",
  "Asia/Singapore",
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Date" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "popular", label: "Popular" },
];

export const FAQ_ITEMS = [
  {
    question: "How do I purchase tickets?",
    answer:
      "Simply browse events, select your desired event, choose ticket type and quantity, and proceed to checkout. We accept multiple payment methods including cards and mobile banking.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refunds are available up to 48 hours before the event. Contact our support team with your order details to process a refund request.",
  },
  {
    question: "How do I become an organizer?",
    answer:
      "Sign up as an organizer, complete your profile verification, and you can start creating events. Our team reviews each organizer application within 24-48 hours.",
  },
  {
    question: "Are tickets transferable?",
    answer:
      "Yes, tickets can be transferred to another person up to 24 hours before the event. Log in to your dashboard and select the ticket you wish to transfer.",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah Rahman",
    role: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content:
      "EventQul made organizing our company annual event so smooth. The dashboard is intuitive and the ticket management is excellent.",
    rating: 5,
  },
  {
    id: "2",
    name: "Ahmed Hossain",
    role: "Event Coordinator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content:
      "As an organizer, I've sold over 5000 tickets through EventQul. Their analytics help me understand my audience better.",
    rating: 5,
  },
  {
    id: "3",
    name: "Fatima Akter",
    role: "Concert Goer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content:
      "Found amazing concerts and bought tickets instantly. The QR code entry system made checking in so fast and seamless!",
    rating: 5,
  },
  {
    id: "4",
    name: "Rakib Islam",
    role: "Tech Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content:
      "The tech conferences I found here helped me network with industry leaders. Highly recommend for professionals in Bangladesh.",
    rating: 5,
  },
];

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com/eventqul",
    icon: "Facebook",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/eventqul",
    icon: "Instagram",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/eventqul",
    icon: "Twitter",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/eventqul",
    icon: "LinkedIn",
  },
];

export const FOOTER_LINKS = {
  platform: [
    { name: "Browse Events", href: "/events" },
    { name: "Categories", href: "/categories" },
    { name: "Organizers", href: "/organizers" },
    { name: "Pricing", href: "/pricing" },
  ],
  organizers: [
    { name: "Become an Organizer", href: "/organizers/signup" },
    { name: "Organizer Dashboard", href: "/organizer" },
    { name: "Resources", href: "/resources" },
    { name: "Success Stories", href: "/stories" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refunds" },
  ],
};


export const organizers = [
              {
                name: "TechQul",
                events: 45,
                image:
                  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
              },
              {
                name: "Dhaka Events Hub",
                events: 78,
                image:
                  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&fit=crop",
              },
              {
                name: "HSC 96 Society",
                events: 120,
                image:
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
              },
              {
                name: "Startup Bangladesh",
                events: 56,
                image:
                  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=200&fit=crop",
              },
            ]
