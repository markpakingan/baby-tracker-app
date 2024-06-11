import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BabyEntity } from '../baby.entity';
import {Repository } from 'typeorm';
import { CreateBabyDto } from '../dto/createBabyDto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class BabyService {

    constructor(
        @InjectRepository(BabyEntity)
        private readonly babyRepo: Repository<BabyEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
        
    ){}


    async create(
        createBabyDto: CreateBabyDto
    ){

        const existingBaby = await this.babyRepo.findOneBy({name: createBabyDto.name})

        if(existingBaby){
            throw new NotFoundException("Duplicate name existed!")
        }


        const existingUser = await this.userRepo.findOneBy({id:createBabyDto.userId})

        if(!existingUser){
            throw new NotFoundException({
                status: "Error", 
                message: "UserID not found!"
            })
        }

        //Save to baby entity
        const newBaby = new BabyEntity;

        newBaby.userId= existingUser.id;
        newBaby.name = createBabyDto.name; 
        newBaby.dateOfBirth = new Date(createBabyDto.dateOfBirth)
        newBaby.gender = createBabyDto.gender;
        await this.babyRepo.save(newBaby)


        return {
            status: "OK",
            message: "New baby created successfully",
            data: newBaby
        }

    }

    async getAll(
        page: number, 
        size: number, 
        order: string
    ){

        const take = size || 5 
        const skip = (page - 1) * take; 

        const data = await this.babyRepo.findAndCount({
            take, 
            skip, 
            order:{
                id: 'ASC'
            }
        })

        const [result, total] = data
        const lastPage = Math.ceil(total/ Number(size))


        const info = result.map((baby: BabyEntity)=>{

            const dto = new BabyEntity

            dto.userId = baby.id; 
            dto.name = baby.name;
            dto.dateOfBirth = baby.dateOfBirth;
            dto.gender = baby.gender;
    
            return dto; 
        })

        return{
            count: total, 
            rows: info, 
            cpage: Number(page),
            tpage: lastPage
        }
    }

}
