import { Test, TestingModule } from '@nestjs/testing';
import { TrackingPlansService } from './tracking-plans.service';

describe('TrackingPlansService', () => {
  let service: TrackingPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingPlansService],
    }).compile();

    service = module.get<TrackingPlansService>(TrackingPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
