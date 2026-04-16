import { Test, TestingModule } from '@nestjs/testing';
import { ColourdetailsService } from './colourdetails.service';

describe('ColourdetailsService', () => {
  let service: ColourdetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColourdetailsService],
    }).compile();

    service = module.get<ColourdetailsService>(ColourdetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
