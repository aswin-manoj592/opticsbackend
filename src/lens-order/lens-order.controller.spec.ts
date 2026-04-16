import { Test, TestingModule } from '@nestjs/testing';
import { LensOrderController } from './lens-order.controller';

describe('LensOrderController', () => {
  let controller: LensOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LensOrderController],
    }).compile();

    controller = module.get<LensOrderController>(LensOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
