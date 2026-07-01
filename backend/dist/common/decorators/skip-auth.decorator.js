"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipAuth = exports.Public = exports.SKIP_AUTH_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.SKIP_AUTH_KEY = 'skipAuth';
const Public = () => (0, common_1.SetMetadata)(exports.SKIP_AUTH_KEY, true);
exports.Public = Public;
exports.SkipAuth = exports.Public;
//# sourceMappingURL=skip-auth.decorator.js.map