import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrganizersEventsOrders1784696120417 implements MigrationInterface {
    name = 'CreateOrganizersEventsOrders1784696120417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Categories table
        await queryRunner.query(`CREATE TABLE "categories" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "name" character varying NOT NULL, "name_bengali" character varying, "icon" character varying, "color" character varying, "event_count" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_categories_slug" UNIQUE ("slug"), CONSTRAINT "PK_categories" PRIMARY KEY ("id"))`);

        // Create Organizers table
        await queryRunner.query(`CREATE TABLE "organizers" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "logo" character varying, "banner" character varying, "description" text, "is_verified" boolean NOT NULL DEFAULT false, "rating" numeric(3,2) NOT NULL DEFAULT '0', "total_events" integer NOT NULL DEFAULT '0', "followers" integer NOT NULL DEFAULT '0', "commission_rate" numeric(5,2) NOT NULL DEFAULT '10', "socialLinks" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "UQ_organizers_user_id" UNIQUE ("user_id"), CONSTRAINT "UQ_organizers_slug" UNIQUE ("slug"), CONSTRAINT "PK_organizers" PRIMARY KEY ("id"))`);

        // Create Venues table
        await queryRunner.query(`CREATE TABLE "venues" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "area" character varying NOT NULL, "capacity" integer NOT NULL, "map_image" character varying, "facilities" jsonb NOT NULL DEFAULT '[]', "coordinates" jsonb, CONSTRAINT "UQ_venues_slug" UNIQUE ("slug"), CONSTRAINT "PK_venues" PRIMARY KEY ("id"))`);

        // Create Event status enum
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('upcoming', 'ongoing', 'past', 'cancelled')`);

        // Create Ticket Types table
        await queryRunner.query(`CREATE TABLE "ticket_types" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_id" uuid NOT NULL, "name" character varying NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'BDT', "available" integer NOT NULL, "max_per_purchase" integer NOT NULL DEFAULT '10', "benefits" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_ticket_types" PRIMARY KEY ("id"))`);

        // Create Events table
        await queryRunner.query(`CREATE TABLE "events" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organizer_id" uuid NOT NULL, "venue_id" uuid NOT NULL, "category_id" uuid NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "long_description" text, "cover_image" character varying, "gallery" jsonb NOT NULL DEFAULT '[]', "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "timezone" character varying NOT NULL, "capacity" integer NOT NULL, "sold_tickets" integer NOT NULL DEFAULT '0', "status" "public"."events_status_enum" NOT NULL DEFAULT 'upcoming', "featured" boolean NOT NULL DEFAULT false, "trending" boolean NOT NULL DEFAULT false, "tags" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "UQ_events_slug" UNIQUE ("slug"), CONSTRAINT "PK_events" PRIMARY KEY ("id"))`);

        // Create Ticket status enum
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'used', 'refunded')`);

        // Create Tickets table
        await queryRunner.query(`CREATE TABLE "tickets" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" uuid NOT NULL, "event_id" uuid NOT NULL, "ticket_type_id" uuid NOT NULL, "qrCode" character varying NOT NULL, "attendee_name" character varying NOT NULL, "attendee_email" character varying NOT NULL, "attendee_phone" character varying NOT NULL, "status" "public"."tickets_status_enum" NOT NULL DEFAULT 'confirmed', "checked_in_at" TIMESTAMP, CONSTRAINT "UQ_tickets_qrCode" UNIQUE ("qrCode"), CONSTRAINT "PK_tickets" PRIMARY KEY ("id"))`);

        // Create Order status enum
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'refunded')`);

        // Create Orders table
        await queryRunner.query(`CREATE TABLE "orders" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "orderNumber" character varying NOT NULL, "subtotal" numeric(10,2) NOT NULL DEFAULT '0', "discount" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "coupon_code" character varying, "payment_method" character varying, "payment_status" character varying NOT NULL DEFAULT 'pending', "paid_at" TIMESTAMP, CONSTRAINT "UQ_orders_orderNumber" UNIQUE ("orderNumber"), CONSTRAINT "PK_orders" PRIMARY KEY ("id"))`);

        // Create Foreign Keys
        await queryRunner.query(`ALTER TABLE "organizers" ADD CONSTRAINT "FK_organizers_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_types" ADD CONSTRAINT "FK_ticket_types_event" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_events_organizer" FOREIGN KEY ("organizer_id") REFERENCES "organizers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_events_venue" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_events_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_tickets_order" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_tickets_event" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_tickets_ticket_type" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_orders_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        // Create Indexes for performance
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop Foreign Keys
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_user"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_tickets_ticket_type"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_tickets_event"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_tickets_order"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_events_category"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_events_venue"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_events_organizer"`);
        await queryRunner.query(`ALTER TABLE "ticket_types" DROP CONSTRAINT "FK_ticket_types_event"`);
        await queryRunner.query(`ALTER TABLE "organizers" DROP CONSTRAINT "FK_organizers_user"`);

        // Drop tables in reverse order due to foreign key constraints
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_enum"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
        await queryRunner.query(`DROP TABLE "ticket_types"`);
        await queryRunner.query(`DROP TABLE "venues"`);
        await queryRunner.query(`DROP TABLE "organizers"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
