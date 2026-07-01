export interface Organizer {
  id: string;
  name: string;
  slug: string;
  logo: string;
  banner: string;
  description: string;
  verified: boolean;
  rating: number;
  totalEvents: number;
  followers: number;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}
