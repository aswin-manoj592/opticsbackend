import { Test, TestingModule } from '@nestjs/testing';
import { FrametypeService } from './frametype.service';

describe('FrametypeService', () => {
  let service: FrametypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrametypeService],
    }).compile();

    service = module.get<FrametypeService>(FrametypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
