import { Module } from '@nestjs/common';
import { NapTimeController } from './nap_time.controller';
import { NapTimeService } from './nap_time.service';

@Module({
  controllers: [NapTimeController],
  providers: [NapTimeService]
})
export class NapTimeModule {}
