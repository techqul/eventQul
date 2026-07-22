import { MigrationInterface, QueryRunner } from "typeorm";
export declare class ReorderTimestampColumns1784700120417 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
