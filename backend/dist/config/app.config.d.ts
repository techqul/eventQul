export declare const appConfig: {
    env: string;
    port: number;
    apiPrefix: string;
    appName: string;
    appUrl: string;
    frontendUrl: string;
    timezone: string;
    version: string;
};
export declare const storageConfig: {
    type: string;
    maxFileSize: number;
    allowedFileTypes: string[];
    uploadPath: string;
};
export declare const paymentConfig: {
    convenienceFee: {
        type: string;
        value: number;
        minimum: number;
    };
    commission: {
        defaultRate: number;
    };
    bKash: {
        merchantNumber: string;
        username: string;
        password: string;
        appKey: string;
        appSecret: string;
        sandboxUrl: string;
        liveUrl: string;
        isSandbox: boolean;
    };
};
export declare const emailConfig: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
    fromName: string;
};
export declare const smsConfig: {
    provider: string;
    apiKey: string;
    senderId: string;
};
