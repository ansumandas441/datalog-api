import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrackingPlansService } from './tracking-plans.service';
import { CreateTrackingPlanDto } from './dto/create-tracking-plan.dto';
import { UpdateTrackingPlanDto } from './dto/update-tracking-plan.dto';

@Controller('tracking-plans')
export class TrackingPlansController {
  constructor(private readonly trackingPlansService: TrackingPlansService) {}

  @Post()
  create(@Body() createTrackingPlanDto: CreateTrackingPlanDto) {
    return this.trackingPlansService.create(createTrackingPlanDto);
  }

  @Get()
  findAll() {
    return this.trackingPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackingPlanDto: UpdateTrackingPlanDto) {
    return this.trackingPlansService.update(+id, updateTrackingPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingPlansService.remove(+id);
  }
}
