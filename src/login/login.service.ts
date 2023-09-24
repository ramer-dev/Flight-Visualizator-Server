import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

interface AccountInterface {
    token: string,
    role: number,
}
@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User)
        private readonly accountRepository: Repository<User>,
        private jwtService: JwtService,

    ) { }

    async login(id_: string, pw_: string) {
        const result = await this.accountRepository.findOne({ where: { id: id_ } })
        if (!result) {
            throw new UnauthorizedException('일치하는 사용자 ID/PW가 없습니다.')
        }

        if (result.id === id_ && result.pw === pw_) {
            const payload = { id: result.id, role: result.role, sub: '0' };
            const token = this.jwtService.sign(payload)
            return { token, role: result.role }
        }
        throw new UnauthorizedException('일치하는 사용자 ID/PW가 없습니다.')
    }

    async register(id: string, pw: string, name: string, digit: string) {
        // 권한 1의 유저 생성
        await this.accountRepository.insert({ id, pw, username: name, digit, role: 1 })
    }

    async verifyId(id: string) {
        const verify = await this.accountRepository.findOne({ where: { id } })
        if (verify) {
            return false;
        } else {
            return true
        }
    }

    async verifyUsername(name: string) {
        const verify = await this.accountRepository.findOne({ where: { username:name } })
        if (verify) {
            return false;
        } else {
            return true
        }
    }

    async findPW(id: string, name: string, digit: string){
        const verify = await this.accountRepository.findOne({ where: { id, username:name, digit } })
        if (verify) {
            return false;
        } else {
            return true
        }
    }

    async setPW(id:string, pw:string){
        return await this.accountRepository.update({id}, {pw})
    }

}
