import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    console.log('username:' + username);
    return { userid: '3', username: 'john' };
    // if (!user) {
    //   return null;
    // }

    // const isMatch = await bcrypt.compare(pass, user.hashedPassword);
    // if (!isMatch) {
    //   return null;
    // }
    // const { hashedPassword, ...result } = user;
    // return result;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
