import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { config } from 'dotenv';

config();

// Swagger document builder
export const swaggerConfig = new DocumentBuilder()
  .setTitle('EventQul API')
  .setDescription(`
    ## SaaS Event Ticketing Platform API

    A production-grade REST API for the EventQul event marketplace platform.

    ### Authentication
    Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
    \`Authorization: Bearer <your-jwt-token>\`

    ### Roles
    - **user**: Regular event attendees
    - **organizer**: Event creators and managers
    - **admin**: Platform administrators

    ### Rate Limiting
    API requests are rate-limited to 100 requests per minute per IP.

    ### Pagination
    List endpoints support pagination via query parameters:
    - \`page\`: Page number (default: 1)
    - \`limit\`: Items per page (default: 20, max: 100)

    ### Error Handling
    All errors follow a consistent format:
    \`\`\`json
    {
      "success": false,
      "message": "Error description",
      "errors": [...],
      "statusCode": 400
    }
    \`\`\`

    **Base URL:** \`${process.env.API_PREFIX || 'api/v1'}\`
  `)
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
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This is the key used in @ApiBearerAuth() decorator
  )
  .addServer(
    `${process.env.APP_URL || 'http://localhost:3001'}/${process.env.API_PREFIX || 'api/v1'}`,
    'Development Server',
  )
  .build();

// Custom options for Swagger
export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true, // Keep authorization header after page refresh
    displayOperationId: false,
    filter: true,
    showRequestDuration: true,
    docExpansion: 'none', // Start with collapsed endpoints
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
