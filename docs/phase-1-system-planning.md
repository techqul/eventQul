# Phase 1: System Planning - EventQul Backend Architecture

## Context

The EventQul frontend is a complete Next.js application with mock data for a SaaS Event Ticketing Marketplace. We need to design and build a production-grade NestJS backend that supports:

**7 Core Entities** identified from frontend:
- Event, Organizer, Venue, Category, TicketType, Ticket/Order, User, Notification

**3 User Roles**:
- User (event attendees)
- Organizer (event creators)
- Admin (platform managers)

**20 Pages/Routes** across:
- Public (event discovery, organizer signup)
- User Dashboard (tickets, profile)
- Organizer Dashboard (events, analytics)
- Admin Dashboard (platform management)

**Key Features Required**:
- Multi-role authentication (JWT + Refresh Token)
- Event CRUD with search/filter/sort
- Organizer management with verification
- Ticket booking & QR generation
- Payment integration (bKash, others future-ready)
- Order & coupon system
- Notifications
- Analytics & reporting

---

## 1. Domain Analysis

### Core Domains

```
┌─────────────────────────────────────────────────────────────┐
│                    EVENTQUL PLATFORM                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   PUBLIC     │  │    ORGANIZER  │  │     ADMIN     │   │
│  │              │  │              │  │              │   │
│  │ • Browse     │  │ • Create     │  │ • Manage     │   │
│  │ • Search     │  │ • Manage     │  │ • Analytics  │   │
│  │ • Book       │  │ • Analytics   │  │ • Users      │   │
│  │ • Discover   │  │ • Tickets     │  │ • Payouts    │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                              │
│              ┌─────────────────────────┐                   │
│              │      USER DOMAIN        │                   │
│              │                         │                   │
│              │ • Profile • Tickets     │                   │
│              │ • Notifications • Orders│                   │
│              └─────────────────────────┘                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Business Rules

1. **Organizer Verification**: Organizers must be verified before creating events
2. **Event Capacity**: Ticket sales cannot exceed event capacity
3. **Ticket Status Workflow**: pending → confirmed → used
4. **Commission**: Platform takes % from each booking (configurable)
5. **Soft Delete**: Events, users, venues should be soft-deleted
6. **Slug Uniqueness**: Events, organizers, venues, categories must have unique slugs
7. **Timezone Handling**: Events store timezone, display in user's local time
8. **QR Uniqueness**: Each ticket has unique QR code for validation

---

## 2. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Next.js)                        │
│                         (Already Completed - DO NOT TOUCH)              │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │ REST API (JSON)
                                       │
┌──────────────────────────────────────▼──────────────────────────────────┐
│                            API GATEWAY (NestJS)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │   Auth   │  │   User   │  │   Event  │  │ Organizer│  │ Admin  │  │
│  │  Guard   │  │  Guard   │  │  Guard   │  │  Guard   │  │ Guard  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘  │
│       │             │             │             │             │         │
│  ┌────▼────────┬───▼───────────▼────────────▼────────────▼───┐       │
│  │              CONTROLLER LAYER (Request Handling)             │       │
│  └──────────────────────────────┬───────────────────────────────┘       │
│                                 │                                       │
│  ┌──────────────────────────────▼───────────────────────────────┐       │
│  │              SERVICE LAYER (Business Logic)                  │       │
│  └──────────────────────────────┬───────────────────────────────┘       │
│                                 │                                       │
│  ┌──────────────────────────────▼───────────────────────────────┐       │
│  │              REPOSITORY LAYER (Data Access)                  │       │
│  └──────────────────────────────┬───────────────────────────────┘       │
└──────────────────────────────────┼───────────────────────────────────────┘
                                   │
                   ┌───────────────┴────────────────┐
                   │                                 │
        ┌──────────▼─────────┐          ┌─────────▼────────┐
        │   PostgreSQL (Data)  │          │   Redis (Cache)  │
        │                      │          │                  │
        │ • Users             │          │ • Sessions       │
        │ • Events            │          │ • OTP            │
        │ • Tickets           │          │ • Rate Limits    │
        │ • Orders            │          │ • Query Cache    │
        │ • Organizers        │          └──────────────────┘
        │ • Venues            │
        │ • Categories        │
        └─────────────────────┘
```

### Request Flow

```
Client Request
     │
     ▼
┌─────────────────┐
│ Validation Pipe │ (class-validator)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Auth Guard      │ (JWT + Role Check)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Controller      │ (Route Handler)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Service          │ (Business Logic)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Repository       │ (TypeORM)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Database/Cache   │
└─────────────────┘
```

---

## 3. Backend Folder Structure

