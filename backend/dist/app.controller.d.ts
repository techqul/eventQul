import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getInfo(): {
        success: boolean;
        message: string;
        data: {
            name: string;
            version: string;
            description: string;
            endpoints: {
                health: string;
                healthDetailed: string;
                docs: string;
            };
        };
    };
}
