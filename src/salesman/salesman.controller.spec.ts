import { Test, TestingModule } from '@nestjs/testing';
import { SalesmanController } from './salesman.controller';

describe('SalesmanController', () => {
  let controller: SalesmanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesmanController],
    }).compile();

    controller = module.get<SalesmanController>(SalesmanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
