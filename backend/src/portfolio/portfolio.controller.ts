import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestWithUser } from '../common/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('summary')
  getSummary(@Req() req: RequestWithUser) {
    return this.portfolioService.getSummary(req.user.id);
  }

  @Get('holdings')
  getHoldings(@Req() req: RequestWithUser) {
    return this.portfolioService.getHoldings(req.user.id);
  }

  @Get('transactions')
  getTransactions(@Req() req: RequestWithUser, @Query() query: Record<string, string>) {
    return this.portfolioService.getTransactions(req.user.id, query);
  }
}
