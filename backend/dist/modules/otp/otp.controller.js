"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const common_1 = require("@nestjs/common");
const otp_service_1 = require("./otp.service");
const update_otp_dto_1 = require("./dto/update-otp.dto");
const swagger_1 = require("@nestjs/swagger");
const create_otp_dto_1 = require("./dto/create-otp.dto");
const send_otp_dto_1 = require("./dto/send-otp.dto");
let OtpController = class OtpController {
    otpService;
    constructor(otpService) {
        this.otpService = otpService;
    }
    sendOtp(body) {
        return this.otpService.sendOtp(body);
    }
    verifyOtp(body) {
        return this.otpService.verifyOtp(body);
    }
    findAll() {
        return this.otpService.findAll();
    }
    findOne(id) {
        return this.otpService.findOne(+id);
    }
    update(id, updateOtpDto) {
        return this.otpService.update(+id, updateOtpDto);
    }
    remove(id) {
        return this.otpService.remove(+id);
    }
};
exports.OtpController = OtpController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_otp_dto_1.SendOtpDto]),
    __metadata("design:returntype", void 0)
], OtpController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_otp_dto_1.CreateOtpDto]),
    __metadata("design:returntype", void 0)
], OtpController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OtpController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OtpController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_otp_dto_1.UpdateOtpDto]),
    __metadata("design:returntype", void 0)
], OtpController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OtpController.prototype, "remove", null);
exports.OtpController = OtpController = __decorate([
    (0, swagger_1.ApiTags)('Otp'),
    (0, common_1.Controller)('otp'),
    __metadata("design:paramtypes", [otp_service_1.OtpService])
], OtpController);
//# sourceMappingURL=otp.controller.js.map