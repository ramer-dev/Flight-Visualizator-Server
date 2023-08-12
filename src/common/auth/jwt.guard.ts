import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        console.log(request.headers);
        return request.headers.Authorization;
    }
}
// export class JwtAuthGuard extends AuthGuard('jwt') {}