import { Test, TestingModule } from '@nestjs/testing';
import { NapTimeService } from './naptime.service';

describe('NapTimeService', () => {
  let service: NapTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NapTimeService],
    }).compile();

    service = module.get<NapTimeService>(NapTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


