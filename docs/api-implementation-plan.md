# API Implementation Plan - Organizations, Events, and Orders

## Overview
This document outlines the implementation status and next steps for completing the API implementation for Organizations (Organizers), Events, Venues, Categories, and Orders modules in the eventQul backend application.

## Implementation Status Summary

### ✅ Completed Components

| Module | Entity | Service | Controller | DTOs | Module | Status |
|--------|--------|---------|------------|------|--------|--------|
| Categories | ✅ | ✅ | ✅ | ✅ | ✅ | Complete |
| Venues | ✅ | ✅ | ✅ | ✅ | ✅ | Complete |
| Organizers | ✅ | ✅ | ✅ | ✅ | ✅ | Complete |
| Events | ✅ | ✅ | ✅ | ✅ | ✅ | Complete |
| Orders | ✅ | ✅ | ✅ | ✅ | ✅ | Complete |
| Database Migration | ✅ | - | - | - | - | Created |

### Database Schema
The migration file `1784696120417-CreateOrganizersEventsOrders.ts` creates the following tables:
- `categories` - Event categories with icons, colors, and event counts
- `organizers` - Organization profiles linked to users
- `venues` - Event venues with capacity and facilities
- `events` - Events with organizer, venue, and category relationships
- `ticket_types` - Ticket pricing tiers for events
- `orders` - User orders with payment tracking
- `tickets` - Individual tickets with QR codes and check-in status

## API Endpoints Reference

### Categories API
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/categories` | Admin | Create new category |
| GET | `/categories` | Public | List all categories (paginated) |
| GET | `/categories/:id` | Public | Get category by ID |
| PATCH | `/categories/:id` | Admin | Update category |
| DELETE | `/categories/:id` | Admin | Delete category |

### Venues API
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/venues` | Organizer/Admin | Create new venue |
| GET | `/venues` | Public | List all venues (paginated) |
| GET | `/venues/:id` | Public | Get venue by ID |
| PATCH | `/venues/:id` | Organizer/Admin | Update venue |
| DELETE | `/venues/:id` | Admin | Delete venue |

### Organizers API
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/organizers` | User+ | Create organizer profile |
| GET | `/organizers` | Public | List all organizers (paginated) |
| GET | `/organizers/:slug` | Public | Get organizer by slug |
| PATCH | `/organizers/:slug` | Organizer/Admin | Update organizer |
| DELETE | `/organizers/:slug` | Admin | Delete organizer |
| POST | `/organizers/:slug/verify` | Admin | Verify organizer |

### Events API
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/events` | Organizer/Admin | Create new event |
| GET | `/events` | Public | List events (with filters) |
| GET | `/events/:slug` | Public | Get event by slug |
| PATCH | `/events/:slug` | Organizer/Admin | Update event |
| DELETE | `/events/:slug` | Organizer/Admin | Delete event |
| POST | `/events/:slug/ticket-types` | Organizer/Admin | Add ticket type |
| GET | `/events/:slug/ticket-types` | Public | Get event ticket types |
| PATCH | `/ticket-types/:id` | Organizer/Admin | Update ticket type |
| DELETE | `/ticket-types/:id` | Organizer/Admin | Delete ticket type |

### Events API Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `search` - Search in title and description
- `category` - Filter by category slug
- `status` - Filter by status (upcoming, ongoing, past, cancelled)
- `featured` - Show only featured events
- `trending` - Show only trending events

### Orders API
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/orders` | User | Create new order |
| GET | `/orders` | User | Get user's orders |
| GET | `/orders/my-tickets` | User | Get user's tickets |
| GET | `/orders/:orderNumber` | User | Get order by number |
| PATCH | `/orders/:orderNumber/status` | Admin | Update order status |
| POST | `/orders/:orderNumber/cancel` | User | Cancel order |

### Tickets API
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/tickets/:qrCode/verify` | Organizer/Admin | Verify ticket |
| POST | `/tickets/:qrCode/check-in` | Organizer/Admin | Check in ticket |

## Implementation Tasks

### Phase 1: Build and Migration ✏️ Pending
1. **Verify TypeScript Compilation**
   - Run `npm run build` to check for any compilation errors
   - Fix any import/export issues if found

2. **Run Database Migration**
   ```bash
   npm run migration:run
   ```
   - This will create all tables, indexes, and foreign keys
   - Verify tables are created in PostgreSQL

### Phase 2: Testing & Verification 🧪 Pending
1. **Test Categories API**
   - Create sample categories (Concerts, Sports, Workshops, etc.)
   - Test pagination
   - Verify CRUD operations

2. **Test Venues API**
   - Create sample venues with coordinates
   - Test facilities JSON field
   - Verify capacity validation

3. **Test Organizers API**
   - Create organizer profile for a user
   - Test slug uniqueness
   - Verify organizer ownership checks

