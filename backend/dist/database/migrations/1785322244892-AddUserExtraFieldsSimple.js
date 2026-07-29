"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserExtraFieldsSimple1785322244892 = void 0;
class AddUserExtraFieldsSimple1785322244892 {
    name = 'AddUserExtraFieldsSimple1785322244892';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "thana" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "ocupation" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "facebook_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "linkedin_id" character varying`);
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
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "linkedin_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "facebook_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "ocupation"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "thana"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "otp"`);
    }
}
exports.AddUserExtraFieldsSimple1785322244892 = AddUserExtraFieldsSimple1785322244892;
//# sourceMappingURL=1785322244892-AddUserExtraFieldsSimple.js.map