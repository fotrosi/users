import { Injectable, Inject, forwardRef, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
    ) { }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async register(username: string, password: string, email: string): Promise<User> {
        const old_user = await this.usersRepository.findOne({ where: { username } });
        if (old_user) {
            throw new ConflictException('Username is already taken!');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersRepository.save({ username, password: hashedPassword, email });
    }

    async findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({ where: { username } });
    }

}