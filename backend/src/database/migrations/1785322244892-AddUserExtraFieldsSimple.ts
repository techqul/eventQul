import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserExtraFieldsSimple1785322244892 implements MigrationInterface {
  name = 'AddUserExtraFieldsSimple1785322244892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add new columns to users table
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "thana" character varying`);
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "ocupation" character varying`);
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "facebook_id" character varying`);
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "linkedin_id" character varying`);

    // Create OTP table if not exists
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "otp" (
        "id" SERIAL NOT NULL,
        "otp" character varying NOT NULL,
        "mobileNo" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_otp" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop new columns from users table
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "linkedin_id"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "facebook_id"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "ocupation"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "thana"`);

    // Drop OTP table
    await queryRunner.query(`DROP TABLE IF EXISTS "otp"`);
  }
}
