"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerCustomOptions = exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('EventQul API')
    .setDescription('SaaS Event Ticketing Platform API')
    .setVersion('1.0.0')
    .addTag('Auth', 'Authentication and authorization endpoints')
    .addTag('Users', 'User profile and management')
    .addTag('Organizers', 'Organizer profiles and verification')
    .addTag('Events', 'Event discovery and management')
    .addTag('Categories', 'Event categories')
    .addTag('Venues', 'Event venues')
    .addTag('Orders', 'Order creation and management')
    .addTag('Tickets', 'Ticket management and validation')
    .addTag('Payments', 'Payment processing')
    .addTag('Coupons', 'Discount coupons')
    .addTag('Notifications', 'User notifications')
    .addTag('Dashboard', 'Dashboard statistics and analytics')
    .addTag('Admin', 'Admin-specific operations')
    .addTag('Health', 'Health check endpoints')
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
}, 'JWT-auth')
    .addServer(process.env.APP_URL || 'http://localhost:3002', 'Development Server')
    .build();
exports.swaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
        displayOperationId: false,
        filter: true,
        showRequestDuration: true,
        docExpansion: 'none',
        tryItOutEnabled: true,
        syntaxHighlight: {
            activate: true,
            theme: 'monokai',
        },
    },
    customSiteTitle: 'EventQul API Docs',
    customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 20px 0; }
  `,
};
//# sourceMappingURL=swagger.config.js.map