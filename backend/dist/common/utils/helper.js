"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTransformer = void 0;
exports.dateTransformer = {
    to(value) {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value ?? null;
    },
    from(value) {
        if (!value)
            return null;
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value;
    },
};
//# sourceMappingURL=helper.js.map