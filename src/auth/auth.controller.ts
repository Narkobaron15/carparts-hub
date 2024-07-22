import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/security/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(
        @Body('username') username: string, 
        @Body('password') password: string
    ) {
        return await this.authService.signIn(username, password);
    }
    
    @Post('register')
    async register(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        return await this.authService.signUp(username, email, password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Req() req) {
        return req.user;
    }
}
