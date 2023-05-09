export class PointType {
    lat: number;
    lng: number;
}

export type PolyLineType = [PointType[]];

export type PolygonType = [PointType[]];

export type MultiPointType = [PointType[]];

export type MultiPolylineType = [PolyLineType[]]

export type MultiPolygonType = [PolygonType[]];