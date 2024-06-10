import { IsInt, IsString} from "class-validator";

export class CreateUserDto {

    @IsInt()
    id: number; 

    @IsString()
    username: string; 

    @IsString()
    password: string; 

    @IsString()
    email: string; 

}