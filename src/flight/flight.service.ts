import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightService {
    getTest(): string {
        return 'Hello Test!';
    }
}
