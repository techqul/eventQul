"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalValidationPipe = exports.validationPipeOptions = void 0;
const common_1 = require("@nestjs/common");
exports.validationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
    exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => {
            const constraints = error.constraints;
            const children = error.children;
            if (constraints) {
                const messages = Object.values(constraints);
                return {
                    field: error.property,
                    message: messages.join(', '),
                };
            }
            if (children && children.length > 0) {
                return {
                    field: error.property,
                    message: 'Nested validation failed',
                    children: formatChildrenErrors(children),
                };
            }
            return {
                field: error.property,
                message: 'Validation failed',
            };
        });
        return new common_1.BadRequestException({
            success: false,
            message: 'Validation failed',
            errors: formattedErrors,
            statusCode: 400,
        });
    },
};
function formatChildrenErrors(errors) {
    return errors.map((error) => {
        const constraints = error.constraints;
        const children = error.children;
        if (constraints) {
            const messages = Object.values(constraints);
            return {
                field: error.property,
                message: messages.join(', '),
            };
        }
        if (children && children.length > 0) {
            return {
                field: error.property,
                message: 'Nested validation failed',
                children: formatChildrenErrors(children),
            };
        }
        return {
            field: error.property,
            message: 'Validation failed',
        };
    });
}
exports.GlobalValidationPipe = new common_1.ValidationPipe(exports.validationPipeOptions);
//# sourceMappingURL=validation.pipe.js.map