```
backend/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app.module.ts                    # Root module
│   │
│   ├── config/                          # Configuration
│   │   ├── database.config.ts           # PostgreSQL config
│   │   ├── redis.config.ts              # Redis config
│   │   ├── jwt.config.ts                # JWT config
│   │   ├── swagger.config.ts            # Swagger config
│   │   └── app.config.ts                # App-wide config
│   │
│   ├── common/                          # Shared resources
│   │   ├── decorators/                  # Custom decorators
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── skip-auth.decorator.ts
│   │   ├── filters/                     # Exception filters
│   │   │   ├── http-exception.filter.ts
│   │   │   └── query-exception.filter.ts
│   │   ├── guards/                      # Auth guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── permission.guard.ts
│   │   ├── interceptors/                # Interceptors
│   │   │   ├── transform.interceptor.ts
│   │   │   └── cache.interceptor.ts
│   │   ├── pipes/                       # Custom pipes
│   │   │   └── validation.pipe.ts
│   │   ├── interfaces/                  # Shared interfaces
│   │   │   ├── response.interface.ts
│   │   │   └── pagination.interface.ts
│   │   └── constants/                   # Constants
│   │       ├── pagination.constant.ts
│   │       └── app.constant.ts
│   │
│   ├── database/                        # Database
│   │   ├── migrations/                  # TypeORM migrations
│   │   ├── seeds/                       # Seed data
│   │   └── migrations-source.ts         # Migration config
│   │
│   ├── modules/                         # Feature modules
│   │   ├── auth/                        # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── register.dto.ts
│   │   │   │   ├── login.dto.ts
│   │   │   │   ├── refresh-token.dto.ts
│   │   │   │   └── verify-email.dto.ts
│   │   │   └── strategies/
│   │   │       └── jwt.strategy.ts
│   │   │
│   │   ├── user/                        # User module
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── user.module.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       ├── update-user.dto.ts
│   │   │       └── user-query.dto.ts
│   │   │
│   │   ├── organizer/                   # Organizer module
│   │   │   ├── entities/
│   │   │   │   └── organizer.entity.ts
│   │   │   ├── organizer.controller.ts
│   │   │   ├── organizer.service.ts
│   │   │   ├── organizer.repository.ts
│   │   │   ├── organizer.module.ts
│   │   │   └── dto/
│   │   │
│   │   ├── category/                    # Category module
│   │   │   ├── entities/
│   │   │   │   └── category.entity.ts
│   │   │   ├── category.controller.ts
│   │   │   ├── category.service.ts
│   │   │   ├── category.repository.ts
│   │   │   ├── category.module.ts
│   │   │   └── dto/
│   │   │
│   │   ├── venue/                       # Venue module
│   │   │   ├── entities/
│   │   │   │   └── venue.entity.ts
│   │   │   ├── venue.controller.ts
│   │   │   ├── venue.service.ts
│   │   │   ├── venue.repository.ts
│   │   │   ├── venue.module.ts
│   │   │   └── dto/
│   │   │
│   │   ├── event/                       # Event module
│   │   │   ├── entities/
│   │   │   │   ├── event.entity.ts
│   │   │   │   └── ticket-type.entity.ts
│   │   │   ├── event.controller.ts
│   │   │   ├── event.service.ts
│   │   │   ├── event.repository.ts
│   │   │   ├── event.module.ts
│   │   │   └── dto/
│   │   │       ├── create-event.dto.ts
│   │   │       ├── update-event.dto.ts
│   │   │       ├── event-query.dto.ts
│   │   │       └── ticket-type.dto.ts
│   │   │
│   │   ├── order/                       # Order module
│   │   │   ├── entities/
│   │   │   │   ├── order.entity.ts
│   │   │   │   └── ticket.entity.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── order.service.ts
│   │   │   ├── order.repository.ts
│   │   │   ├── order.module.ts
│   │   │   └── dto/
│   │   │       ├── create-order.dto.ts
│   │   │       └── order-query.dto.ts
│   │   │
│   │   ├── payment/                     # Payment module
│   │   │   ├── payment.controller.ts
│   │   │   ├── payment.service.ts
│   │   │   ├── payment.module.ts
│   │   │   ├── dto/
│   │   │   ├── strategies/
│   │   │   │   ├── bkash.strategy.ts
│   │   │   │   └── payment.interface.ts
│   │   │   └── webhook/
│   │   │       └── bkash.webhook.ts
│   │   │
│   │   ├── coupon/                      # Coupon module
│   │   │   ├── entities/
│   │   │   │   └── coupon.entity.ts
│   │   │   ├── coupon.controller.ts
│   │   │   ├── coupon.service.ts
│   │   │   ├── coupon.repository.ts
│   │   │   ├── coupon.module.ts
│   │   │   └── dto/
│   │   │
│   │   ├── notification/                # Notification module
│   │   │   ├── entities/
│   │   │   │   └── notification.entity.ts
│   │   │   ├── notification.controller.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── notification.repository.ts
│   │   │   ├── notification.module.ts
│   │   │   └── dto/
│   │   │
│   │   ├── notification-template/       # Notification templates
│   │   │   ├── entities/
│   │   │   │   └── notification-template.entity.ts
│   │   │   ├── notification-template.service.ts
│   │   │   ├── notification-template.repository.ts
│   │   │   └── notification-template.module.ts
│   │   │
│   │   ├── role/                        # Role module
│   │   │   ├── entities/
│   │   │   │   └── role.entity.ts
│   │   │   ├── role.controller.ts
│   │   │   ├── role.service.ts
│   │   │   ├── role.repository.ts
│   │   │   ├── role.module.ts
│   │   │   └── dto/
│   │   │
│   │   ├── permission/                  # Permission module
│   │   │   ├── entities/
│   │   │   │   └── permission.entity.ts
│   │   │   ├── permission.service.ts
│   │   │   ├── permission.repository.ts
│   │   │   └── permission.module.ts
│   │   │
│   │   ├── dashboard/                   # Dashboard module
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── dashboard.service.ts
│   │   │   └── dashboard.module.ts
│   │   │
│   │   ├── analytics/                   # Analytics module
│   │   │   ├── analytics.controller.ts
│   │   │   ├── analytics.service.ts
│   │   │   └── analytics.module.ts
│   │   │
│   │   └── admin/                       # Admin module
│   │       ├── admin.controller.ts
│   │       ├── admin.service.ts
│   │       └── admin.module.ts
│   │
│   └── health/                          # Health check
│       ├── health.controller.ts
│       └── health.module.ts
│
├── test/                                 # Tests
│   ├── unit/
│   └── e2e/
│
├── .env.example                          # Environment variables template
├── .gitignore
├── nest-cli.json                         # NestJS CLI config
├── tsconfig.json                         # TypeScript config
├── package.json
└── README.md
```

---

## 4. Module Architecture

### Module Dependencies

```
                    ┌──────────────┐
                    │  App Module  │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
  ┌─────▼─────┐     ┌─────▼─────┐     ┌─────▼─────┐
  │   Auth    │     │   User    │     │   Health   │
  │  Module   │     │  Module   │     │  Module   │
  └───────────┘     └─────┬─────┘     └───────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
  ┌─────▼─────┐     ┌─────▼─────┐     ┌─────▼─────┐
  │ Organizer │     │ Category  │     │   Venue    │
  │  Module   │     │  Module   │     │  Module   │
  └─────┬─────┘     └───────────┘     └───────────┘
        │
        │
  ┌─────▼─────┐     ┌─────────────────────┐
  │  Event    │────▶│       Event         │
  │  Module   │     │    Dependencies     │
  └─────┬─────┘     └─────────────────────┘
        │
        │
  ┌─────▼─────┐     ┌──────────┐     ┌──────────┐
  │  Order    │────▶│ Payment  │     │ Coupon   │
  │  Module   │     │  Module  │     │  Module  │
  └───────────┘     └──────────┘     └──────────┘
                           │
                  ┌────────▼────────┐
                  │ Notification    │
                  │    Module       │
                  └─────────────────┘
                           │
                  ┌────────▼────────┐
                  │ Dashboard/      │
                  │  Analytics      │
                  └─────────────────┘
                           │
                  ┌────────▼────────┐
                  │    Admin        │
                  │    Module       │
                  └─────────────────┘
```

