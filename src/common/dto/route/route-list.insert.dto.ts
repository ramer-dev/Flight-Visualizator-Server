import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { isTypedArray } from "util/types";
import { InsertRouteDto } from "./route.insert.dto";

export class InsertRouteListDto {
    @IsOptional()
    @IsNumber()
    routeId:number;

    @IsString()
    routeName:string;

    @IsArray()
    routeData: InsertRouteDto[]

}