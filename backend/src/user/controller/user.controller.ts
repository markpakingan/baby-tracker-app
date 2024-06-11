import { Controller, Logger, Post, Get, Body, Query, Patch } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/createUserDto';
import { UpdateUserDto } from '../dto/updateUserDto';

@Controller('user')
export class UserController {

    private readonly logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService){}


    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto ){

        try{

            return await this.userService.create(createUserDto)

        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }

    @Get('/getall')
    async getAllUser(
        @Query('page') page: number, 
        @Query('order') order: string,
        @Query('size') size: number, 
    ){
        try{
            return await this.userService.getAll(
                page, 
                order, 
                size
            )
        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }

    @Get('/getone')
    async getOneUser(
        @Query('id') id:number
    ){
        try{
            return await this.userService.getOne(id)
        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }


    @Patch('/update')
    async updateUser(
        @Body() updatedUserDto: UpdateUserDto, 
        @Query('id') id: number
    ){
        try{
            return await this.userService.update(updatedUserDto, id)
        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }
}
