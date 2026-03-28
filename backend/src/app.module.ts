import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { InvestmentsModule } from './investments/investments.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PropertiesModule,
    InvestmentsModule,
    PortfolioModule,
  ],
})
export class AppModule {}
