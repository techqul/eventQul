import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventTimeColumn1785745420533 implements MigrationInterface {
  name = 'AddEventTimeColumn1785745420533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add time column to events table if it doesn't exist
    await queryRunner.query(`
      ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "time" character varying NOT NULL DEFAULT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "time"`);
  }
}
