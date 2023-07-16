import { PrismaService } from 'src/prisma.service';
export declare class Admin {
    id: string;
    username: string;
    hashedPassword: string;
}
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(username: string): Promise<Admin | undefined>;
}
