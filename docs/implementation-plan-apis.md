# Implementation Plan: Organization, Event, and Order APIs

## Context

The EventQul project is a SaaS event ticketing marketplace with:
- **Backend**: NestJS with TypeORM and PostgreSQL
- **Frontend**: Next.js with existing type definitions
- **Current Status**: Only User entity and authentication are implemented

This plan implements the core APIs for the three primary entities: **Organizer**, **Event**, and **Order**, along with supporting entities (Category, Venue, TicketType) required for a functional system.

## Recommended Approach

### Phase 1: Supporting Entities (Categories & Venues)

**Why first?**: Events depend on Categories and Venues. These are simpler, reference data that Events will use.

**Files to create:**

1. **Category Entity & Module**
   - `backend/src/modules/categories/entities/category.entity.ts`
   - `backend/src/modules/categories/dto/create-category.dto.ts`
   - `backend/src/modules/categories/dto/update-category.dto.ts`
   - `backend/src/modules/categories/categories.service.ts`
   - `backend/src/modules/categories/categories.controller.ts`
   - `backend/src/modules/categories/categories.module.ts`

2. **Venue Entity & Module**
   - `backend/src/modules/venues/entities/venue.entity.ts`
   - `backend/src/modules/venues/dto/create-venue.dto.ts`
   - `backend/src/modules/venues/dto/update-venue.dto.ts`
   - `backend/src/modules/venues/venues.service.ts`
   - `backend/src/modules/venues/venues.controller.ts`
   - `backend/src/modules/venues/venues.module.ts`

**API Routes:**
```
GET    /categories       - List all categories (public)
GET    /categories/:id   - Get category by ID (public)
POST   /categories       - Create category (admin only)
PATCH  /categories/:id   - Update category (admin only)
DELETE /categories/:id   - Delete category (admin only)

GET    /venues           - List all venues (public)
GET    /venues/:id       - Get venue by ID (public)
POST   /venues           - Create venue (admin/organizer)
PATCH  /venues/:id       - Update venue (admin/organizer)
DELETE /venues/:id       - Delete venue (admin only)
```

### Phase 2: Organizer Module

**Why second?**: Events belong to Organizers. Organizers need to exist before creating Events.

**Files to create:**

1. **Organizer Entity & Module**
   - `backend/src/modules/organizers/entities/organizer.entity.ts`
     - One-to-one relationship with User
     - Fields: slug (unique), name, logo, banner, description, isVerified, rating, totalEvents, followers, commissionRate, socialLinks (JSONB)
   - `backend/src/modules/organizers/dto/create-organizer.dto.ts`
   - `backend/src/modules/organizers/dto/update-organizer.dto.ts`
   - `backend/src/modules/organizers/organizers.service.ts`
   - `backend/src/modules/organizers/organizers.controller.ts`
   - `backend/src/modules/organizers/organizers.module.ts`

**API Routes:**
```
POST   /organizers              - Create organizer profile (authenticated users)
GET    /organizers              - List all organizers (public, paginated)
GET    /organizers/:slug        - Get organizer by slug (public)
PATCH  /organizers/:slug        - Update organizer (owner/admin)
DELETE /organizers/:slug        - Delete organizer (admin only)
GET    /organizers/:slug/events - Get organizer's events (public)
POST   /organizers/:slug/verify - Verify organizer (admin only)
```

### Phase 3: Event Module (Core Feature)

**Why third?**: This is the main entity that users interact with.

**Files to create:**

1. **Event Entity & Module**
   - `backend/src/modules/events/entities/event.entity.ts`
     - Relationships: Many-to-One Organizer, Venue, Category
     - One-to-Many TicketTypes
     - Fields: title, slug, description, longDescription, coverImage, gallery (array), startDate, endDate, timezone, capacity, soldTickets, status (enum), featured, trending, tags (array)
   - `backend/src/modules/events/dto/create-event.dto.ts`
   - `backend/src/modules/events/dto/update-event.dto.ts`
   - `backend/src/modules/events/dto/query-event.dto.ts` (for search/filter)
   - `backend/src/modules/events/entities/ticket-type.entity.ts`
     - One-to-Many Event
     - Fields: name, description, price, currency, available, maxPerPurchase, benefits (array)
   - `backend/src/modules/events/events.service.ts`
   - `backend/src/modules/events/events.controller.ts`
   - `backend/src/modules/events/events.module.ts`

**API Routes:**
```
POST   /events                  - Create event (organizer/admin)
GET    /events                  - List events (public, with filters: search, category, date, price, sort)
GET    /events/:slug            - Get event by slug (public)
PATCH  /events/:slug            - Update event (owner/admin)
DELETE /events/:slug            - Delete event (admin only, soft delete)
GET    /events/:slug/ticket-types - Get ticket types for event (public)
POST   /events/:slug/ticket-types - Add ticket type (organizer/admin)
PATCH  /ticket-types/:id        - Update ticket type (organizer/admin)
DELETE /ticket-types/:id        - Delete ticket type (organizer/admin)
```

### Phase 4: Order & Ticket Module

**Why fourth?**: Orders depend on Events and TicketTypes existing.

**Files to create:**

