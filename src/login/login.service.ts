import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'entities/account.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,

        private jwtService: JwtService,
    ) { }

    async login(id_: string, pw_: string) {
        const log = new Logger('LoginService')
        const { id, pw } = await this.accountRepository.findOne({ where: { id: id_ } })
        if (id === id_ && pw === pw_) {
            log.log(`${id} has logged in.`)
            const payload = { id, sub: '0' }
            return this.jwtService.sign(payload);
        }
        log.log(`401 Error Thrown. id:${id_}| pw:${pw_}`)
        throw new UnauthorizedException('인증되지 않은 사용자입니다.')
    }
}
