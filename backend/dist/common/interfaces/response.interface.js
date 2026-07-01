"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccessResponse = createSuccessResponse;
exports.createErrorResponse = createErrorResponse;
exports.createValidationErrorResponse = createValidationErrorResponse;
exports.calculatePaginationMeta = calculatePaginationMeta;
function createSuccessResponse(data, message, meta) {
    const response = {
        success: true,
        data,
    };
    if (message) {
        response.message = message;
    }
    if (meta) {
        response.meta = meta;
    }
    return response;
}
function createErrorResponse(message, statusCode = 500, errors) {
    const error = {
        success: false,
        message,
        statusCode,
    };
    if (errors && errors.length > 0) {
        error.errors = errors;
    }
    if (process.env.NODE_ENV === 'development') {
        error.stack = new Error().stack;
    }
    return error;
}
function createValidationErrorResponse(errors) {
    return {
        success: false,
        message: 'Validation failed',
        errors,
        statusCode: 400,
    };
}
function calculatePaginationMeta(page, limit, total) {
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
    };
}
//# sourceMappingURL=response.interface.js.map