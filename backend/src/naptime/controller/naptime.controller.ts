import { Controller, Logger, Body} from '@nestjs/common';
import { NapTimeService } from '../service/naptime.service';
import { Post, Get, Patch } from '@nestjs/common';
import { CreateNapTimeDto } from '../dto/createNaptime.dto';
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
            this.logger.error(NapTimeController.name, error);
            throw error
        }
    }

    @Get('/getall')
    async getAllNapTime(
  ){

        try{
            return "Get All is working"

        }catch(error){
            this.logger.error(NapTimeController.name, error)
            throw error;
        }
    }


    @Get('/getone')
    async getOneNapTime(
  ){

        try{
            return "Get One is working"

        }catch(error){
            this.logger.error(NapTimeController.name, error)
            throw error;
        }
    }

    @Patch('/update')
    async UpdateNapTime(
  ){

        try{
            return "Update is working"

        }catch(error){
            this.logger.error(NapTimeController.name, error)
            throw error;
        }
    }

}