### Module Responsibilities

| Module | Responsibility | Exports |
|--------|----------------|---------|
| Auth | JWT generation, validation, refresh tokens | JwtStrategy,AuthGuard |
| User | User CRUD, profile management | User entity |
| Organizer | Organizer verification, profile management | Organizer entity |
| Category | Category CRUD (predefined seeds) | Category entity |
| Venue | Venue CRUD, capacity management | Venue entity |
| Event | Event CRUD, search, filter, sort | Event, TicketType entities |
| Order | Order creation, ticket generation, QR codes | Order, Ticket entities |
| Payment | Payment processing, webhooks | Payment strategies |
| Coupon | Coupon validation, application | Coupon entity |
| Notification | Notification creation, sending | Notification entity |
| Role | Role management | Role entity |
| Permission | Permission management | Permission entity |
| Dashboard | Aggregated stats for dashboards | - |
| Analytics | Advanced analytics, reports | - |
| Admin | Admin-specific operations | - |
| Health | Health check endpoints | - |

---

## 5. Naming Convention

### File Naming

```
Pattern: [name].[type].ts

Examples:
✓ user.entity.ts
✓ user.service.ts
✓ user.controller.ts
✓ create-user.dto.ts
✓ user-query.dto.ts

✗ User.entity.ts          (Don't capitalize)
✗ user-service.ts          (Don't use hyphens)
✗ userService.ts          (Don't camelCase for files)
```

### Class Naming

```
Pattern: [Name][Type]

Examples:
✓ class UserService {}
✓ class UserEntity {}
✓ class CreateUserDto {}
✓ class UserRepository {}

✗ class userService {}    (Don't lowercase)
✗ class user_service {}   (Don't snake_case)
```

### Variable/Method Naming

```
Variables: camelCase
Methods: camelCase
Constants: SCREAMING_SNAKE_CASE
Private: _camelCase

Examples:
✓ const userRepository
✓ async findAllUsers()
✓ const MAX_EVENTS
✓ private _validateUser()

✗ const User_Repository    (Don't)
✗ async FindAllUsers()    (Don't)
✗ const MAX_EVENTS        (Actually this is correct)
```

### Database Naming

```
Tables: snake_case, plural
Columns: snake_case
Indexes: idx_[table]_[column]
Foreign Keys: fk_[table]_[column]

Examples:
✓ users
✓ ticket_types
✓ idx_events_slug
✓ fk_events_organizer_id

✗ Users                 (Don't capitalize)
✗ TicketTypes           (Don't camelCase)
✗ events-organizer-id   (Don't use hyphens)
```

### API Endpoint Naming

```
Pattern: /api/v1/[resources]/[id]/[sub-resources]

RESTful Conventions:
GET    /api/v1/events          - List all events
GET    /api/v1/events/:id      - Get single event
POST   /api/v1/events          - Create event
PATCH  /api/v1/events/:id      - Update event
DELETE /api/v1/events/:id      - Delete event

GET    /api/v1/events/:id/tickets  - Get event tickets
```

---

## 6. Coding Convention

### 1. Use Strict TypeScript

```typescript
// ✓ Good
interface CreateUserDto {
  name: string;
  email: string;
  role: UserRole;
}

// ✗ Bad - Don't use any
interface CreateUserDto {
  name: any;
  email: any;
}
```

### 2. Use Class Validation

```typescript
// ✓ Good
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
```

### 3. Use DTOs for All Input/Output

```typescript
// ✓ Good - Always use DTOs
@Post()
async create(@Body() dto: CreateUserDto) {
  return this.service.create(dto);
}

// ✗ Bad - Don't use raw types
@Post()
async create(@Body() body: any) {
  return this.service.create(body);
}
```

### 4. Async/Await Always

```typescript
// ✓ Good
async findAll(): Promise<User[]> {
  return await this.repository.find();
}

// ✗ Bad - Don't omit await when needed
async findAll(): Promise<User[]> {
  return this.repository.find();
}
```

### 5. Error Handling

```typescript
// ✓ Good - Use specific exceptions
async findOne(id: string): Promise<User> {
  const user = await this.repository.findOne({ where: { id } });
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}

// ✗ Bad - Don't use generic errors
async findOne(id: string): Promise<User> {
  const user = await this.repository.findOne({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
```

### 6. Repository Pattern

```typescript
// ✓ Good - Use repository for data access
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

// ✗ Bad - Don't use TypeORM directly in service
@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<User[]> {
    return this.dataSource.getRepository(User).find();
  }
}
```

### 7. Use Constants

```typescript
// ✓ Good
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_EVENTS_PER_USER = 100;

// ✗ Bad - Don't use magic numbers
async findAll(page: number) {
  const limit = 20;  // Magic number
  const skip = page * 20;
}
```

### 8. Consistent Return Types

```typescript
// ✓ Good - Always wrap responses
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
}

@Get()
async findAll(): Promise<ApiResponse<User[]>> {
  const users = await this.userService.findAll();
  return {
    success: true,
    data: users,
  };
}

// ✗ Bad - Inconsistent responses
@Get()
async findAll() {
  return this.userService.findAll();
}

@Get(':id')
async findOne(@Param('id') id: string) {
  return { success: true, user: await this.userService.findOne(id) };
}
```

### 9. Use Enums for Fixed Values

```typescript
// ✓ Good
export enum UserRole {
  USER = 'user',
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  PAST = 'past',
  CANCELLED = 'cancelled',
}

// ✗ Bad - Don't use strings for fixed values
const role = 'user';
const status = 'upcoming';
```

### 10. Documentation

