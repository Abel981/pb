import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export class Admin {
  id: string;
  username: string;
  hashedPassword: string;
}
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(username: string): Promise<Admin | undefined> {
    return await this.prisma.admin.findUnique({
      where: {
        username,
      },
    });
  }
}
