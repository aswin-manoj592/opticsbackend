import { Test, TestingModule } from '@nestjs/testing';
import { ColourCodeController } from './colour-code.controller';

describe('ColourCodeController', () => {
  let controller: ColourCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColourCodeController],
    }).compile();

    controller = module.get<ColourCodeController>(ColourCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