```typescript
// ✓ Good - Document complex logic
/**
 * Calculate total revenue from events
 * @param events - Array of events to calculate from
 * @returns Total revenue in BDT
 * @throws BadRequestException if events array is empty
 */
calculateTotalRevenue(events: Event[]): number {
  if (events.length === 0) {
    throw new BadRequestException('Cannot calculate revenue from empty events');
  }
  return events.reduce((sum, event) => sum + event.revenue, 0);
}

// ✓ Good - Document API endpoints
@ApiTags('Events')
@ApiResponse({ status: 200, description: 'Events retrieved successfully' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@Get()
findAll() {
  return this.eventService.findAll();
}
```

---

## 7. Database Design

### Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EVENTQUL DATABASE ERD                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│      USERS       │         │      ROLES       │         │    PERMISSIONS   │
├──────────────────┤         ├──────────────────┤         ├──────────────────┤
│ id (PK)          │         │ id (PK)          │         │ id (PK)          │
│ email (UNIQUE)   │         │ name (UNIQUE)    │         │ name (UNIQUE)    │
│ password         │    ┌────│ description      │         │ resource         │
│ name             │    │    └──────────────────┘         │ action           │
│ avatar           │    │                                 └──────────────────┘
│ phone            │    │                                        │
│ location         │    │            ┌──────────────────────────────────────┐
│ bio              │    │            │         ROLE_PERMISSIONS             │
│ role_id (FK)     │────┼────────────│ resource             │
│ is_verified      │    │            │ action               │
│ is_active        │    │            │ permission_id (FK)───│
│ created_at       │    │            │ role_id (FK)─────────│
│ updated_at       │    │            └──────────────────────────────────────┘
│ deleted_at       │    │
└──────────────────┘    │
         │              │
         │              │
         │    ┌─────────▼─────────┐
         │    │   ORGANIZERS      │
         │    ├───────────────────┤
         │    │ id (PK)           │
         │    │ user_id (FK, UNQ) │
         │    │ slug (UNIQUE)     │
         │    │ name              │
         │    │ logo              │
         │    │ banner            │
         │    │ description       │
         │    │ is_verified       │
         │    │ rating            │
         │    │ total_events      │
         │    │ followers         │
         │    │ commission_rate   │
         │    │ social_links      │
         │    │ created_at        │
         │    │ updated_at        │
         │    │ deleted_at        │
         │    └───────────────────┘
         │              │
         │              │
         │    ┌─────────▼──────────────────────┐
         │    │            EVENTS             │
         │    ├────────────────────────────────┤
         │    │ id (PK)                        │
         │    │ slug (UNIQUE)                  │
         │    │ title                          │
         │    │ description                    │
         │    │ long_description               │
         │    │ cover_image                    │
         │    │ gallery                        │
         │    │ organizer_id (FK)              │◄─────────┐
         │    │ venue_id (FK)                  │          │
         │    │ category_id (FK)               │          │
         │    │ start_date                     │          │
         │    │ end_date                       │          │
         │    │ timezone                       │          │
         │    │ capacity                       │          │
         │    │ sold_tickets                   │          │
         │    │ status                         │          │
         │    │ featured                       │          │
         │    │ trending                       │          │
         │    │ created_by (FK)                 │          │
         │    │ created_at                     │          │
         │    │ updated_at                     │          │
         │    │ deleted_at                     │          │
         │    └────────────────────────────────┘          │
         │              │                                   │
         │              │                                   │
         │    ┌─────────▼───────────┐         ┌───────────▼───────────┐
         │    │    TICKET_TYPES      │         │       VENUES          │
         │    ├─────────────────────┤         ├───────────────────────┤
         │    │ id (PK)              │         │ id (PK)               │
         │    │ event_id (FK)        │         │ slug (UNIQUE)         │
         │    │ name                 │         │ name                  │
         │    │ description          │         │ address               │
         │    │ price                │         │ city                  │
         │    │ currency             │         │ area                  │
         │    │ available            │         │ capacity              │
         │    │ max_per_purchase     │         │ map_image             │
         │    │ benefits             │         │ facilities            │
         │    │ sort_order           │         │ coordinates           │
         │    │ created_at           │         │ created_at            │
         │    │ updated_at           │         │ updated_at            │
         │    └─────────────────────┘         │ deleted_at            │
         │                                    └───────────────────────┘
         │                                               │
         │              ┌────────────────────────────────┘
         │              │
         │    ┌─────────▼─────────────────────────────────────────┐
         │    │                    CATEGORIES                       │
         │    ├─────────────────────────────────────────────────────┤
         │    │ id (PK)                                            │
         │    │ slug (UNIQUE)                                      │
         │    │ name                                               │
         │    │ name_bengali                                       │
         │    │ icon                                               │
         │    │ color                                              │
         │    │ event_count                                        │
         │    │ created_at                                         │
         │    │ updated_at                                         │
         │    └─────────────────────────────────────────────────────┘
         │
         │    ┌───────────────────────────────────────────────────────────┐
         │    │                         ORDERS                            │
         │    ├───────────────────────────────────────────────────────────┤
         │    │ id (PK)                                                  │
         │    │ order_number (UNIQUE)                                    │
         │    │ user_id (FK)                                             │
         │    │ status                                                   │
         │    │ subtotal                                                 │
         │    │ discount                                                 │
         │    │ convenience_fee                                         │
         │    │ total                                                    │
         │    │ coupon_id (FK, NULLABLE)                                 │
         │    │ payment_method                                           │
         │    │ payment_status                                          │
         │    │ paid_at                                                  │
         │    │ created_at                                               │
         │    │ updated_at                                               │
         │    └───────────────────────────────────────────────────────────┘
         │                    │
         │                    │
         │    ┌───────────────▼───────────────────────────────────────────┐
         │    │                        TICKETS                             │
         │    ├───────────────────────────────────────────────────────────┤
         │    │ id (PK)                                                  │
         │    │ order_id (FK)                                            │
         │    │ event_id (FK)                                            │
         │    │ ticket_type_id (FK)                                      │
         │    │ quantity                                                 │
         │    │ unit_price                                               │
         │    │ total_price                                              │
         │    │ status                                                   │
         │    │ qr_code (UNIQUE)                                         │
         │    │ attendee_name                                            │
         │    │ attendee_email                                           │
         │    │ attendee_phone                                           │
         │    │ checked_in_at                                            │
         │    │ created_at                                               │
         │    │ updated_at                                               │
         │    └───────────────────────────────────────────────────────────┘
         │
         │    ┌───────────────────────────────────────────────────────────┐
         │    │                        COUPONS                            │
         │    ├───────────────────────────────────────────────────────────┤
         │    │ id (PK)                                                  │
         │    │ code (UNIQUE)                                            │
         │    │ description                                              │
         │    │ type (PERCENTAGE/FIXED)                                  │
         │    │ value                                                    │
         │    │ min_order_value                                         │
         │    │ max_discount_amount                                     │
         │    │ usage_limit                                              │
         │    │ used_count                                               │
         │    │ valid_from                                               │
         │    │ valid_until                                              │
         │    │ is_active                                                │
         │    │ created_at                                               │
         │    │ updated_at                                               │
         │    └───────────────────────────────────────────────────────────┘
         │
         │    ┌───────────────────────────────────────────────────────────┐
         │    │                    NOTIFICATIONS                          │
         │    ├───────────────────────────────────────────────────────────┤
         │    │ id (PK)                                                  │
         │    │ user_id (FK)                                             │
         │    │ type                                                     │
         │    │ title                                                    │
         │    │ message                                                  │
         │    │ data (JSONB)                                             │
         │    │ is_read                                                  │
         │    │ action_url                                               │
         │    │ created_at                                               │
         │    └───────────────────────────────────────────────────────────┘
         │
         │    ┌───────────────────────────────────────────────────────────┐
         │    │              NOTIFICATION_TEMPLATES                       │
         │    ├───────────────────────────────────────────────────────────┤
         │    │ id (PK)                                                  │
         │    │ name (UNIQUE)                                            │
         │    │ type                                                     │
         │    │ subject_template                                         │
         │    │ body_template                                            │
         │    │ variables (JSONB)                                        │
         │    │ is_active                                                │
         │    │ created_at                                               │
         │    │ updated_at                                               │
         │    └───────────────────────────────────────────────────────────┘
