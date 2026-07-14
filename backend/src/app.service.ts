import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      success: true,
      message: 'Welcome to EventQul API',
      data: {
        name: 'EventQul API',
        version: '1.0.0',
        description: 'Event management platform API',
        endpoints: {
          health: '/health',
          healthDetailed: '/health/detailed',
          docs: '/api/docs',
        },
      },
    };
  }
}
