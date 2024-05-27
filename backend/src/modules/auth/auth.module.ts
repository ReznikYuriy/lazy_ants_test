import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import configs from '../../configs';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: configs.jwt.secret,
      signOptions: { expiresIn: configs.jwt.expiresIn },
    }),
    PassportModule.register({
      defaultStrategy: 'local',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
    AuthGuard,
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
