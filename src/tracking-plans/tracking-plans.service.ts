import { Injectable } from '@nestjs/common';
import { CreateTrackingPlanDto } from './dto/create-tracking-plan.dto';
import { UpdateTrackingPlanDto } from './dto/update-tracking-plan.dto';

@Injectable()
export class TrackingPlansService {
  create(createTrackingPlanDto: CreateTrackingPlanDto) {
    return 'This action adds a new trackingPlan';
  }

  findAll() {
    return `This action returns all trackingPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trackingPlan`;
  }

  update(id: number, updateTrackingPlanDto: UpdateTrackingPlanDto) {
    return `This action updates a #${id} trackingPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} trackingPlan`;
  }
}
