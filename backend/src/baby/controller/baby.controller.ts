import { Controller, Post, Get, Patch, Logger, Body, Query } from '@nestjs/common';
import { BabyService } from '../service/baby.service';
import { CreateBabyDto } from '../dto/createBabyDto';

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
    async updateBaby(){


        try{
            return "this baby UPDATE is working"
        }catch(error){
            this.logger.error(BabyController.name, error)
            throw error;
        }
    }


    
}

