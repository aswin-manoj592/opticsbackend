import { Test, TestingModule } from '@nestjs/testing';
import { FrametypeController } from './frametype.controller';

describe('FrametypeController', () => {
  let controller: FrametypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrametypeController],
    }).compile();

    controller = module.get<FrametypeController>(FrametypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
