export declare class CreateVenueDto {
    slug: string;
    name: string;
    address: string;
    city: string;
    area: string;
    capacity: number;
    mapImage?: string;
    facilities?: string[];
    coordinates?: {
        lat: number;
        lng: number;
    };
}
