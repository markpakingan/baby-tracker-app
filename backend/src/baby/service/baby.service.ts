import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BabyEntity } from '../baby.entity';
import {Repository } from 'typeorm';
import { CreateBabyDto } from '../dto/createBabyDto';
import { UserEntity } from 'src/user/user.entity';
import { UpdateBabyDto } from '../dto/updateBabyDto';

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

        newBaby.user= existingUser;
        newBaby.name = createBabyDto.name; 
        newBaby.dateOfBirth = createBabyDto.dateOfBirth;
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

            dto.id = baby.id; 
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

    async getOne(
        id: number
    ){

        const existingBaby = await this.babyRepo.findOneBy({id})

        if (!existingBaby){
            throw new NotFoundException("Baby not found!")
        }

        return{
            status: "Ok",
            message: "Baby found successfully",
            data: existingBaby
        }
    }

    async update(        
        babyId: number, 
        updateBabyDto: UpdateBabyDto
    ){

        // check if BabyId is existing
        const existingBaby = await this.babyRepo.findOne({
            where: {id: babyId}, 
        })


        const matchedUser = await this.userRepo.findOne({
            where: {id:updateBabyDto.userId}
        })

        
        if(!existingBaby){
            throw new NotFoundException({
                status: "error", 
                message: "Baby Id Not Found!"
            })
        }

        if(!matchedUser){
            throw new NotFoundException({
                status: "error", 
                message: "User Id Not Found!"
            })
        }


        // updates existing Baby info
        existingBaby.name = updateBabyDto.name;
        existingBaby.dateOfBirth = updateBabyDto.dateOfBirth;
        existingBaby.gender = updateBabyDto.gender;
        existingBaby.user = matchedUser;

        await this.babyRepo.save(existingBaby)


        return {
                    "status": "OK",
                    "message": "Baby update successfully",
                    "data": {
                        "id": babyId,
                        "name": updateBabyDto.name,
                        "dateOfBirth": updateBabyDto.dateOfBirth,
                        "gender": updateBabyDto.gender,
                        "user": matchedUser
                        }
                    }
                
    }

}
