import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NapTimeEntity } from '../naptime.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CreateNapTimeDto } from '../dto/createNaptime.dto';
import { BabyEntity } from 'src/baby/baby.entity';

@Injectable()
export class NapTimeService {


    constructor(
        @InjectRepository(NapTimeEntity)
        private readonly napTimeRepo: Repository<NapTimeEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepo : Repository<UserEntity>,

        @InjectRepository(BabyEntity)
        private readonly babyRepo : Repository<BabyEntity>



    ){}


    async create(
        createNapTimeDto: CreateNapTimeDto
    ){

        // const existingNapTime = await this.napTimeRepo.findOneBy({date: createNapTimeDto.date})

        // if(existingNapTime){
        //     throw new NotFoundException("Date already existed!")
        // }



        const existingUser = await this.userRepo.findOneBy({id: createNapTimeDto.userId})

        if(!existingUser){
            throw new NotFoundException({
                status: "Error", 
                message: "UserID not found!"
            })
        }


        //checks if a baby_id belongs to a user_id
        const matchedBaby = await this.babyRepo.findOneBy({
            id: createNapTimeDto.baby_id, 
            userId: createNapTimeDto.userId
        })


        if(!matchedBaby){
            throw new NotFoundException({
                status: "error",
                message: "baby does not belong to the specified user"
            })
        }
        // Save to naptime entity
        const newNaptime = new NapTimeEntity;

        newNaptime.date = createNapTimeDto.date;
        newNaptime.babyId = createNapTimeDto.baby_id; 
        newNaptime.userId = createNapTimeDto.userId;
        await this.napTimeRepo.save(newNaptime)

        return{
            status: "OK",
            message: "New naptime created successfully", 
            data: newNaptime
        }
    }




}




