import { Test, TestingModule } from '@nestjs/testing';
import { NapTimeController } from './nap_time.controller';

describe('NapTimeController', () => {
  let controller: NapTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NapTimeController],
    }).compile();

    controller = module.get<NapTimeController>(NapTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
