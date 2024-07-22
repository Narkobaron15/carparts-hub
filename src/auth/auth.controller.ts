import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/security/auth.guard';
import { Public } from 'src/security/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(
        @Body('username') username: string, 
        @Body('password') password: string
    ) {
        return await this.authService.signIn(username, password);
    }
    
    @Public()
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
        const { username, role } = req.user;
        return { username, role };
    }
}
