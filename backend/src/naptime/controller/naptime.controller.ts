import { Controller, Logger, Body, Query} from '@nestjs/common';
import { NapTimeService } from '../service/naptime.service';
import { Post, Get, Patch } from '@nestjs/common';
import { CreateNapTimeDto } from '../dto/createNaptime.dto';
import { UpdateNapTimeResponse } from '../dto/updateNapTimeResponse.dto';

@Controller('naptime')
export class NapTimeController {

    private readonly logger = new Logger(NapTimeController.name);
    constructor(private readonly napTimeService: NapTimeService){}


    @Post('/create')
    async createNapTime(
    
        @Body() createNapTimeDto: CreateNapTimeDto
    ){

        try{

            return this.napTimeService.create(createNapTimeDto)

        }catch(error){
            console.error('error creating naptime', error)
            this.logger.error(NapTimeController.name, error);
            throw error
        }
    }

    @Get('/getall')
    async getAllNapTime(
        @Query('page') page: number, 
        @Query('size') size: number, 
        @Query('order') order: string
  ){

        try{
            return this.napTimeService.getAll(page, size, order)

        }catch(error){
            this.logger.error(NapTimeController.name, error)
            throw error;
        }
    }


    @Get('/getone')
    async getOneNapTime(
        @Query('id') naptime_id: number
  ){

        try{
            return this.napTimeService.getOne(naptime_id)

        }catch(error){
            this.logger.error(NapTimeController.name, error)
            throw error;
        }
    }

    @Patch('/update')
    async UpdateNapTime(
        @Query('id') naptimeId : number,
        @Body() updateNapTimeResponse: UpdateNapTimeResponse
  ){

        try{
            return this.napTimeService.update(naptimeId, updateNapTimeResponse)

        }catch(error){
            this.logger.error(NapTimeController.name, error)
            throw error;
        }
    }

}

