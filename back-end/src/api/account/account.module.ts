import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/typeorm/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      global: true,
      secret: 'DRAB_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
