import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

if (!process.env.JWT_SECRET && process.env.NODE_ENV !== 'test') {
  console.warn(
    '[AuthModule] WARNING: JWT_SECRET is not set. Using insecure default. Set JWT_SECRET in production.',
  );
}

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev_only_secret_change_in_production',
      signOptions: { expiresIn: (process.env.JWT_EXPIRY || '7d') as never },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
