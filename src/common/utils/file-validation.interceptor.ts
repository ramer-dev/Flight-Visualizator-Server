import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  
  constructor(private readonly allowedExtensions: string[]) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const file = request.body;

        console.log(file)
        if (!file || !this.isAllowedExtension(file.originalname)) {
            throw new HttpException('Invalid file format', HttpStatus.BAD_REQUEST);
        } 

        return next.handle();
    } 

    private isAllowedExtension(filename: string): boolean {
        const fileExtension = filename.split('.').pop();
        return this.allowedExtensions.includes(fileExtension);
    }
}