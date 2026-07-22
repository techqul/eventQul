"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderTimestampColumns1784700120417 = void 0;
class ReorderTimestampColumns1784700120417 {
    name = 'ReorderTimestampColumns1784700120417';
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE categories_new (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                slug character varying NOT NULL UNIQUE,
                name character varying NOT NULL,
                "name_bengali" character varying,
                icon character varying,
                color character varying,
                "event_count" integer NOT NULL DEFAULT 0,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP
            );
        `);
        await queryRunner.query(`
            INSERT INTO categories_new (id, slug, name, "name_bengali", icon, color, "event_count", created_at, updated_at, deleted_at)
            SELECT id, slug, name, "name_bengali", icon, color, "event_count", created_at, updated_at, deleted_at FROM categories;
        `);
        await queryRunner.query(`DROP TABLE categories CASCADE;`);
        await queryRunner.query(`ALTER TABLE categories_new RENAME TO categories;`);
        await queryRunner.query(`
            CREATE TABLE venues_new (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                slug character varying NOT NULL UNIQUE,
                name character varying NOT NULL,
                address character varying NOT NULL,
                city character varying NOT NULL,
                area character varying NOT NULL,
                capacity integer NOT NULL,
                "map_image" character varying,
                facilities jsonb NOT NULL DEFAULT '[]',
                coordinates jsonb,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP
            );
        `);
        await queryRunner.query(`
            INSERT INTO venues_new (id, slug, name, address, city, area, capacity, "map_image", facilities, coordinates, created_at, updated_at, deleted_at)
            SELECT id, slug, name, address, city, area, capacity, "map_image", facilities, coordinates, created_at, updated_at, deleted_at FROM venues;
        `);
        await queryRunner.query(`DROP TABLE venues CASCADE;`);
        await queryRunner.query(`ALTER TABLE venues_new RENAME TO venues;`);
        await queryRunner.query(`
            CREATE TABLE organizers_new (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL UNIQUE,
                slug character varying NOT NULL UNIQUE,
                name character varying NOT NULL,
                logo character varying,
                banner character varying,
                description text,
                "is_verified" boolean NOT NULL DEFAULT false,
                rating numeric(3,2) NOT NULL DEFAULT 0,
                "total_events" integer NOT NULL DEFAULT 0,
                followers integer NOT NULL DEFAULT 0,
                "commission_rate" numeric(5,2) NOT NULL DEFAULT 10,
                "socialLinks" jsonb NOT NULL DEFAULT '{}',
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP,
                CONSTRAINT "FK_organizers_user" FOREIGN KEY ("user_id") REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
            );
        `);
        await queryRunner.query(`
            INSERT INTO organizers_new (id, "user_id", slug, name, logo, banner, description, "is_verified", rating, "total_events", followers, "commission_rate", "socialLinks", created_at, updated_at, deleted_at)
            SELECT id, "user_id", slug, name, logo, banner, description, "is_verified", rating, "total_events", followers, "commission_rate", "socialLinks", created_at, updated_at, deleted_at FROM organizers;
        `);
        await queryRunner.query(`DROP TABLE organizers CASCADE;`);
        await queryRunner.query(`ALTER TABLE organizers_new RENAME TO organizers;`);
        await queryRunner.query(`
            CREATE TABLE events_new (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "organizer_id" uuid NOT NULL,
                "venue_id" uuid NOT NULL,
                "category_id" uuid NOT NULL,
                slug character varying NOT NULL UNIQUE,
                title character varying NOT NULL,
                description text NOT NULL,
                "long_description" text,
                "cover_image" character varying,
                gallery jsonb NOT NULL DEFAULT '[]',
                "start_date" TIMESTAMP NOT NULL,
                "end_date" TIMESTAMP NOT NULL,
                timezone character varying NOT NULL,
                capacity integer NOT NULL,
                "sold_tickets" integer NOT NULL DEFAULT 0,
                status "public"."events_status_enum" NOT NULL DEFAULT 'upcoming',
                featured boolean NOT NULL DEFAULT false,
                trending boolean NOT NULL DEFAULT false,
                tags jsonb NOT NULL DEFAULT '[]',
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP,
                CONSTRAINT "FK_events_organizer" FOREIGN KEY ("organizer_id") REFERENCES organizers(id) ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_events_venue" FOREIGN KEY ("venue_id") REFERENCES venues(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_events_category" FOREIGN KEY ("category_id") REFERENCES categories(id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);
        await queryRunner.query(`
            INSERT INTO events_new (id, "organizer_id", "venue_id", "category_id", slug, title, description, "long_description", "cover_image", gallery, "start_date", "end_date", timezone, capacity, "sold_tickets", status, featured, trending, tags, created_at, updated_at, deleted_at)
            SELECT id, "organizer_id", "venue_id", "category_id", slug, title, description, "long_description", "cover_image", gallery, "start_date", "end_date", timezone, capacity, "sold_tickets", status, featured, trending, tags, created_at, updated_at, deleted_at FROM events;
        `);
        await queryRunner.query(`DROP TABLE events CASCADE;`);
        await queryRunner.query(`ALTER TABLE events_new RENAME TO events;`);
        await queryRunner.query(`
            CREATE TABLE ticket_types_new (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "event_id" uuid NOT NULL,
                name character varying NOT NULL,
                description text,
                price numeric(10,2) NOT NULL,
                currency character varying NOT NULL DEFAULT 'BDT',
                available integer NOT NULL,
                "max_per_purchase" integer NOT NULL DEFAULT 10,
                benefits jsonb NOT NULL DEFAULT '[]',
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP,
                CONSTRAINT "FK_ticket_types_event" FOREIGN KEY ("event_id") REFERENCES events(id) ON DELETE CASCADE ON UPDATE NO ACTION
            );
        `);
        await queryRunner.query(`
            INSERT INTO ticket_types_new (id, "event_id", name, description, price, currency, available, "max_per_purchase", benefits, created_at, updated_at, deleted_at)
            SELECT id, "event_id", name, description, price, currency, available, "max_per_purchase", benefits, created_at, updated_at, deleted_at FROM ticket_types;
        `);
        await queryRunner.query(`DROP TABLE ticket_types CASCADE;`);
        await queryRunner.query(`ALTER TABLE ticket_types_new RENAME TO ticket_types;`);
        await queryRunner.query(`
            CREATE TABLE orders_new (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "orderNumber" character varying NOT NULL UNIQUE,
                subtotal numeric(10,2) NOT NULL DEFAULT 0,
                discount numeric(10,2) NOT NULL DEFAULT 0,
                total numeric(10,2) NOT NULL DEFAULT 0,
                status "public"."orders_status_enum" NOT NULL DEFAULT 'pending',
                "coupon_code" character varying,
                "payment_method" character varying,
                "payment_status" character varying NOT NULL DEFAULT 'pending',
                "paid_at" TIMESTAMP,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP,
                CONSTRAINT "FK_orders_user" FOREIGN KEY ("user_id") REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
            );
        `);
        await queryRunner.query(`
            INSERT INTO orders_new (id, "user_id", "orderNumber", subtotal, discount, total, status, "coupon_code", "payment_method", "payment_status", "paid_at", created_at, updated_at, deleted_at)
            SELECT id, "user_id", "orderNumber", subtotal, discount, total, status, "coupon_code", "payment_method", "payment_status", "paid_at", created_at, updated_at, deleted_at FROM orders;
        `);
        await queryRunner.query(`DROP TABLE orders CASCADE;`);
        await queryRunner.query(`ALTER TABLE orders_new RENAME TO orders;`);
        await queryRunner.query(`
            CREATE TABLE tickets_new (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "order_id" uuid NOT NULL,
                "event_id" uuid NOT NULL,
                "ticket_type_id" uuid NOT NULL,
                "qrCode" character varying NOT NULL UNIQUE,
                "attendee_name" character varying NOT NULL,
                "attendee_email" character varying NOT NULL,
                "attendee_phone" character varying NOT NULL,
                status "public"."tickets_status_enum" NOT NULL DEFAULT 'confirmed',
                "checked_in_at" TIMESTAMP,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP,
                CONSTRAINT "FK_tickets_order" FOREIGN KEY ("order_id") REFERENCES orders(id) ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_tickets_event" FOREIGN KEY ("event_id") REFERENCES events(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_tickets_ticket_type" FOREIGN KEY ("ticket_type_id") REFERENCES ticket_types(id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);
        await queryRunner.query(`
            INSERT INTO tickets_new (id, "order_id", "event_id", "ticket_type_id", "qrCode", "attendee_name", "attendee_email", "attendee_phone", status, "checked_in_at", created_at, updated_at, deleted_at)
            SELECT id, "order_id", "event_id", "ticket_type_id", "qrCode", "attendee_name", "attendee_email", "attendee_phone", status, "checked_in_at", created_at, updated_at, deleted_at FROM tickets;
        `);
        await queryRunner.query(`DROP TABLE tickets CASCADE;`);
        await queryRunner.query(`ALTER TABLE tickets_new RENAME TO tickets;`);
        await queryRunner.query(`CREATE INDEX "IDX_organizers_user_id" ON "organizers" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_organizers_slug" ON "organizers" ("slug")`);
        await queryRunner.query(`CREATE INDEX "IDX_organizers_is_verified" ON "organizers" ("is_verified")`);
        await queryRunner.query(`CREATE INDEX "IDX_venues_slug" ON "venues" ("slug")`);
        await queryRunner.query(`CREATE INDEX "IDX_events_organizer_id" ON "events" ("organizer_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_events_category_id" ON "events" ("category_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_events_status" ON "events" ("status")`);
        await queryRunner.query(`CREATE INDEX "IDX_events_slug" ON "events" ("slug")`);
        await queryRunner.query(`CREATE INDEX "IDX_ticket_types_event_id" ON "ticket_types" ("event_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_orders_user_id" ON "orders" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_orders_orderNumber" ON "orders" ("orderNumber")`);
        await queryRunner.query(`CREATE INDEX "IDX_tickets_order_id" ON "tickets" ("order_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_tickets_event_id" ON "tickets" ("event_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_tickets_qrCode" ON "tickets" ("qrCode")`);
    }
    async down(queryRunner) {
        throw new Error('This migration cannot be easily reverted. Please manually restore from backup if needed.');
    }
}
exports.ReorderTimestampColumns1784700120417 = ReorderTimestampColumns1784700120417;
//# sourceMappingURL=1784700120417-ReorderTimestampColumns.js.map