```

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| User → Role | Many-to-One | Many users can have one role |
| Role → Permission | Many-to-Many | Roles have multiple permissions |
| User → Organizer | One-to-One | A user can be an organizer |
| Organizer → Event | One-to-Many | Organizer creates many events |
| Event → TicketType | One-to-Many | Event has many ticket types |
| Event → Venue | Many-to-One | Many events at one venue |
| Event → Category | Many-to-One | Event belongs to one category |
| User → Order | One-to-Many | User places many orders |
| Order → Ticket | One-to-Many | Order contains many tickets |
| Ticket → Event | Many-to-One | Ticket belongs to an event |
| User → Notification | One-to-Many | User receives many notifications |
| Order → Coupon | Many-to-One (Optional) | Order may use a coupon |

---

## 8. PostgreSQL Schema

### Complete SQL Schema

```sql
-- ============================================================================
-- EVENTQUL DATABASE SCHEMA
-- Version: 1.0.0
-- Author: EventQul Backend Team
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

-- User Roles
CREATE TYPE user_role AS ENUM ('user', 'organizer', 'admin');

-- Event Status
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'past', 'cancelled');

-- Order Status
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'cancelled', 'refunded');

-- Payment Status
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');

-- Payment Method
CREATE TYPE payment_method AS ENUM ('bkash', 'nagad', 'rocket', 'card', 'cod');

-- Ticket Status
CREATE TYPE ticket_status AS ENUM ('pending', 'confirmed', 'cancelled', 'used', 'refunded');

-- Notification Type
CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'event_reminder', 'ticket', 'payment', 'organizer');

-- Coupon Type
CREATE TYPE coupon_type AS ENUM ('percentage', 'fixed');

-- ============================================================================
-- TABLES
-- ============================================================================

-- ROLES
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PERMISSIONS
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    resource VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_permission UNIQUE (resource, action)
);

-- ROLE_PERMISSIONS (Junction Table)
CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, permission_id)
);

-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar VARCHAR(500),
    phone VARCHAR(20),
    location VARCHAR(100),
    bio TEXT,
    role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- INDEXES
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_is_verified ON users(is_verified);
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NULL;

-- ORGANIZERS
CREATE TABLE organizers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    logo VARCHAR(500),
    banner VARCHAR(500),
    description TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
    total_events INTEGER DEFAULT 0,
    followers INTEGER DEFAULT 0,
    commission_rate DECIMAL(5,2) DEFAULT 10.00 CHECK (commission_rate >= 0 AND commission_rate <= 100),
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- INDEXES
CREATE INDEX idx_organizers_user_id ON organizers(user_id);
CREATE INDEX idx_organizers_slug ON organizers(slug);
CREATE INDEX idx_organizers_is_verified ON organizers(is_verified);
CREATE INDEX idx_organizers_rating ON organizers(rating);
CREATE INDEX idx_organizers_deleted_at ON organizers(deleted_at) WHERE deleted_at IS NULL;

-- CATEGORIES
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    name_bengali VARCHAR(50),
    icon VARCHAR(50),
    color VARCHAR(100),
    event_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- VENUES
CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    area VARCHAR(50),
    capacity INTEGER,
    map_image VARCHAR(500),
    facilities TEXT[],
    coordinates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- INDEXES
CREATE INDEX idx_venues_slug ON venues(slug);
CREATE INDEX idx_venues_city ON venues(city);
CREATE INDEX idx_venues_deleted_at ON venues(deleted_at) WHERE deleted_at IS NULL;

-- EVENTS
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    long_description TEXT,
    cover_image VARCHAR(500),
    gallery TEXT[],
    organizer_id UUID REFERENCES organizers(id) ON DELETE CASCADE,
    venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    timezone VARCHAR(50) DEFAULT 'Asia/Dhaka',
    capacity INTEGER NOT NULL,
    sold_tickets INTEGER DEFAULT 0,
    status event_status DEFAULT 'upcoming',
    featured BOOLEAN DEFAULT FALSE,
    trending BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT chk_end_date_after_start CHECK (end_date > start_date),
    CONSTRAINT chk_sold_tickets_not_exceed_capacity CHECK (sold_tickets <= capacity)
);