4. **Test Events API**
   - Create complete event with ticket types
   - Test all filters (category, status, featured, trending, search)
   - Verify slug uniqueness
   - Test event status updates

5. **Test Orders & Tickets API**
   - Create order with multiple ticket types
   - Test transaction rollback on errors
   - Verify ticket availability checks
   - Test QR code generation
   - Test ticket verification and check-in
   - Test order cancellation with ticket restoration

### Phase 3: Enhanced Features 🔧 Optional
1. **Add Search for Organizers**
   - Add name search in `findAll` method
   - Update controller to accept search query param

2. **Add Search for Venues**
   - Add city/area search filters
   - Add capacity range filter

3. **Add Date Range Filter for Events**
   - Filter events by start/end date range
   - Useful for "events this week" queries

4. **Add Organizer Events Endpoint**
   - GET `/organizers/:slug/events` - Get all events by an organizer
   - Add to organizers controller

5. **Add Category Events Endpoint**
   - GET `/categories/:slug/events` - Get all events in a category
   - Add to categories controller

### Phase 4: Documentation 📚 Pending
1. **Verify Swagger Documentation**
   - Access `/api-docs` when server is running
   - Ensure all endpoints are documented
   - Verify response examples

2. **Create API Reference Document**
   - Document authentication flow
   - Document all endpoints with examples
   - Document error responses

## Known Considerations

### Authorization
- All endpoints use `JwtAuthGuard` for authenticated routes
- `RolesGuard` enforces role-based access control
- `@Public()` decorator marks public endpoints
- `@CurrentUser()` decorator injects authenticated user

### Validation
- All DTOs use `class-validator` decorators
- All DTOs use `class-transformer` for type transformation
- Slug validation ensures lowercase, alphanumeric with hyphens

### Pagination
- Standard pagination uses `page` and `limit` query params
- Response includes `data`, `page`, `size`, and `total`
- Default page is 1, default limit is 20

### Transactions
- Order creation uses database transactions
- On failure, all changes are rolled back
- Ensures data consistency for ticket inventory

### Soft Deletes
- Events use soft deletes (`deletedAt` column)
- Can be restored if needed
- Hard delete removes permanently

## Next Steps
1. Build the project to verify compilation
2. Run the database migration
3. Start the development server
4. Test endpoints via Swagger UI at `http://localhost:3000/api-docs`
5. Create sample data for testing
6. Verify all functionality works as expected

## Migration Commands Reference
```bash
# Show migration status
npm run migration:show

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Generate new migration
npm run migration:generate -n MigrationName
```

## Testing with cURL Examples

### Create Category (Admin)
```bash
curl -X POST http://localhost:3000/categories \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "concerts",
    "name": "Concerts",
    "nameBengali": "কনসার্ট",
    "icon": "music",
    "color": "#FF6B6B"
  }'
```

### Create Venue (Organizer/Admin)
```bash
curl -X POST http://localhost:3000/venues \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "bangabandhu-convention-center",
    "name": "Bangabandhu International Conference Center",
    "address": "Sher-e-Bangla Nagar, Agargaon, Dhaka",
    "city": "Dhaka",
    "area": "Agargaon",
    "capacity": 2000,
    "facilities": ["parking", "ac", "wifi"],
    "coordinates": {"lat": 23.7697, "lng": 90.3685}
  }'
```

### Create Organizer Profile
```bash
curl -X POST http://localhost:3000/organizers \
  -H "Authorization: Bearer <user-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "tech-events-bd",
    "name": "Tech Events Bangladesh",
    "description": "Leading tech event organizer",
    "socialLinks": {
      "facebook": "https://fb.com/techevents",
      "website": "https://techeventsbd.com"
    }
  }'
```

### Create Event
```bash
curl -X POST http://localhost:3000/events \
  -H "Authorization: Bearer <organizer-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "tech-summit-2024",
    "title": "Tech Summit 2024",
    "description": "The biggest tech conference",
    "startDate": "2024-12-15T10:00:00Z",
    "endDate": "2024-12-15T18:00:00Z",
    "timezone": "Asia/Dhaka",
    "organizerSlug": "tech-events-bd",
    "venueSlug": "bangabandhu-convention-center",
    "categorySlug": "concerts",
    "capacity": 500,
    "ticketTypes": [
      {
        "name": "VIP",
        "price": 500,
        "available": 100,
        "benefits": ["priority seating", "refreshments"]
      },
      {
        "name": "Regular",
        "price": 200,
        "available": 400
      }
    ]
  }'
```

### Create Order
```bash
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer <user-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "tickets": [
      {"ticketTypeId": "<vip-ticket-id>", "quantity": 2}
    ],
    "attendeeName": "John Doe",
    "attendeeEmail": "john@example.com",
    "attendeePhone": "+8801234567890",
    "paymentMethod": "bkash"
  }'
```
