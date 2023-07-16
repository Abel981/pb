import { ConfigService } from '@nestjs/config';
export declare const CloudinaryProvider: {
    provide: string;
    useFactory: (config: ConfigService) => import("cloudinary").ConfigOptions;
    inject: (typeof ConfigService)[];
};