-- INDEXES
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_venue ON events(venue_id);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_featured ON events(featured) WHERE featured = TRUE;
CREATE INDEX idx_events_trending ON events(trending) WHERE trending = TRUE;
CREATE INDEX idx_events_tags ON events USING GIN(tags);
CREATE INDEX idx_events_deleted_at ON events(deleted_at) WHERE deleted_at IS NULL;

-- Full-text search index
CREATE INDEX idx_events_fulltext ON events USING GIN(
    to_tsvector('english', title || ' ' || COALESCE(description, ''))
);

-- TICKET_TYPES
CREATE TABLE ticket_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    currency VARCHAR(3) DEFAULT 'BDT',
    available INTEGER NOT NULL DEFAULT 0,
    max_per_purchase INTEGER DEFAULT 10,
    benefits TEXT[],
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_available_non_negative CHECK (available >= 0)
);

-- INDEXES
CREATE INDEX idx_ticket_types_event ON ticket_types(event_id);
CREATE INDEX idx_ticket_types_sort_order ON ticket_types(sort_order);

-- COUPONS
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    type coupon_type NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    min_order_value DECIMAL(10,2) DEFAULT 0,
    max_discount_amount DECIMAL(10,2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_valid_dates CHECK (valid_until > valid_from),
    CONSTRAINT chk_usage_count CHECK (used_count <= usage_limit)
);

-- INDEXES
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_active ON coupons(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_coupons_validity ON coupons(valid_from, valid_until);

-- ORDERS
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status order_status DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    convenience_fee DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    coupon_id UUID REFERENCES coupons(id) ON DELETE SET NULL,
    payment_method payment_method,
    payment_status payment_status DEFAULT 'pending',
    payment_provider_order_id VARCHAR(100),
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_total_positive CHECK (total >= 0),
    CONSTRAINT chk_discount_valid CHECK (discount >= 0 AND discount <= subtotal)
);

-- INDEXES
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- TICKETS
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    ticket_type_id UUID REFERENCES ticket_types(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ticket_status DEFAULT 'pending',
    qr_code VARCHAR(255) UNIQUE NOT NULL,
    attendee_name VARCHAR(100),
    attendee_email VARCHAR(255),
    attendee_phone VARCHAR(20),
    checked_in_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_quantity_positive CHECK (quantity > 0),
    CONSTRAINT chk_total_price CHECK (total_price = quantity * unit_price)
);

-- INDEXES
CREATE INDEX idx_tickets_order ON tickets(order_id);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_tickets_qr_code ON tickets(qr_code);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_attendee_email ON tickets(attendee_email);

-- NOTIFICATION_TEMPLATES
CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    type notification_type NOT NULL,
    subject_template TEXT,
    body_template TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX idx_notification_templates_name ON notification_templates(name);
CREATE INDEX idx_notification_templates_type ON notification_templates(type);
CREATE INDEX idx_notification_templates_active ON notification_templates(is_active) WHERE is_active = TRUE;

-- NOTIFICATIONS
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizers_updated_at BEFORE UPDATE ON organizers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ticket_types_updated_at BEFORE UPDATE ON ticket_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_templates_updated_at BEFORE UPDATE ON notification_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR(20) AS $$
DECLARE
    order_num VARCHAR(20);
    timestamp_part VARCHAR(12);
    random_part VARCHAR(6);
BEGIN
    timestamp_part := TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISS');
    random_part := LPAD(FLOOR(RANDOM() * 1000000)::VARCHAR, 6, '0');
    order_num := 'EQ' || timestamp_part || random_part;
    RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Event listings with joined data
CREATE VIEW event_listings AS
SELECT
    e.id,
    e.slug,
    e.title,
    e.description,
    e.cover_image,
    e.start_date,
    e.end_date,
    e.timezone,
    e.status,
    e.featured,
    e.trending,
    e.capacity,
    e.sold_tickets,
    e.tags,
    o.id AS organizer_id,
    o.name AS organizer_name,
    o.slug AS organizer_slug,
    o.logo AS organizer_logo,
    o.rating AS organizer_rating,
    o.is_verified AS organizer_verified,
    v.id AS venue_id,
    v.name AS venue_name,
    v.address AS venue_address,
    v.city AS venue_city,
    c.id AS category_id,
    c.name AS category_name,
    c.slug AS category_slug,
    c.color AS category_color,
    -- Lowest price from ticket types
    (SELECT MIN(price) FROM ticket_types WHERE event_id = e.id) AS min_price,
    -- Highest price from ticket types
    (SELECT MAX(price) FROM ticket_types WHERE event_id = e.id) AS max_price,
    -- Count of ticket types
    (SELECT COUNT(*) FROM ticket_types WHERE event_id = e.id) AS ticket_type_count
FROM events e
LEFT JOIN organizers o ON e.organizer_id = o.id
LEFT JOIN venues v ON e.venue_id = v.id
LEFT JOIN categories c ON e.category_id = c.id
WHERE e.deleted_at IS NULL;

-- Organizer statistics
CREATE VIEW organizer_stats AS
SELECT
    o.id,
    o.name,
    o.slug,
    o.is_verified,
    o.rating,
    COUNT(DISTINCT e.id) AS event_count,
    COALESCE(SUM(
        CASE WHEN e.status IN ('upcoming', 'ongoing') THEN
            (SELECT COALESCE(SUM(t.total_price), 0)
             FROM tickets t
             JOIN orders o2 ON t.order_id = o2.id
             WHERE t.event_id = e.id AND o2.payment_status = 'completed')
        ELSE 0 END
    ), 0) AS total_revenue,
    COALESCE(SUM(
        CASE WHEN e.status IN ('upcoming', 'ongoing') THEN
            (SELECT COALESCE(SUM(t.quantity), 0)
             FROM tickets t
             JOIN orders o2 ON t.order_id = o2.id
             WHERE t.event_id = e.id AND o2.payment_status = 'completed')
        ELSE 0 END
    ), 0) AS total_tickets_sold
FROM organizers o
LEFT JOIN events e ON o.id = e.organizer_id AND e.deleted_at IS NULL
GROUP BY o.id, o.name, o.slug, o.is_verified, o.rating;

-- ============================================================================
-- SEED DATA (Initial Data)
-- ============================================================================

