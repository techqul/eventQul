export interface Venue {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  area: string;
  capacity: number;
  mapImage: string;
  facilities: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}
