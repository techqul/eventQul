export declare class Venue {
    id: string;
    slug: string;
    name: string;
    address: string;
    city: string;
    area: string;
    capacity: number;
    mapImage?: string;
    facilities: string[];
    coordinates?: {
        lat: number;
        lng: number;
    };
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
