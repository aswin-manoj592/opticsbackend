import { Test, TestingModule } from '@nestjs/testing';
import { ColourdetailsController } from './colourdetails.controller';

describe('ColourdetailsController', () => {
  let controller: ColourdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColourdetailsController],
    }).compile();

    controller = module.get<ColourdetailsController>(ColourdetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
