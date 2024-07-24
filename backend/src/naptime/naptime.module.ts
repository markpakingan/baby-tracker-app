import { Module } from '@nestjs/common';
import { NapTimeController } from './naptime.controller';
import { NapTimeService } from './naptime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BabyEntity } from 'src/baby/baby.entity';
import { NapTimeEntity } from './naptime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NapTimeEntity, BabyEntity])],
  controllers: [NapTimeController],
  providers: [NapTimeService]
})
export class NapTimeModule {}
