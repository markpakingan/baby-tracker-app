import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NapTimeEntity } from '../naptime.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CreateNapTimeDto } from '../dto/createNaptime.dto';
import { BabyEntity } from 'src/baby/baby.entity';
import { GetOneResponseDto } from '../dto/getOneResponse.dto';

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

        //checks if user is existing
        const existingUser = await this.userRepo.findOneBy({id: createNapTimeDto.userId})
        if(!existingUser){
            throw new NotFoundException({
                status: "Error", 
                message: "UserID not found!"
            })
        }


        //checks if a babyId matches UserId
        const matchedBaby = await this.babyRepo.findOne({
            where: {
                id: createNapTimeDto.babyId,
                user: existingUser
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
        newNaptime.babies = matchedBaby;
        newNaptime.user = existingUser; 
        await this.napTimeRepo.save(newNaptime)

        return{
            status: "OK",
            message: "New naptime created successfully", 
            data: {
                date: createNapTimeDto.date,
                babyId: createNapTimeDto.babyId,
                userId: createNapTimeDto.userId

            }
        }
    }



    async getAll(
        page: number, 
        size: number, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            relations: ['babies', 'user'],
        })

        const [result, total] = data
        const lastPage = Math.ceil(total/ Number(size))


        const info = result.map((naptime: NapTimeEntity)=> {

            const dto = new NapTimeEntity; 

            dto.date = naptime.date;
            dto.babies = naptime.babies; 
            dto.user = naptime.user; 

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
            relations: ['babies', 'user']
    })

        if(!existingNaptTimeId){
            throw new NotFoundException({
                status: "error", 
                message: "Nap time not found!"
            })
        }

        const response = new GetOneResponseDto()

        response.date = existingNaptTimeId.date;
        response.baby_id = existingNaptTimeId.babies.id;
        response.userId = existingNaptTimeId.user.id;

        return response;

    }

    async update(
        naptime_id,
        updateNapTimeResponse
    ){
        
        const existingNaptTime = await this.napTimeRepo.findOneBy({id: naptime_id});

        if(! existingNaptTime){
            throw new NotFoundException({
                status: "error", 
                message: "Data not found!"
            })
        }
    

        //update existingNaptime
        existingNaptTime.babies = existingNaptTime.babies;
        existingNaptTime.user = existingNaptTime.user;
        existingNaptTime.date = updateNapTimeResponse.date;
        
        const updatedNaptime = await this.napTimeRepo.save(existingNaptTime)

        return {

            status: "ok", 
            message: "Naptime successfully updated",
            data: updatedNaptime
        }
    }

    // id:number;
    // babies: BabyEntity;
    // user: UserEntity;
    // date: string;


}




