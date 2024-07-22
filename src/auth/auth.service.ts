import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Role from 'src/users/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, password: string) {
        const user = await this.userService.findOneByUsername(username);
        if (user?.pwd_hash !== password) {
            throw new UnauthorizedException('Invalid username or password');
        }
        
        const payload = { username, sub: user.id, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async signUp(username: string, email: string, password: string) {
        const user = await this.userService.findOneByUsername(username);
        if (user) {
            throw new ConflictException('Username already exists');
        }
        
        const newUser = await this.userService.create({
            username,
            email,
            pwd_hash: password,
            role: Role.User
        });
        const payload = { username, sub: newUser.id, role: newUser.role };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
