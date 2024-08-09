import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, 
            signOptions: {
                expiresIn: process.env.JWT_ExpiresIn, 
            },
        }),
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule { }
