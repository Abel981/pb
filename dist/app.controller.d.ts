/// <reference types="multer" />
import { CreateAgentDto } from './dto/create-agent.dto';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';
export declare class AppController {
    private readonly cloudinary;
    private prisma;
    private authService;
    constructor(cloudinary: CloudinaryService, prisma: PrismaService, authService: AuthService);
    login(body: any, req: any, res: Response): Promise<void>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
    register(body: CreateAgentDto, file: Express.Multer.File): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        phone: string;
        firstName: string;
        middleName: string;
        lastName: string;
        gender: string;
        region: string;
        agentType: string;
        idUrl: string;
        tradeUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
