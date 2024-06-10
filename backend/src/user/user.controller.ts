import { Controller, Logger, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    private readonly logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService){}


    @Post('/create')
    async createUser(){

        try{

            return "this creates a user"

        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }

    @Get('/getall')
    async getAllUser(){
        try{
            return "this get all users"
        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }

    @Get('/getone')
    async getOneUser(){
        try{
            return "this get one user"
        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }


    @Post('/update')
    async updateUser(){
        try{
            return "this update a user"
        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }
}
