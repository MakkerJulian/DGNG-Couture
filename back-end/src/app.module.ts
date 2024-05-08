import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AccountModule } from './api/account/account.module';
import configuration from './config/configuration';
import { AuthGuard } from './api/auth/Authguard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('database.uri'),
        entities: ['dist/**/*.entity.js'],
        autoLoadEntities: true,
        migrationsRun: true,
        migrations: ['dist/migrations/*.js'],
        synchronize: false,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
    AccountModule,
  ],
  controllers: [],
  providers: [{ provide: 'APP_GUARD', useValue: AuthGuard }],
})
export class AppModule {}
