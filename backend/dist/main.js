"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const query_exception_filter_1 = require("./common/filters/query-exception.filter");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const swagger_config_1 = require("./config/swagger.config");
const app_config_1 = require("./config/app.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    const configService = app.get(config_1.ConfigService);
    const reflector = app.get(core_1.Reflector);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                scriptSrc: [`'self'`, `https:`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'https:'],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: configService.get('CORS_ENABLED') === 'true'
            ? configService.get('CORS_ORIGIN', '*')
            : '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.setGlobalPrefix(configService.get('API_PREFIX', 'api'));
    app.useGlobalPipes(new common_1.ValidationPipe(validation_pipe_1.validationPipeOptions));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(configService), new query_exception_filter_1.QueryExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(reflector), new transform_interceptor_1.ExcludeFieldsInterceptor());
    if (configService.get('NODE_ENV') !== 'production') {
        const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swaggerConfig);
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
    app.enableShutdownHooks();
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
  ║  Version: ${app_config_1.appConfig.version.padEnd(43)} ║
  ║                                                            ║
  ║  ${env === 'development' ? `🔗 API: http://localhost:${port}` : '🟢 Server is running'}${' '.repeat(37)} ║
  ║                                                            ║
  ╚════════════════════════════════════════════════════════════╝
  `);
}
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
bootstrap().catch((error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map