1. **Order Entity & Module**
   - `backend/src/modules/orders/entities/order.entity.ts`
     - Many-to-One User
     - One-to-Many Tickets
     - Fields: orderNumber (unique), subtotal, discount, total, status, couponId (optional)
   - `backend/src/modules/orders/entities/ticket.entity.ts`
     - Many-to-One Order, Event, TicketType
     - Fields: qrCode (unique), attendeeInfo, status
   - `backend/src/modules/orders/dto/create-order.dto.ts`
   - `backend/src/modules/orders/orders.service.ts` (includes QR generation logic)
   - `backend/src/modules/orders/orders.controller.ts`
   - `backend/src/modules/orders/orders.module.ts`

**API Routes:**
```
POST   /orders                  - Create order (authenticated users)
GET    /orders                  - List user's orders (authenticated)
GET    /orders/:orderNumber     - Get order by number (owner/admin)
PATCH  /orders/:orderNumber/status - Update order status (admin)
POST   /tickets/:qrCode/verify  - Verify/check-in ticket (organizer/admin)
GET    /tickets/my              - Get user's tickets (authenticated)
```

### Phase 5: Database Migration

**Generate and run migration** after all entities are created:

```bash
cd backend
npm run typeorm -- migration:generate -n CreateOrganizersEventsOrders
npm run typeorm -- migration:run
```

**Expected migration will create:**
- categories table
- venues table
- organizers table (with FK to users)
- events table (with FK to organizers, venues, categories)
- ticket_types table (with FK to events)
- orders table (with FK to users, coupons)
- tickets table (with FK to orders, events, ticket_types)

### Phase 6: Frontend API Integration

**Update/create API service files:**

1. `frontend/src/lib/api/categories.ts`
2. `frontend/src/lib/api/venues.ts`
3. `frontend/src/lib/api/organizers.ts`
4. `frontend/src/lib/api/events.ts`
5. `frontend/src/lib/api/orders.ts`

Each should follow the pattern in `frontend/src/lib/api/auth.ts` using the `apiClient`.

## Critical Files to Reference

### Backend Patterns (Reuse These)

- **Entity Pattern**: `/backend/src/modules/users/entities/user.entity.ts`
  - Extend `BaseEntity` for timestamps and soft delete
  - Use `@Column({ name: 'field_name' })` for snake_case DB columns
  - Use custom transformer for dates
  - Implement `toJSON()` to exclude sensitive fields

- **Service Pattern**: `/backend/src/modules/users/users.service.ts`
  - Use `@InjectRepository` dependency injection
  - Implement CRUD with proper error handling (NotFoundException, ConflictException)
  - Use pagination with `findAndCount()`

- **Controller Pattern**: `/backend/src/modules/users/users.controller.ts`
  - Use decorators: `@UseGuards(JwtAuthGuard, RolesGuard)`, `@Roles()`, `@ResponseMessage()`
  - Return standardized responses via `ResponseInterceptor`

- **DTO Pattern**: `/backend/src/modules/users/dto/create-user.dto.ts`
  - Use class-validator decorators for validation
  - Use `@ApiProperty()` for Swagger docs

### Frontend Type Definitions (Already Exist)

- `/frontend/src/types/organizer.ts` - Organizer interface
- `/frontend/src/types/event.ts` - Event interface and EventFilter
- `/frontend/src/types/ticket.ts` - TicketType, Ticket, Order interfaces
- `/frontend/src/types/category.ts` - Category interface
- `/frontend/src/types/venue.ts` - Venue interface

### Frontend API Pattern (Reuse This)

- `/frontend/src/lib/api-client.ts` - Base API client with auth
- `/frontend/src/lib/api/auth.ts` - Example API service pattern

## Important Considerations

1. **Slug Generation**: Implement slug generation (e.g., `slugify()`) for Events, Organizers, Categories, Venues to ensure URL-friendly unique identifiers

2. **Soft Delete**: All entities should extend `BaseEntity` which includes soft delete (`deletedAt` column)

3. **Enum Types**: Define enums in separate files (e.g., `backend/src/modules/events/types/event-status.enum.ts`)

4. **QR Code Generation**: For tickets, use a library like `qrcode` to generate unique QR codes

5. **Date Handling**: Use the existing `dateTransformer` pattern to return ISO strings instead of Date objects

6. **Validation**: Ensure all DTOs have proper validation decorators

7. **Authorization**:
   - Public: GET endpoints for discovery
   - User: Order creation, profile access
   - Organizer: Event/ticket-type management (their own)
   - Admin: Full access

## Implementation Order Summary

1. **Categories & Venues** (supporting entities)
2. **Organizers** (required for Events)
3. **Events & TicketTypes** (core feature)
4. **Orders & Tickets** (transactions)
5. **Migration** (database schema)
6. **Frontend API integration** (consume the APIs)

## Verification Steps

1. **Backend**:
   - Run `npm run start:dev` in backend
   - Visit Swagger UI at `http://localhost:3002/api/docs`
   - Test each endpoint via Swagger
   - Verify database tables created correctly

2. **Frontend**:
   - Test API calls using browser DevTools
   - Verify data displays correctly on existing pages
   - Check authentication tokens are passed correctly

3. **Integration**:
   - Create a test organizer via API
   - Create a category and venue
   - Create an event with ticket types
   - Create an order and verify tickets are generated with QR codes
