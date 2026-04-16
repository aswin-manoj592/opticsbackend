import { Test, TestingModule } from '@nestjs/testing';
import { LenscolourService } from './lenscolour.service';

describe('LenscolourService', () => {
  let service: LenscolourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LenscolourService],
    }).compile();

    service = module.get<LenscolourService>(LenscolourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
