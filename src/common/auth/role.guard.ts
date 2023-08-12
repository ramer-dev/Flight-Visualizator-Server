import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "./jwt.payload";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<number>('auth', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const jwtService = new JwtService()

        const token = request.cookies.jwt;

        const {id, role, sub} = jwtService.decode(token) as Payload

        return role >= roles
        
        // if(user.authority && user.authority >= roles){
        // }
        // return user && user.authority && user.authority >= roles;
    }
}