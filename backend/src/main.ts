import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { QueryExceptionFilter } from './common/filters/query-exception.filter';
import { validationPipeOptions } from './common/pipes/validation.pipe';
import { swaggerConfig } from './config/swagger.config';
import { appConfig } from './config/app.config';

/**
 * Bootstrap the NestJS application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  // ============================================================================
  // Security
  // ============================================================================

  // Helmet - Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          scriptSrc: [`'self'`, `https:`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false, // Disable for Swagger UI
    }),
  );

  // Compression - Compress response bodies
  app.use(compression());

  // CORS - Enable cross-origin resource sharing
  app.enableCors({
    origin:
      configService.get('CORS_ENABLED') === 'true' ? configService.get('CORS_ORIGIN', '*') : '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ============================================================================
  // API Configuration
  // ============================================================================

  // API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Set global prefix for all routes
  app.setGlobalPrefix(configService.get('API_PREFIX', 'api'));

  // ============================================================================
  // Validation
  // ============================================================================

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  // ============================================================================
  // Filters
  // ============================================================================

  // Global HTTP exception filter
  app.useGlobalFilters(new HttpExceptionFilter(configService), new QueryExceptionFilter());

  // ============================================================================
  // Swagger Documentation
  // ============================================================================

  if (configService.get('NODE_ENV') !== 'production') {
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api/docs', app, document, {
      customSiteTitle: 'EventQul API Docs',
      customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin: 20px 0; }
      `,
      swaggerOptions: {
        persistAuthorization: true,
        displayOperationId: false,
        filter: true,
        showRequestDuration: true,
        docExpansion: 'none',
        tryItOutEnabled: true,
      },
    });
  }

  // ============================================================================
  // Graceful Shutdown
  // ============================================================================

  app.enableShutdownHooks();

  // ============================================================================
  // Start Server
  // ============================================================================

  const port = configService.get('PORT', 3001);
  const env = configService.get('NODE_ENV', 'development');

  await app.listen(port);

  console.log(`
  ╔════════════════════════════════════════════════════════════╗
  ║                                                            ║
  ║              🎪 EventQul API Server 🎪                   ║
  ║                                                            ║
  ║  Environment: ${env.padEnd(41)} ║
  ║  Port: ${port.toString().padEnd(48)} ║
  ║  Version: ${appConfig.version.padEnd(43)} ║
  ║                                                            ║
  ║  ${env === 'development' ? `🔗 API: http://localhost:${port}` : '🟢 Server is running'}${' '.repeat(37)} ║
  ║                                                            ║
  ╚════════════════════════════════════════════════════════════╝
  `);
}

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

/**
 * Start the application
 */
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
