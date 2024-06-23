import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto, LoginDto } from 'src/dto/account.dto';
import { Account } from 'src/typeorm/account.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async createAccount(CreateAccountDto: CreateAccountDto) {
    const password = CreateAccountDto.password;
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const newAccount = { ...CreateAccountDto, password: hash };
    const savedAccount = await this.findbyEmail(newAccount.mail);
    if(savedAccount) {
      console.log(savedAccount);
      throw new BadRequestException('Email already exists');
    }
    return this.accountRepository.save(newAccount);
  }

  findAccountByID(uuid: string) {
    return this.accountRepository.findOne({ where: { uuid: uuid } });
  }

  findbyEmail(email: string) {
    return this.accountRepository.findOne({ where: { mail: email } });
  }

  async seedAccounts() {
    await this.createAccount({
      name: 'researcher',
      mail: 'Research@mail.com',
      password: 'research',
      role: 'research',
    })
    await this.createAccount({
      name: 'sales',
      mail: 'Sales@mail.com',
      password: 'sales',
      role: 'sales'
    });
    return await this.createAccount({
      name: 'admin',
      mail: 'Admin@mail.com',
      password: 'admin',
      role: 'admin'
    });
  }

  async loginAccount(loginAccountDto: LoginDto) {
    const password = crypto
      .createHash('sha256')
      .update(loginAccountDto.password)
      .digest('hex');
    const account = await this.findbyEmail(loginAccountDto.mail);
    if (!account) {
      throw new UnauthorizedException();
    }
    if (account.password === password) {
      const payload = {
        sub: account.uuid,
        email: account.mail,
        role: account.role,
        appId: this.configService.get<string>('APP_ID'),
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  getAccounts() {
    return this.accountRepository.find();
  }

  deleteAll() {
    return this.accountRepository.clear();
  }
}
