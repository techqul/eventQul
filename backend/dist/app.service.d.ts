export declare class AppService {
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
