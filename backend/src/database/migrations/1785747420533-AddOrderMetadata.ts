import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderMetadata1785747420533 implements MigrationInterface {
  name = 'AddOrderMetadata1785747420533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add metadata column to orders table
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN "metadata" jsonb NOT NULL DEFAULT '{}'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove metadata column from orders table
    await queryRunner.query(`
      ALTER TABLE "orders"
      DROP COLUMN "metadata"
    `);
  }
}
