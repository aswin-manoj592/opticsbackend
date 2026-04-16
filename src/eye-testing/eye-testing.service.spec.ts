import { Test, TestingModule } from '@nestjs/testing';
import { EyeTestingService } from './eye-testing.service';

describe('EyeTestingService', () => {
  let service: EyeTestingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EyeTestingService],
    }).compile();

    service = module.get<EyeTestingService>(EyeTestingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
