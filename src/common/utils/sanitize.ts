import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import sanitize from "sanitize-html";

@Injectable()
export class Sanitize implements PipeTransform {
    constructor(private readonly className: any) { }

    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value)
        if (Array.isArray(value)) {
            for (let key of value) {
                value[key] = sanitize(value[key]);
            }
        } else if(typeof value ==='object'){
            for (let key of Object.keys(value)) {
                value[key] = sanitize(value[key]);
            }
        }

        // request 변경
        return plainToInstance(this.className, value, { excludeExtraneousValues: true });
    }
} 