import { Injectable, Inject, forwardRef  } from '@nestjs/common';
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

    async create(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async register(username: string, password: string, email: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ username, password: hashedPassword, email });
        return this.usersRepository.save(user);
    }

    async findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOneByEmail2(email: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ email });
    }


}