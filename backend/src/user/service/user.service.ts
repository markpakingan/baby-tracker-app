import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUserDto';
import { CreateResponseDto } from '../dto/createResponseDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
      ) {}

  
      async create(createUserDto: CreateUserDto): Promise<CreateResponseDto>{

        const existingUser = await this.repo.findOne({where: {username: createUserDto.username}})

        if(existingUser){
          throw new NotFoundException("Username already exist!")
        }


        const newUser = await this.repo.create(createUserDto);
        await this.repo.save(newUser)

        const response = new CreateResponseDto();

        response.status = "Successful!";
        response.message = "Record successfully created";
        response.data = {
          id: createUserDto.id,
          username: createUserDto.username,
          email: createUserDto.email
        }

        return response;
      }
}
