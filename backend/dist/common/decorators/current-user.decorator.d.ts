export declare const CurrentUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
export interface UserPayload {
    sub: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}
