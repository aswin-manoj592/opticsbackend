import { Test, TestingModule } from '@nestjs/testing';
import { ColourCodeService } from './colour-code.service';

describe('ColourCodeService', () => {
  let service: ColourCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColourCodeService],
    }).compile();

    service = module.get<ColourCodeService>(ColourCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
