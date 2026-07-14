"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1710524800000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1710524800000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'nick_name',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                },
                {
                    name: 'institute_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'district',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'dob',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'blood_group',
                    type: 'enum',
                    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                    isNullable: true,
                },
                {
                    name: 'gender',
                    type: 'enum',
                    enum: ['male', 'female', 'other'],
                    isNullable: true,
                },
                {
                    name: 'tshirt_size',
                    type: 'enum',
                    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                    isNullable: true,
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: ['user', 'organizer', 'admin'],
                    default: "'user'",
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['active', 'inactive', 'suspended', 'pending'],
                    default: "'pending'",
                },
                {
                    name: 'email_verified',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'avatar_url',
                    type: 'varchar',
                    length: '500',
                    isNullable: true,
                },
                {
                    name: 'last_login_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
            indices: [
                new typeorm_1.TableIndex({
                    name: 'IDX_USERS_ID',
                    columnNames: ['id'],
                }),
                new typeorm_1.TableIndex({
                    name: 'IDX_USERS_EMAIL',
                    columnNames: ['email'],
                    isUnique: true,
                }),
                new typeorm_1.TableIndex({
                    name: 'IDX_USERS_PHONE',
                    columnNames: ['phone_number'],
                }),
                new typeorm_1.TableIndex({
                    name: 'IDX_USERS_STATUS',
                    columnNames: ['status'],
                }),
                new typeorm_1.TableIndex({
                    name: 'IDX_USERS_ROLE',
                    columnNames: ['role'],
                }),
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1710524800000 = CreateUsersTable1710524800000;
//# sourceMappingURL=1710524800000-CreateUsersTable.js.map