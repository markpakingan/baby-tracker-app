import { Controller, Post, Get, Patch, Logger, Body, Query, Param } from '@nestjs/common';
import { BabyService } from '../service/baby.service';
import { CreateBabyDto } from '../dto/createBabyDto';
import { UpdateBabyDto } from '../dto/updateBabyDto';

@Controller('baby')
export class BabyController {

    private readonly logger = new Logger(BabyController.name)

    constructor(private readonly babyService: BabyService){}



    @Post('/create')
    async createBaby(
        @Body() createBabyDto: CreateBabyDto
    ){

        try{
            return await this.babyService.create(createBabyDto)
        }catch(error){
            this.logger.error(BabyController.name, error)
            throw error;
        }
    }


    @Get('/getall')
    async getAllBaby(
        @Query('page') page: number, 
        @Query('size') size: number, 
        @Query('order') order: string
    ){

        try{
            return await this.babyService.getAll(page, size, order)

        }catch(error){
            this.logger.error(BabyController.name, error)
            throw error;
        }
    }


    @Get('/getone')
    async getOnebaby(
        @Query('id') id: number
    ){


        try{
            return await this.babyService.getOne(id)
        }catch(error){
            this.logger.error(BabyController.name, error)
            throw error;
        }
    }


    @Patch('/update')
    async updateBaby(
        @Query('id') babyId: number,
        @Body() updateBabyDto : UpdateBabyDto
    ){


        try{
            return this.babyService.update(babyId, updateBabyDto)
        }catch(error){
            this.logger.error(BabyController.name, error)
            throw error;
        }
    }


    @Get('/user/:id')
    async checkBaby(
        @Param('id') id: number
    ){
        try{
            return await this.babyService.checkBaby(id)

        }catch(error){
            this.logger.error(BabyController.name, error)
            throw error;
        }
    }

}

