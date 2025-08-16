import { Module } from '@nestjs/common';
import { TrackingPlansService } from './tracking-plans.service';
import { TrackingPlansController } from './tracking-plans.controller';

@Module({
  controllers: [TrackingPlansController],
  providers: [TrackingPlansService],
})
export class TrackingPlansModule {}
