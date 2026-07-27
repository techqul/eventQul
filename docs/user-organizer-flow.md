# User and Organizer Flow Documentation

This document explains the user registration and organization (organizer) creation flow in the eventQul application.

---

## Overview

The system has a **One-to-One** relationship between Users and Organizers:
- Each user can have at most one organizer profile
- Each organizer belongs to exactly one user

---

## User Roles

| Role | Description |
|------|-------------|
| `USER` | Regular event attendees - can browse events, purchase tickets, manage orders |
| `ORGANIZER` | Event creators - all user permissions + create/manage events, view analytics |
| `ADMIN` | System administrators - full system access, user management, platform configuration |

---

## Step 1: Register as a User

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Pass1234",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Required Fields:**
| Field | Validation |
|-------|------------|
| `email` | Valid email, must be unique |
| `password` | Min 8 chars, must contain uppercase, lowercase, and number |
| `firstName` | 2-50 characters |
| `lastName` | 2-50 characters |

**Optional Fields:**
- `role` (defaults to `USER`)
- `nickName`, `phoneNumber`, `instituteName`, `district`, `dob`
- `bloodGroup`, `gender`, `tshirtSize`

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "status": "active"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

---

## Step 2: Login (if needed)

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Pass1234"
}
```

**Response:** Same as registration (user info + tokens)

**Token Expiration:**
- Access Token: 15 minutes
- Refresh Token: 7 days

**Usage:** Include `Authorization: Bearer <access_token>` header for protected routes

---

## Step 3: Create Organizer Profile

**Endpoint:** `POST /organizers`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "slug": "my-event-company",
  "name": "My Event Company",
  "logo": "https://example.com/logo.png",
  "banner": "https://example.com/banner.png",
  "description": "We organize amazing events",
  "socialLinks": {
    "facebook": "https://facebook.com/mycompany",
    "instagram": "https://instagram.com/mycompany",
    "twitter": "https://twitter.com/mycompany",
    "website": "https://mycompany.com"
  }
}
```

**Required Fields:**
| Field | Validation |
|-------|------------|
| `slug` | 2-100 chars, lowercase letters/numbers/hyphens only (`^[a-z0-9-]+$`), must be unique |
| `name` | 2-100 characters, not empty |

**Optional Fields:**
- `logo` - URL string (max 500 chars)
- `banner` - URL string (max 500 chars)
- `description` - Text
- `socialLinks` - Object with optional `facebook`, `instagram`, `twitter`, `website`

**Response:**
```json
{
  "id": "uuid",
  "userId": "user_uuid",
  "slug": "my-event-company",
  "name": "My Event Company",
  "isVerified": false,
  "rating": "0.00",
  "totalEvents": 0,
  "followers": 0,
  "commissionRate": "10.00",
  "socialLinks": {},
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Business Rules & Validations

### Organizer Creation
- ✅ Any authenticated user can create an organizer (USER, ORGANIZER, ADMIN roles)
- ❌ User cannot have more than one organizer profile
- ❌ Slug must be unique across all organizers
- ✅ Organizer profile is automatically linked to the authenticated user

### Auto-Set Fields
The following fields are automatically set by the system:
- `id` - UUID auto-generated
- `userId` - Linked to authenticated user
- `isVerified` - defaults to `false`
- `rating` - defaults to `0.00`
- `totalEvents` - defaults to `0`
- `followers` - defaults to `0`
- `commissionRate` - defaults to `10.00`
- `socialLinks` - defaults to `{}`
- `createdAt`, `updatedAt` - auto-managed timestamps

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER REGISTRATION                            │
├─────────────────────────────────────────────────────────────────┤
│  POST /auth/register                                            │
│  → Create user with email, password, name                        │
│  → Hash password with bcrypt                                    │
│  → Set status to ACTIVE                                          │
│  → Generate JWT tokens (access + refresh)                       │
└─────────────────────────────────────────────────────────────────┘
                                   ↓
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION                               │
├─────────────────────────────────────────────────────────────────┤
│  POST /auth/login                                                │
│  → Validate email/password                                      │
│  → Check user status is ACTIVE                                   │
│  → Update lastLoginAt timestamp                                 │
│  → Return JWT tokens                                            │
└─────────────────────────────────────────────────────────────────┘
                                   ↓
┌─────────────────────────────────────────────────────────────────┐
│                  CREATE ORGANIZER PROFILE                        │
├─────────────────────────────────────────────────────────────────┤
│  POST /organizers (with JWT auth header)                        │
│  → Extract userId from JWT token                                 │
│  → Check user doesn't already have organizer                   │
│  → Check slug is unique                                         │
│  → Create organizer with userId + form data                     │
│  → Return organizer profile                                      │
└─────────────────────────────────────────────────────────────────┘
                                   ↓
┌─────────────────────────────────────────────────────────────────┐
│                  READY TO CREATE EVENTS!                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Access Control Summary

| Action | Endpoint | Access Level |
|--------|----------|--------------|
| Register | `POST /auth/register` | Public |
| Login | `POST /auth/login` | Public |
| Refresh Token | `POST /auth/refresh` | Public |
| Logout | `POST /auth/logout` | Authenticated |
| Get Current User | `GET /auth/me` | Authenticated |
| **Create Organizer** | **`POST /organizers`** | **Authenticated (any role)** |
| View Organizers | `GET /organizers` | Public |
| View Organizer by Slug | `GET /organizers/slug/:slug` | Public |
| Update Organizer | `PATCH /organizers/:id` | Owner or Admin |
| Delete Organizer | `DELETE /organizers/:id` | Admin only |
| Verify Organizer | `PATCH /organizers/:id/verify` | Admin only |

---

## Key Files Reference

| Module | File Path |
|--------|-----------|
| User Entity | `backend/src/modules/users/entities/user.entity.ts` |
| Auth Service | `backend/src/modules/auth/auth.service.ts` |
| Auth Controller | `backend/src/modules/auth/auth.controller.ts` |
| Organizer Entity | `backend/src/modules/organizer/entities/organizer.entity.ts` |
| Organizer Service | `backend/src/modules/organizer/organizers.service.ts` |
| Organizer Controller | `backend/src/modules/organizer/organizers.controller.ts` |
| Create Organizer DTO | `backend/src/modules/organizer/dto/create-organizer.dto.ts` |
| User Roles | `backend/src/modules/users/types/index.ts` |

---

## Security Features

1. **Password Hashing** - Bcrypt with configurable rounds (default 10)
2. **Password Validation** - Must meet complexity requirements
3. **JWT Expiration** - Short-lived access tokens (15 min)
4. **Refresh Token Rotation** - New tokens on refresh
5. **Soft Delete** - Users/Organizers marked deleted, not actually removed
6. **Password Exclusion** - Never returned in API responses
7. **Status Checks** - Inactive/suspended users cannot login
8. **Unique Constraints** - Email, userId (in organizer), slug enforced at DB level

---

*Last updated: July 2026*
