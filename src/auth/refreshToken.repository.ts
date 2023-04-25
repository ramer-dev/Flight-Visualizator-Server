import { Injectable } from "@nestjs/common";
import { User } from "entities/user.entity";

@Injectable()
export class RefreshTokenRepository {
    public async createRefreshToken ( user : User,, ttl: number) {

    }
}