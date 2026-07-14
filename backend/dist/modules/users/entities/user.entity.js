"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const base_entity_1 = require("../../../common/entities/base.entity");
const types_1 = require("../types");
let User = class User extends base_entity_1.BaseEntity {
    id;
    email;
    password;
    firstName;
    lastName;
    nickName;
    phoneNumber;
    instituteName;
    district;
    dob;
    bloodGroup;
    gender;
    tshirtSize;
    role;
    status;
    emailVerified;
    avatarUrl;
    lastLoginAt;
    async validatePassword(password) {
        return bcrypt.compare(password, this.password);
    }
    toJSON() {
        const { password: _password, ...rest } = this;
        return rest;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nick_name', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'institute_name', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "instituteName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'district', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dob', type: 'varchar', length: '50', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'blood_group',
        type: 'enum',
        enum: types_1.BloodGroup,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "bloodGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'gender',
        type: 'enum',
        enum: types_1.Gender,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tshirt_size',
        type: 'enum',
        enum: types_1.TShirtSize,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "tshirtSize", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: types_1.UserRole,
        default: types_1.UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: types_1.UserStatus,
        default: types_1.UserStatus.PENDING,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_verified', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avatar_url', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map