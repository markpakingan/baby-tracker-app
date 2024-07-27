import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NapTimeEntity } from '../naptime.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CreateNapTimeDto } from '../dto/createNaptime.dto';
import { BabyEntity } from 'src/baby/baby.entity';
import { GetOneResponseDto } from '../dto/getOneResponse.dto';
import { match } from 'assert';

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

        const existingUser = await this.userRepo.findOneBy({id: createNapTimeDto.userId})

        if(!existingUser){
            throw new NotFoundException({
                status: "Error", 
                message: "UserID not found!"
            })
        }


        //checks if a baby_id belongs to a user_id
        const matchedBaby = await this.babyRepo.findOne({
            where: {
                id: createNapTimeDto.babyId, 
                userId: createNapTimeDto.userId,
            }
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
        newNaptime.babyId = matchedBaby;
        newNaptime.userId = existingUser; 
        await this.napTimeRepo.save(newNaptime)

        return{
            status: "OK",
            message: "New naptime created successfully", 
            data: newNaptime
        }
    }


    async getAll(
        page: number, 
        size: number, 
        order: string
    ){
        const take = size || 5 
        const skip = (page - 1) * take; 

        const data = await this.napTimeRepo.findAndCount({
            take, 
            skip, 
            order:{
                id: 'ASC'
            }, 
            relations: ['babyId', 'userId'],
        })

        const [result, total] = data
        const lastPage = Math.ceil(total/ Number(size))


        const info = result.map((naptime: NapTimeEntity)=> {

            const dto = new NapTimeEntity; 

            dto.date = naptime.date;
            dto.babyId = naptime.babyId; 
            dto.userId = naptime.userId; 

            return dto
        })


        return{
            count: total, 
            rows: info, 
            cpage: Number(page),
            tpage: lastPage
        }

    }


    async getOne(
        naptime_id: number
    ){

        const existingNaptTimeId = await this.napTimeRepo.findOne({
            where: {id: naptime_id},
            relations: ['babyId', 'userId']
    })

        if(!existingNaptTimeId){
            throw new NotFoundException({
                status: "error", 
                message: "Nap time not found!"
            })
        }

        const response = new GetOneResponseDto()

        response.date = existingNaptTimeId.date;
        response.baby_id = existingNaptTimeId.babyId.id;
        response.userId = existingNaptTimeId.userId.id;

        return response;

    }

    async update(){

    }


}




