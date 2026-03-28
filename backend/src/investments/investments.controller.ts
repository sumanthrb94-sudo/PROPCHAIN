import { Controller, Get, Post, Body, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestWithUser } from '../common/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post('purchase')
  purchase(
    @Req() req: RequestWithUser,
    @Body() body: { propertyId: string; tokenAmount: number; paymentMethod: string },
  ) {
    return this.investmentsService.purchase(req.user.id, body);
  }

  @Get('user/:userId')
  findByUser(@Req() req: RequestWithUser, @Param('userId') userId: string) {
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      throw new ForbiddenException('Access to this resource is not allowed');
    }
    return this.investmentsService.findByUser(userId);
  }

  @Get('property/:propertyId')
  findByProperty(@Param('propertyId') propertyId: string) {
    return this.investmentsService.findByProperty(propertyId);
  }
}
