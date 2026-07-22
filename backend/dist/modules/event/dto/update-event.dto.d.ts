import { CreateEventDto } from './create-event.dto';
declare const UpdateEventDto_base: import("@nestjs/common").Type<Partial<Omit<CreateEventDto, "organizerSlug" | "venueSlug" | "categorySlug">>>;
export declare class UpdateEventDto extends UpdateEventDto_base {
}
export {};
