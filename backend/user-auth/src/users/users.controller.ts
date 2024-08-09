import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../models/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // @UseGuards(AuthGuard)
    // @Get(':id')
    // findOne(@Param('id') id: number): Promise<User> {
    //     return this.usersService.findOne(id);
    // }

    // @UseGuards(AuthGuard)
    // @Post()
    // create(@Body() user: User): Promise<User> {
    //     return this.usersService.create(user);
    // }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }

    @Post('register')
    async register(@Body() body: { username: string, password: string, email: string }) {
        return this.usersService.register(body.username, body.password, body.email);
    }
}