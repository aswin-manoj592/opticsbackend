import { Test, TestingModule } from '@nestjs/testing';
import { MadebyService } from './madeby.service';

describe('MadebyService', () => {
  let service: MadebyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MadebyService],
    }).compile();

    service = module.get<MadebyService>(MadebyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
