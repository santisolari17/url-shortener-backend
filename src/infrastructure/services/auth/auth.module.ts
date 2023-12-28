import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfigModel } from 'src/infrastructure/config/AppConfigModel';
import { AppConfigService } from '../appConfig/AppConfigService';
import { AuthenticationService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthenticationService, AppConfigService, JwtStrategy],
  exports: [AuthenticationService],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const appConfig: AppConfigModel = config.get('appConfig');

        return {
          secret: appConfig.jwtSecretKey,
          signOptions: { expiresIn: appConfig.jwtTokenExpirationSecs },
        };
      },
    }),
  ],
})
export class AuthenticationModule {}
