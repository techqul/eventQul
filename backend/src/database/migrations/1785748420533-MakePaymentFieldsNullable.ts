import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakePaymentFieldsNullable1785748420533 implements MigrationInterface {
  name = 'MakePaymentFieldsNullable1785748420533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints first
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_order"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_user"`);

    // Make columns nullable
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "order_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "user_id" DROP NOT NULL`);

    // Re-add foreign key constraints with nullable support
    await queryRunner.query(`
      ALTER TABLE "payments"
      ADD CONSTRAINT "FK_payments_order"
      FOREIGN KEY ("order_id")
      REFERENCES "orders"("id")
      ON DELETE CASCADE
      DEFERRABLE INITIALLY DEFERRED
    `);

    await queryRunner.query(`
      ALTER TABLE "payments"
      ADD CONSTRAINT "FK_payments_user"
      FOREIGN KEY ("user_id")
      REFERENCES "users"("id")
      ON DELETE CASCADE
      DEFERRABLE INITIALLY DEFERRED
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_user"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_order"`);

    // Make columns NOT NULL again
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "order_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "user_id" SET NOT NULL`);

    // Re-add foreign key constraints
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
  }
}