-- Insert default roles
INSERT INTO roles (id, name, description) VALUES
    (uuid_generate_v4(), 'user', 'Regular event attendees'),
    (uuid_generate_v4(), 'organizer', 'Event creators and managers'),
    (uuid_generate_v4(), 'admin', 'Platform administrators')
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions (basic set - can be expanded)
INSERT INTO permissions (name, resource, action, description) VALUES
    -- Event permissions
    ('events.view.any', 'events', 'view', 'View any events'),
    ('events.view.own', 'events', 'view:own', 'View own events'),
    ('events.create', 'events', 'create', 'Create new events'),
    ('events.update.own', 'events', 'update:own', 'Update own events'),
    ('events.delete.own', 'events', 'delete:own', 'Delete own events'),
    ('events.manage.any', 'events', 'manage:any', 'Manage any events'),
    -- Order permissions
    ('orders.view.own', 'orders', 'view:own', 'View own orders'),
    ('orders.create', 'orders', 'create', 'Create orders'),
    -- User permissions
    ('users.view.any', 'users', 'view', 'View any users'),
    ('users.manage.any', 'users', 'manage:any', 'Manage any users'),
    -- Organizer permissions
    ('organizers.view.any', 'organizers', 'view', 'View any organizers'),
    ('organizers.manage.any', 'organizers', 'manage:any', 'Manage any organizers')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to roles (basic RBAC)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.name IN (
    'events.view.any',
    'events.create',
    'events.update.own',
    'events.delete.own',
    'orders.view.own',
    'orders.create',
    'organizers.view.any'
)
WHERE r.name = 'organizer'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.name IN (
    'events.view.any',
    'orders.view.own',
    'orders.create'
)
WHERE r.name = 'user'
ON CONFLICT DO NOTHING;

-- Insert categories (from frontend constants)
INSERT INTO categories (slug, name, name_bengali, icon, color, event_count) VALUES
    ('concerts', 'Concerts & Music', 'কনসার্ট এবং সঙ্গীত', 'Music', 'from-purple-500 to-pink-600', 0),
    ('tech-conferences', 'Tech Conferences', 'টেক কনফারেন্স', 'Laptop', 'from-blue-500 to-cyan-600', 0),
    ('corporate-events', 'Corporate Events', 'কর্পোরেট ইভেন্ট', 'Briefcase', 'from-slate-500 to-slate-700', 0),
    ('sports', 'Sports', 'খেলাধুলা', 'Trophy', 'from-green-500 to-emerald-600', 0),
    ('arts-culture', 'Arts & Culture', 'শিল্প ও সংস্কৃতি', 'Palette', 'from-orange-500 to-red-600', 0),
    ('food-festival', 'Food & Festival', 'খাবার উৎসব', 'Utensils', 'from-yellow-500 to-orange-600', 0),
    ('startup-networking', 'Startup & Networking', 'স্টার্টআপ এবং নেটওয়ার্কিং', 'Rocket', 'from-indigo-500 to-purple-600', 0),
    ('workshops', 'Workshops', 'ওয়ার্কশপ', 'GraduationCap', 'from-teal-500 to-green-600', 0)
ON CONFLICT (slug) DO NOTHING;

-- Insert default notification templates
INSERT INTO notification_templates (name, type, subject_template, body_template, variables) VALUES
    ('order_confirmation', 'ticket', 'Your tickets for {{event_title}}', 'Hi {{attendee_name}}, your tickets for {{event_title}} on {{event_date}} have been confirmed!', '["attendee_name", "event_title", "event_date"]'),
    ('event_reminder', 'event_reminder', 'Reminder: {{event_title}} is tomorrow!', 'Hi {{user_name}}, just a reminder that {{event_title}} is happening tomorrow at {{event_time}}.', '["user_name", "event_title", "event_time"]'),
    ('organizer_verification', 'organizer', 'Your organizer account is verified!', 'Congratulations {{organizer_name}}, your EventQul organizer account has been verified. You can now create events!', '["organizer_name"]'),
    ('ticket_purchase', 'payment', 'Payment successful for {{event_title}}', 'Hi {{user_name}}, payment of {{amount}} BDT for {{event_title}} was successful. {{ticket_count}} ticket(s) have been booked.', '["user_name", "amount", "event_title", "ticket_count"]')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE users IS 'User accounts with authentication and profile information';
COMMENT ON TABLE organizers IS 'Organizer profiles linked to users';
COMMENT ON TABLE categories IS 'Event categories with multilingual support';
COMMENT ON TABLE venues IS 'Event venues with capacity and facilities';
COMMENT ON TABLE events IS 'Events with all details including dates, location, organizer';
COMMENT ON TABLE ticket_types IS 'Ticket types for events with pricing and availability';
COMMENT ON TABLE orders IS 'Customer orders with payment status';
COMMENT ON TABLE tickets IS 'Individual tickets with QR codes for validation';
COMMENT ON TABLE coupons IS 'Discount coupons with validity and usage limits';
COMMENT ON TABLE notifications IS 'User notifications for various events';
COMMENT ON TABLE notification_templates IS 'Templates for automated notifications';
COMMENT ON TABLE roles IS 'User roles for RBAC';
COMMENT ON TABLE permissions IS 'Permissions for fine-grained access control';
COMMENT ON TABLE role_permissions IS 'Junction table linking roles and permissions';

COMMENT ON COLUMN events.sold_tickets IS 'Number of tickets sold - updated via triggers or application logic';
COMMENT ON COLUMN organizers.commission_rate IS 'Platform commission percentage taken from organizer revenue';
COMMENT ON COLUMN orders.convenience_fee IS 'Flat fee or percentage added to orders';
COMMENT ON COLUMN tickets.qr_code IS 'Unique QR code for ticket validation at event entry';
COMMENT ON COLUMN tickets.checked_in_at IS 'Timestamp when ticket was scanned/used at event';
```

---

## 9. Migration Strategy

### Migration Approach

**Tool**: TypeORM with `typeorm` CLI

### Steps

1. **Initial Migration Setup**
```bash
npm install --save-dev @nestjs/typeorm typeorm
npm install pg        # PostgreSQL driver
```

2. **Generate Initial Migration**
```bash
npm run typeorm migration:generate -n InitialSchema
```

3. **Run Migration**
```bash
npm run typeorm migration:run
```

4. **Revert (if needed)**
```bash
npm run typeorm migration:revert
```

### Migration Best Practices

1. **Never modify existing migrations** - Always create new ones
2. **Test migrations on staging first** - Never run directly on production
3. **Use transactions** - Rollback on any error
4. **Backup before major migrations** - Safety first
5. **Document breaking changes** - Comment at top of migration file

### Migration File Template

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationName1234567890 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Write migration code here
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Write rollback code here
    }
}
```

