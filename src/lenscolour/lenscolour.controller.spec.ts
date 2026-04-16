import { Test, TestingModule } from '@nestjs/testing';
import { LenscolourController } from './lenscolour.controller';

describe('LenscolourController', () => {
  let controller: LenscolourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LenscolourController],
    }).compile();

    controller = module.get<LenscolourController>(LenscolourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
