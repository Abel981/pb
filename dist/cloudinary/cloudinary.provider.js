"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const constants_1 = require("./constants");
exports.CloudinaryProvider = {
    provide: constants_1.CLOUDINARY,
    useFactory: (config) => {
        return cloudinary_1.v2.config({
            cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
            api_key: config.get('CLOUDINARY_API_KEY'),
            api_secret: config.get('CLOUDINARY_API_SECRET'),
        });
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=cloudinary.provider.js.map