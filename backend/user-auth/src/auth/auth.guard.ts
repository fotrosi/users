import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];
        //console.log("app.guard", token);
        if (!token) {
            return false;
        }
        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            //console.log(request.user, decoded)
            return true;
        } catch (err) {
            console.log("app.guard", err);
            return false;
        }
    }
}