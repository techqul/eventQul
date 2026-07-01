export declare const jwtConfig: {
    secret: string;
    expiresIn: string;
    signOptions: {
        algorithm: string;
        issuer: string;
        audience: string;
    };
};
export declare const jwtRefreshConfig: {
    secret: string;
    expiresIn: string;
    signOptions: {
        algorithm: string;
        issuer: string;
        audience: string;
    };
};
export declare const passwordConfig: {
    rounds: number;
};
export declare const authConfig: {
    passwordResetExpiresIn: string;
    emailVerificationExpiresIn: string;
};
