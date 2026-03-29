import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('summary')
  getSummary(@Req() req: any) {
    return this.portfolioService.getSummary(req.user.id);
  }

  @Get('holdings')
  getHoldings(@Req() req: any) {
    return this.portfolioService.getHoldings(req.user.id);
  }

  @Get('transactions')
  getTransactions(@Req() req: any, @Query() query: any) {
    return this.portfolioService.getTransactions(req.user.id, query);
  }
}
