import { Test, TestingModule } from '@nestjs/testing';
import { TrackingPlansController } from './tracking-plans.controller';
import { TrackingPlansService } from './tracking-plans.service';

describe('TrackingPlansController', () => {
  let controller: TrackingPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingPlansController],
      providers: [TrackingPlansService],
    }).compile();

    controller = module.get<TrackingPlansController>(TrackingPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
