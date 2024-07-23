import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/security/roles.decorator';
import Role from './role.enum';
import { User } from '@prisma/client';

const removePassword = (user: User) => {
    return {...user, pwd_hash: undefined};
}
const removePasswords = (users: User[]) => users.map(removePassword);

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Roles(Role.Admin)
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return removePassword(await this.usersService.findOne({ id }));
    }

    @Roles(Role.Admin)
    @Get()
    async getUsers(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number = 0,
        @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number = 20,
    ): Promise<User[]> {
        return await this.usersService.findMany({ skip, take }).then(removePasswords);
    }

    @Roles(Role.Admin)
    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        return removePassword(await this.usersService.findOneByEmail(email));
    }

    @Roles(Role.Admin)
    @Post()
    async createUser(
        @Body('email') email: string,
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('role') role: string
    ): Promise<User> {
        const user = await this.usersService.create({
            email,
            username,
            pwd_hash: password,
            role: role as Role
        });
        return removePassword(user);
    }

    @Roles(Role.Admin)
    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body('email') email: string,
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('role') role: string
    ): Promise<User> {
        const user = await this.usersService.update({
            where: { id },
            data: {
                email,
                username,
                pwd_hash: password,
                role: role as Role
            }
        });
        return removePassword(user);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return removePassword(await this.usersService.delete({ id }));
    }
}
