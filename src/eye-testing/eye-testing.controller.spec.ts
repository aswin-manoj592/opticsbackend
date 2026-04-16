import { Test, TestingModule } from '@nestjs/testing';
import { EyeTestingController } from './eye-testing.controller';

describe('EyeTestingController', () => {
  let controller: EyeTestingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EyeTestingController],
    }).compile();

    controller = module.get<EyeTestingController>(EyeTestingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
