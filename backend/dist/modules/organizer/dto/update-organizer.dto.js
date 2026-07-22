"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_organizer_dto_1 = require("./create-organizer.dto");
class UpdateOrganizerDto extends (0, swagger_1.PartialType)(create_organizer_dto_1.CreateOrganizerDto) {
}
exports.UpdateOrganizerDto = UpdateOrganizerDto;
//# sourceMappingURL=update-organizer.dto.js.map