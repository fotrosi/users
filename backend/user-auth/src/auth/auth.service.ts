import { Injectable, Inject, forwardRef, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './local-auth.guard';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    console.log("user:", user)

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  @UseGuards(LocalAuthGuard)
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    console.log("user:", user)
    if (user) {
      const payload = { username: username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_ExpiresIn,
          }),
      };
    }
    return null;
  }
}
