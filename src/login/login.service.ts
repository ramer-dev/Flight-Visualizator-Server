import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'entities/account.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        
        private jwtService:JwtService,
    ) { }

    async login(id_: string, pw_: string) {
        const { id, pw } = await this.accountRepository.findOne({ where: { id: id_ } })
        if (id === id_ && pw === pw_) {
            const payload = { id, sub: '0' }
            return this.jwtService.sign(payload);
        }
        throw new UnauthorizedException('인증되지 않은 사용자입니다.')

        // return 'test';

    }
}
