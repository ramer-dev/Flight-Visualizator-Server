import { IsNumber } from "class-validator";

export class PointType {
    @IsNumber()
    lat: number;
    @IsNumber()
    lng: number;
}

export type PolyLineType = [PointType[]];

export type PolygonType = [PointType[]];

export type MultiPointType = [PointType[]];

export type MultiPolylineType = [PolyLineType[]]

export type MultiPolygonType = [PolygonType[]];