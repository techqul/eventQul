export declare class TicketItemDto {
    ticketTypeId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    tickets: TicketItemDto[];
    couponCode?: string;
    paymentMethod?: string;
    attendeeName: string;
    attendeeEmail: string;
    attendeePhone: string;
}
