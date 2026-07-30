# PostgreSQL Functions for Order Details

This directory contains PostgreSQL functions to retrieve order details in a specific JSON format.

## Files

- `get_order_details.sql` - Basic version with multiple function variants
- `get_order_details_optimized.sql` - Optimized version with proper ticket aggregation

## How to Apply

### Option 1: Using psql command line
```bash
cd backend
psql -U your_username -d your_database -f src/database/functions/get_order_details_optimized.sql
```

### Option 2: Using npm script (if configured)
```bash
npm run db:functions:load
```

### Option 3: Using TypeORM query runner
Create a temporary migration or run directly in your database client.

## Usage

Once applied, you can call the function:

```sql
SELECT get_order_details_json('EQ-MS70TH7M-014Z56');
```

## Function: get_order_details_json

Returns order details in the specified JSON format including:
- Order information (id, orderNumber, totals, payment status)
- Attendee information (name, email, phone, tshirtSize, bloodGroup, dob, avatarUrl)
- Event information (title, venue, dates, time)
- QR Code from first ticket
- All tickets with their types (name, description, price, currency, isFree, benefits)

## Expected JSON Structure

```json
{
  "success": true,
  "message": "Order retrieved successfully",
  "data": {
    "id": "uuid",
    "qrCode": "TICKET-XXX",
    "attendeeName": "John Doe",
    "attendeeEmail": "john@example.com",
    "attendeePhone": "0123456789",
    "status": "pending",
    "tshirtSize": "L",
    "bloodGroup": "AB+",
    "dob": "2000-01-01",
    "avatarUrl": null,
    "eventTitle": "Event Name",
    "venuName": "Venue Name",
    "eventStartDate": "2026-10-30T03:00:00.000Z",
    "eventEndDate": "2026-10-30T15:00:00.000Z",
    "eventTime": "9:00AM-10:00PM",
    "orderNumber": "EQ-XXX",
    "subtotal": "1000.00",
    "discount": "0.00",
    "total": "1000.00",
    "platformCharge": 20,
    "couponCode": null,
    "paymentMethod": "mobile",
    "paymentStatus": "pending",
    "paidAt": null,
    "tickets": [...]
  }
}
```