---

## 10. Index Strategy

### Primary Indexes

| Table | Index | Type | Purpose |
|-------|-------|------|---------|
| users | email | B-tree | Unique login lookup |
| users | is_active, deleted_at | B-tree | Filter active users |
| events | slug | B-tree | Unique event lookup |
| events | start_date | B-tree | Date range queries |
| events | status | B-tree | Filter by status |
| events | featured | Partial (WHERE) | Featured events listing |
| events | title + description | GIN (tsvector) | Full-text search |
| orders | order_number | B-tree | Unique order lookup |
| orders | user_id, created_at | B-tree | User order history |
| tickets | qr_code | B-tree | Unique ticket scan |
| tickets | event_id, status | B-tree | Event ticket validation |
| coupons | code | B-tree | Coupon lookup |
| coupons | valid_from, valid_until | B-tree | Validity check |

### Composite Indexes

```sql
-- Events filtering (category + date + status)
CREATE INDEX idx_events_filter ON events(category_id, start_date, status)
WHERE deleted_at IS NULL;

-- Organizer events (for organizer dashboard)
CREATE INDEX idx_events_organizer_date ON events(organizer_id, start_date DESC)
WHERE deleted_at IS NULL;

-- User notifications (unread + date)
CREATE INDEX idx_notifications_unread_user ON notifications(user_id, is_read, created_at DESC)
WHERE is_read = FALSE;

-- Order analytics (date + payment status)
CREATE INDEX idx_orders_analytics ON orders(created_at, payment_status);
```

### Specialized Indexes

```sql
-- Full-text search on events
CREATE INDEX idx_events_search ON events
USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- JSONB indexes for flexible queries
CREATE INDEX idx_organizers_social_links ON organizers USING GIN(social_links);
CREATE INDEX idx_events_tags ON events USING GIN(tags);
CREATE INDEX idx_notifications_data ON notifications USING GIN(data);

-- Partial indexes for common queries
CREATE INDEX idx_upcoming_events ON events(start_date, id)
WHERE status = 'upcoming' AND deleted_at IS NULL;

CREATE INDEX idx_active_organizers ON organizers(id, name)
WHERE is_verified = TRUE AND deleted_at IS NULL;
```

---

## 11. API Flow

### Standard Request/Response Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT REQUEST                            │
│                     POST /api/v1/orders                         │
│                     Body: { eventId, tickets }                  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VALIDATION PIPE                               │
│              - Parse DTO with class-validator                   │
│              - Validate required fields                         │
│              - Transform types (string → number)                 │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AUTH GUARD                                  │
│              - Verify JWT from header                           │
│              - Check user is active                             │
│              - Attach user to request                           │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CONTROLLER                                    │
│           const order = await this.orderService.create(dto)     │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE                                     │
│  1. Validate event exists & has capacity                        │
│  2. Check ticket availability                                  │
│  3. Validate coupon (if provided)                              │
│  4. Calculate totals                                            │
│  5. Create order (pending)                                      │
│  6. Initiate payment                                            │
│  7. Return payment URL                                          │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REPOSITORY                                    │
│              - Query database with TypeORM                       │
│              - Apply business rules in WHERE                     │
│              - Return entities                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  DATABASE (PostgreSQL)                           │
│              - Execute query                                     │
│              - Return results                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              TRANSFORM INTERCEPTOR                              │
│         - Wrap response in standard format                      │
│         - Remove sensitive data                                 │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RESPONSE                                    │
│  {                                                             │
│    success: true,                                              │
│    message: "Order created successfully",                       │
│    data: { orderId, paymentUrl }                               │
│  }                                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Response Format Standard

### Success Response

```typescript
interface ApiResponse<T> {
  success: true;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
```

### Error Response

```typescript
interface ApiError {
  success: false;
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
  statusCode: number;
}
```

### Examples

```typescript
// Success - Single Item
{
  "success": true,
  "message": "Event retrieved successfully",
  "data": {
    "id": "...",
    "title": "Tech Summit 2025",
    ...
  }
}

// Success - List with Pagination
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}

// Error - Validation
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "password", "message": "Password must be at least 8 characters" }
  ],
  "statusCode": 400
}

// Error - Not Found
{
  "success": false,
  "message": "Event with ID 'xxx' not found",
  "statusCode": 404
}
```

---

## 13. Swagger Documentation

### Swagger Configuration

```typescript
// config/swagger.config.ts
export const swaggerConfig = new DocumentBuilder()
  .setTitle('EventQul API')
  .setDescription('SaaS Event Ticketing Platform API')
  .setVersion('1.0.0')
  .addTag('Auth', 'Authentication endpoints')
  .addTag('Users', 'User management')
  .addTag('Events', 'Event discovery and management')
  .addTag('Organizers', 'Organizer profiles and verification')
  .addTag('Orders', 'Order and ticket management')
  .addTag('Payments', 'Payment processing')
  .addBearerAuth()
  .build();
```

### API Documentation Standards

```typescript
@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
export class EventController {
  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Events retrieved successfully', type: [EventEntity] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Query() query: EventQueryDto) {
    return this.eventService.findAll(query);
  }
}
```

---

## 14. Next Steps (Phase 2 Preview)

**Phase 2: Project Setup** will generate:

1. NestJS project initialization
2. Package configuration with all dependencies
3. Folder structure creation
4. Environment variables setup
5. Configuration modules (Database, Redis, JWT, Swagger)
6. Validation pipe setup
7. Exception filters
8. Health check module

---

## Approval Required

Before proceeding to Phase 2, please confirm:

1. ✅ Database schema and ERD align with frontend types
2. ✅ Module structure supports all frontend features
3. ✅ Naming conventions are acceptable
4. ✅ Index strategy is sound for scalability
5. ✅ Migration strategy is clear
6. ✅ API response format matches frontend expectations

**Once approved, I will proceed to Phase 2: Project Setup.**
