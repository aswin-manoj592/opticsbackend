import { Test, TestingModule } from '@nestjs/testing';
import { MadebyController } from './madeby.controller';

describe('MadebyController', () => {
  let controller: MadebyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MadebyController],
    }).compile();

    controller = module.get<MadebyController>(MadebyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
