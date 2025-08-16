import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackingPlanDto } from './create-tracking-plan.dto';

export class UpdateTrackingPlanDto extends PartialType(CreateTrackingPlanDto) {}
