import { Test, TestingModule } from '@nestjs/testing';
import { LensOrderService } from './lens-order.service';

describe('LensOrderService', () => {
  let service: LensOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LensOrderService],
    }).compile();

    service = module.get<LensOrderService>(LensOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
