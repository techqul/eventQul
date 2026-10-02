import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentsTable1785746420533 implements MigrationInterface {
  name = 'CreatePaymentsTable1785746420533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types first
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "payment_provider_enum" AS ENUM ('bkash', 'sslcommerz', 'cash');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "payment_status_enum" AS ENUM (
          'pending', 'initiated', 'processing', 'completed', 'failed', 'cancelled', 'refunded', 'expired'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "payment_method_enum" AS ENUM (
          'credit_card', 'debit_card', 'mobile_banking', 'internet_banking', 'cash_on_delivery', 'wallet'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$
    `);

    // Create payments table
    await queryRunner.query(`
      CREATE TABLE "payments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "order_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "provider" payment_provider_enum NOT NULL,
        "status" payment_status_enum NOT NULL DEFAULT 'pending',
        "amount" numeric(10,2) NOT NULL,
        "payment_method" payment_method_enum,
        "provider_transaction_id" varchar(255),
        "invoice_id" varchar(255),
        "metadata" jsonb NOT NULL DEFAULT '{}',
        "error_message" varchar(255),
        "completed_at" TIMESTAMP,
        "refunded_at" TIMESTAMP,
        "expires_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_payments" PRIMARY KEY ("id")
      )
    `);

    // Create foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "payments"
      ADD CONSTRAINT "FK_payments_order"
      FOREIGN KEY ("order_id")
      REFERENCES "orders"("id")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "payments"
      ADD CONSTRAINT "FK_payments_user"
      FOREIGN KEY ("user_id")
      REFERENCES "users"("id")
      ON DELETE CASCADE
    `);

    // Create indexes for better performance
    await queryRunner.query(`
      CREATE INDEX "IDX_payments_order_id" ON "payments" ("order_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_payments_user_id" ON "payments" ("user_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_payments_provider_status" ON "payments" ("provider", "status")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_payments_provider_transaction_id" ON "payments" ("provider_transaction_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_user"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_order"`);

    // Drop indexes
    await queryRunner.query(`DROP INDEX "IDX_payments_provider_transaction_id"`);
    await queryRunner.query(`DROP INDEX "IDX_payments_provider_status"`);
    await queryRunner.query(`DROP INDEX "IDX_payments_user_id"`);
    await queryRunner.query(`DROP INDEX "IDX_payments_order_id"`);

    // Drop table
    await queryRunner.query(`DROP TABLE "payments"`);

    // Drop enum types
    await queryRunner.query(`DROP TYPE "payment_method_enum"`);
    await queryRunner.query(`DROP TYPE "payment_status_enum"`);
    await queryRunner.query(`DROP TYPE "payment_provider_enum"`);
  }
}
