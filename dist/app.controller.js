"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const create_agent_dto_1 = require("./dto/create-agent.dto");
const cloudinary_service_1 = require("./cloudinary/cloudinary.service");
const prisma_service_1 = require("./prisma.service");
const auth_service_1 = require("./auth/auth.service");
const local_auth_guard_1 = require("./auth/local-auth.guard");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
let AppController = exports.AppController = class AppController {
    constructor(cloudinary, prisma, authService) {
        this.cloudinary = cloudinary;
        this.prisma = prisma;
        this.authService = authService;
    }
    async login(body, req, res) {
        const { access_token } = await this.authService.login(req.user);
        console.log(access_token);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        }).send({ status: 'ok' });
    }
    async logout(res) {
        res.clearCookie('access_token');
        return { message: 'Logged out successfully' };
    }
    getProfile(req) {
        return req.user;
    }
    async register(body, file) {
        const result = await this.cloudinary.uploadFile(file);
        const data = JSON.parse(JSON.stringify(body));
        const field = JSON.parse(data.nonFileData);
        const fields = { ...field, idUrl: result.secure_url };
        return this.prisma.user.create({
            data: fields,
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('auth/logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('files')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agent_dto_1.CreateAgentDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map