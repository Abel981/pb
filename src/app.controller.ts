/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAgentDto } from './dto/create-agent.dto';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly cloudinary: CloudinaryService,
    private prisma: PrismaService,
    private authService: AuthService
  ) {}


  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body, @Request() req, @Res( {passthrough:true} ) res: Response): Promise<void> {
    // console.log(body)
    // console.log(req)
    const {access_token} = await this.authService.login(req.user)
    console.log(access_token)
    //change the cookie options in production env't
    res.cookie('access_token', access_token, {
      httpOnly:true,
      secure:true,
      sameSite:'none',
      expires:new Date(Date.now() + 1 * 24 * 60 * 1000),
    }).send({status: 'ok'})
    ;
   
  }

  @Get('auth/logout')
  async logout(@Res({passthrough:true}) res: Response) {
    res.clearCookie('access_token')
    return {message: 'Logged out successfully'}
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
  @Post('register')
  @UseInterceptors(FileInterceptor('files'))
  async register(
    @Body() body: CreateAgentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.cloudinary.uploadFile(file);

    const data = JSON.parse(JSON.stringify(body));
    const field = JSON.parse(data.nonFileData);
    const fields = { ...field, idUrl: result.secure_url };

    return this.prisma.user.create({
      data: fields,
    });
  }
}
