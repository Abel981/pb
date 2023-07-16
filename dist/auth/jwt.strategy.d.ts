import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    private static extractJWTFromCookie;
    validate(payload: any): Promise<{
        userid: any;
        username: any;
    }>;
}
export {};
