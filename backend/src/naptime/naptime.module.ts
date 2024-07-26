import { Module } from '@nestjs/common';
import { NapTimeController } from './controller/naptime.controller';
import { NapTimeService } from './service/naptime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BabyEntity } from 'src/baby/baby.entity';
import { NapTimeEntity } from './naptime.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NapTimeEntity, BabyEntity, UserEntity])],
  controllers: [NapTimeController],
  providers: [NapTimeService]
})
export class NapTimeModule {}
