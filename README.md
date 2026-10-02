<div align="center">

# 🎪 EventQul

### A full-stack event ticketing marketplace: find events, book tickets, and check in at the door

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
<br/>
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-TypeORM-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Architecture](#-architecture) •
[Getting Started](#-getting-started) •
[API](#-api-reference) •
[Project Structure](#-project-structure)

</div>

---

## 📖 About

**EventQul** is a multi-role SaaS platform for event ticketing, built for the Bangladeshi market (BDT pricing, `Asia/Dhaka` timezone, SMS notifications, bKash-ready payments).

It has three kinds of users:

| Role | What they do |
|------|--------------|
| 🙋 **Attendee** (`user`) | Browses and searches events, buys tickets, downloads PDF tickets, and manages their profile |
| 🎤 **Organizer** (`organizer`) | Creates events and ticket tiers, manages venues, and verifies or checks in tickets by QR code |
| 🛡️ **Admin** (`admin`) | Manages users, categories, and organizer verification, and oversees orders across the platform |

The project is a monorepo with a **Next.js 15 (App Router)** frontend and a **NestJS 11** REST API backed by **PostgreSQL** and **Redis**.

---

## ✨ Features

### 🌐 Public experience
- **Event discovery**: home page with featured and trending events, a full event listing, and category browsing
- **Event detail pages** with SEO-friendly slugs, gallery, ticket tiers, organizer info, and an embedded venue map
- **Organizer directory** with public organizer profiles (`/organizers/[slug]`)
- **Organizer sign-up** flow so any user can become an organizer
- **SEO built in**: dynamic `sitemap.ts`, `robots.ts`, and JSON-LD structured data (Organization and WebSite)
- **Dark and light themes**, plus route-level `loading`, `error`, and `not-found` states

### 🎟️ Checkout & ticketing
- **One-page checkout** validated with React Hook Form and Zod (name, phone, district, institute, blood group, T-shirt size, DOB, and more)
- **Guest-friendly**: an attendee account is created automatically during checkout
- **Quantity selector** with per-purchase limits and live totals
- **Transactional order creation**: tickets are validated, stock is decremented, and sold counts are updated inside a single DB transaction, with a full rollback on failure
- **Unique QR code per ticket** and a human-readable order number (for example `EQ-MS70TH7M-014Z56`)
- **SMS order confirmation** sent to the attendee's phone
- **Download the ticket as a PDF** from the success page (html2canvas + jsPDF)
- **Order cancellation** that returns ticket stock inside a transaction

### 🎤 Organizer tools
- Create, update, and soft-delete **events** with multiple **ticket types** (price, stock, max per purchase, benefits)
- Manage **venues** (address, capacity, facilities, coordinates)
- **Verify** and **check in** tickets by scanning or entering the QR code
- Organizer dashboard (`/organizer`)

### 🛡️ Admin panel
- **User management** (list, create, update, delete)
- **Category** CRUD (includes Bengali names, icons, and colors)
- **Organizer verification** and deletion
- **Order status management** (pending → confirmed → cancelled / refunded)

### 🔐 Security & platform quality
- **JWT authentication** with access and refresh tokens (`15m` / `7d`)
- **Role-based access control** through `@Roles()` and `@Public()` decorators and global guards
- **bcrypt** password hashing
- **Helmet** security headers, **CORS**, **gzip compression**
- **Rate limiting** with `@nestjs/throttler` (default and strict tiers)
- **Global validation** with `class-validator` DTOs
- **Consistent response envelope** (`{ success, message, data }`) from a global interceptor and exception filters
- **Redis caching** through `cache-manager`
- **Health checks** (`/health`, `/health/detailed`, `/health/ready`, `/health/live`) for orchestration
- **URI API versioning** (`/api/v1/...`)
- **Soft deletes** on every core entity
- **Interactive Swagger docs** with bearer-auth support
- **Optimized PostgreSQL function** (`get_order_details_json`) that returns a full order with its tickets as JSON in one query

---

## 🛠 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- **Next.js 15** (App Router, route groups)
- **React 19** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives)
- **React Hook Form** + **Zod** validation
- **Framer Motion** animations
- **Recharts** dashboards
- **date-fns**, **react-day-picker**
- **html2canvas** + **jsPDF** for ticket PDFs
- **lucide-react** icons, **sonner** toasts

</td>
<td valign="top" width="50%">

### Backend
- **NestJS 11** + **TypeScript**
- **PostgreSQL** with **TypeORM** (migrations)
- **Redis** (`cache-manager-redis-store`)
- **Passport JWT** authentication
- **class-validator** / **class-transformer**
- **Swagger / OpenAPI**
- **@nestjs/terminus** health checks
- **@nestjs/throttler**, **Helmet**, **compression**
- **Axios** for the SMS gateway
- **Jest** + **Supertest** testing

</td>
</tr>
</table>

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    FRONTEND · Next.js 15 (:3000)                  │
│   (public)  ·  (user)/dashboard  ·  (organizer)  ·  (admin)       │
│        AuthContext  ·  typed API client  ·  shadcn/ui             │
└───────────────────────────────┬──────────────────────────────────┘
                                │  REST · JSON · Bearer JWT
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                  BACKEND · NestJS 11 (:3001/api/v1)               │
│                                                                    │
│  Helmet → CORS → Throttler → ValidationPipe → JwtAuthGuard        │
│        → RolesGuard → Controller → Service → TypeORM Repository   │
│                                                                    │
│  Modules: Auth · Users · Organizers · Events · Ticket Types ·     │
│           Venues · Categories · Orders · Tickets · OTP · Health   │
└───────────────┬───────────────────────────────┬──────────────────┘
                │                               │
        ┌───────▼────────┐              ┌───────▼────────┐        ┌──────────────┐
        │   PostgreSQL   │              │     Redis      │        │  SMS Gateway │
        │  data + funcs  │              │  cache · OTP   │        │ (netsmsbd)   │
        └────────────────┘              └────────────────┘        └──────────────┘
```

### Data model

```
User ──1:1── Organizer ──1:N── Event ──N:1── Venue
  │                              │  └──N:1── Category
  │                              │
  │                              └──1:N── TicketType
  │                                           │
  └──1:N── Order ──1:N── Ticket ──N:1─────────┘
                           (unique QR · status · checkedInAt)
```

| Enum | Values |
|------|--------|
| `UserRole` | `user` · `organizer` · `admin` |
| `EventStatus` | `upcoming` · `ongoing` · `past` · `cancelled` |
| `OrderStatus` | `pending` · `confirmed` · `cancelled` · `refunded` |
| `TicketStatus` | `pending` · `confirmed` · `used` · `cancelled` · `refunded` |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | **18+** (20 LTS recommended) |
| npm or yarn | latest |
| PostgreSQL | **14+** |
| Redis | **6+** |

> 💡 **Quick infra with Docker:**
> ```bash
> docker run -d --name eventqul-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=eventqul -p 5432:5432 postgres:16
> docker run -d --name eventqul-redis -p 6379:6379 redis:7
> ```

### 1️⃣ Clone the repository

```bash
git clone https://github.com/techqul/eventQul.git
cd eventQul
```

### 2️⃣ Set up the backend

```bash
cd backend
npm install

# Create your environment file
cp .env.example .env
```

Edit `.env` and set at least these values:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=eventqul
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=change-me
JWT_REFRESH_SECRET=change-me-too
CORS_ORIGIN=http://localhost:3000

# Optional: SMS confirmations (netsmsbd.com)
SMS_API_KEY=
SMS_API_SENDER_KEY=
SMS_API_MESSAGE=Your EventQul OTP is
```

Build the project, then run the database migrations. Migrations load from `dist/`, so the build must come first:

```bash
npm run build
npm run migration:run
```

*(Optional)* Load the optimized order-details SQL function:

```bash
psql -U postgres -d eventqul -f src/database/functions/get_order_details_optimized.sql
```

Start the API in watch mode:

```bash
npm run start:dev
```

✅ API: **http://localhost:3001/api/v1**
📚 Swagger docs: **http://localhost:3001/api/docs**
❤️ Health: **http://localhost:3001/api/v1/health**

### 3️⃣ Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env.local` and point it at the API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

Start the dev server:

```bash
npm run dev
```

🎉 Open **http://localhost:3000**

### 4️⃣ Try it out

1. Create an admin through Swagger: `POST /auth/register` with `"role": "admin"`.
2. As the admin, create a few **categories**, then a **venue**.
3. Register an organizer: `POST /organizers`. Verify it with `POST /organizers/:slug/verify`.
4. As the organizer, create an **event** and add **ticket types** to it.
5. On the frontend, open the event, click **Buy Ticket**, complete checkout, and download your PDF ticket.
6. Check the ticket in with `POST /tickets/:qrCode/check-in`.

> 🔑 In Swagger, click **Authorize** and paste the `accessToken` from the login response to call protected endpoints.

---

## 📜 Available Scripts

<table>
<tr><th>Backend (<code>/backend</code>)</th><th>Frontend (<code>/frontend</code>)</th></tr>
<tr>
<td valign="top">

| Script | Purpose |
|--------|---------|
| `npm run start:dev` | Run in watch mode |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run the compiled build |
| `npm run migration:run` | Apply migrations |
| `npm run migration:revert` | Roll back the last migration |
| `npm run migration:show` | List migration status |
| `npm run test` | Unit tests |
| `npm run test:e2e` | End-to-end tests |
| `npm run lint` | ESLint (with auto-fix) |
| `npm run format` | Prettier |

</td>
<td valign="top">

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server on `:3000` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Next.js lint |

</td>
</tr>
</table>

---

## 📡 API Reference

Every route is prefixed with **`/api/v1`**. 🔓 = public, 🔒 = requires a JWT, 👑 = restricted by role.

<details>
<summary><b>🔐 Auth</b></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/auth/register` | 🔓 |
| POST | `/auth/login` | 🔓 |
| POST | `/auth/refresh` | 🔓 |
| POST | `/auth/logout` | 🔒 |
| GET | `/auth/me` | 🔒 |
</details>

<details>
<summary><b>👤 Users</b></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/users` | 👑 Admin |
| GET / PATCH | `/users/me` | 🔒 |
| GET / PATCH / DELETE | `/users/:id` | 👑 Admin |
</details>

<details>
<summary><b>🎤 Organizers</b></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/organizers` | 🔒 Any role |
| GET | `/organizers` · `/organizers/:slug` | 🔓 |
| PATCH | `/organizers/:slug` | 👑 Organizer / Admin |
| POST | `/organizers/:slug/verify` | 👑 Admin |
| DELETE | `/organizers/:id` | 👑 Admin |
</details>

<details>
<summary><b>📅 Events & Ticket Types</b></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/events` (search, filter, paginate) | 🔓 |
| GET | `/events/:slug` | 🔓 |
| POST | `/events` | 👑 Organizer / Admin |
| PATCH / DELETE | `/events/:slug` | 👑 Organizer / Admin |
| GET | `/events/:slug/ticket-types` | 🔓 |
| POST | `/events/:slug/ticket-types` | 👑 Organizer / Admin |
| PATCH / DELETE | `/ticket-types/:id` | 👑 Organizer / Admin |
</details>

<details>
<summary><b>🏷️ Categories & 📍 Venues</b></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/categories` · `/categories/:id` · `/categories/slug/:slug` | 🔓 |
| POST / PATCH / DELETE | `/categories[/:id]` | 👑 Admin |
| GET | `/venues` · `/venues/:id` | 🔓 |
| POST / PATCH | `/venues[/:id]` | 👑 Organizer / Admin |
| DELETE | `/venues/:id` | 👑 Admin |
</details>

<details>
<summary><b>🧾 Orders & 🎟️ Tickets</b></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/orders` | 🔒 |
| GET | `/orders` | 🔒 |
| GET | `/orders/my-tickets` | 🔒 |
| GET | `/orders/:orderNumber` | 🔒 |
| POST | `/orders/:orderNumber/cancel` | 🔒 |
| PATCH | `/orders/:orderNumber/status` | 👑 Admin |
| POST | `/tickets/:qrCode/verify` | 👑 Organizer / Admin |
| POST | `/tickets/:qrCode/check-in` | 👑 Organizer / Admin |
</details>

<details>
<summary><b>📲 OTP & ❤️ Health</b></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/otp/send` · `/otp/verify` | 🔓 |
| GET | `/health` · `/health/detailed` · `/health/ready` · `/health/live` | 🔓 |
</details>

**Example: create an order**

```http
POST /api/v1/orders
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "tickets": [{ "ticketTypeId": "b3f1...", "quantity": 2 }],
  "paymentMethod": "bkash",
  "attendeeName": "John Doe",
  "attendeeEmail": "john@example.com",
  "attendeePhone": "01700000000"
}
```

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderNumber": "EQ-MS70TH7M-014Z56",
    "total": 1000,
    "status": "pending",
    "tickets": [{ "qrCode": "TICKET-...", "status": "confirmed" }]
  }
}
```

The full interactive spec lives at **`/api/docs`** (Swagger UI).

---

## 📁 Project Structure

```
eventQul/
├── backend/                         # NestJS REST API
│   ├── src/
│   │   ├── common/                  # Cross-cutting concerns
│   │   │   ├── decorators/          #   @Roles, @Public, @CurrentUser, @ResponseMessage
│   │   │   ├── guards/              #   JWT, roles, permissions
│   │   │   ├── interceptors/        #   Response envelope, caching
│   │   │   ├── filters/             #   HTTP and DB exception filters
│   │   │   └── pipes/ utils/ dto/   #   Validation, pagination, helpers
│   │   ├── config/                  # App, DB, JWT, Redis, Swagger config
│   │   ├── database/
│   │   │   ├── migrations/          # TypeORM migrations
│   │   │   └── functions/           # PostgreSQL JSON functions
│   │   ├── health/                  # Terminus health checks
│   │   ├── modules/
│   │   │   ├── auth/                # Register, login, refresh, JWT strategy
│   │   │   ├── users/               # User profiles and admin management
│   │   │   ├── organizer/           # Organizer profiles and verification
│   │   │   ├── event/               # Events and ticket types
│   │   │   ├── venue/               # Venues
│   │   │   ├── category/            # Categories
│   │   │   ├── order/               # Orders, tickets, QR check-in
│   │   │   └── otp/                 # SMS OTP and notifications
│   │   └── main.ts                  # Bootstrap (security, versioning, Swagger)
│   └── test/                        # E2E tests
│
├── frontend/                        # Next.js 15 App Router
│   └── src/
│       ├── app/
│       │   ├── (public)/            # Home, events, categories, organizers, checkout
│       │   ├── (user)/dashboard/    # Tickets, profile, notifications
│       │   ├── (organizer)/         # Organizer dashboard and event creation
│       │   ├── (admin)/             # Admin dashboard, users, events
│       │   ├── login/               # Authentication
│       │   ├── sitemap.ts robots.ts # SEO
│       ├── components/              # checkout/, events/, home/, layout/, ui/ (shadcn)
│       ├── contexts/AuthContext.tsx # Auth state
│       ├── lib/api/                 # Typed API clients per resource
│       ├── lib/validations/         # Zod schemas
│       └── types/                   # Shared TypeScript types
│
└── docs/                            # Architecture and API planning documents
```

---

## 🗺 Roadmap

- [ ] bKash and SSLCommerz payment gateway integration (config is already scaffolded)
- [ ] Coupon and discount engine
- [ ] In-app and email notifications
- [ ] Organizer analytics with live data (some dashboards still use mock data)
- [ ] S3 image uploads
- [ ] Docker Compose for one-command setup

---

## 📚 Further Reading

The [`docs/`](docs) folder covers the design in depth:

- [`phase-1-system-planning.md`](docs/phase-1-system-planning.md): domain analysis, architecture, business rules
- [`user-organizer-flow.md`](docs/user-organizer-flow.md): registration and organizer onboarding flow
- [`api-implementation-plan.md`](docs/api-implementation-plan.md): API design plan
- [`backend/src/database/functions/README.md`](backend/src/database/functions/README.md): SQL functions

---

<div align="center">

Built with ❤️ using **Next.js** and **NestJS**

⭐ If you find this project useful, give it a star!

</div>
