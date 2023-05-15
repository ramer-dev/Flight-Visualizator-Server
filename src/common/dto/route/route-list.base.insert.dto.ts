import { IsNumber, IsOptional, IsString } from "class-validator";

export class RouteListBaseDto {
    @IsOptional()
    @IsNumber()
    routeId:number;

    @IsString()
    routeName:string;
}