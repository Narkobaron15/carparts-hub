import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import Role from 'src/users/role.enum';
import { UsersService } from 'src/users/users.service';

const rounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    if (!(await bcrypt.compare(password, user.pwd_hash))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      username,
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, email: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      throw new ConflictException('Username already exists');
    }

    const hash = await bcrypt.hash(password, rounds);
    const newUser = await this.userService.create({
      username,
      email,
      pwd_hash: hash,
      role: Role.User,
    });

    const payload = {
      username,
      email,
      sub: newUser.id,
      role: newUser.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
