import { Module } from '@nestjs/common';
import { BabyService } from './service/baby.service';
import { BabyController } from './controller/baby.controller';
import { BabyEntity } from './baby.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BabyEntity, UserEntity  ])],
  providers: [BabyService],
  controllers: [BabyController]
})
export class BabyModule {}
