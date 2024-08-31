import {IsObject, IsString} from "class-validator";

export class CreateResponseDto {

    @IsString()
    status: string; 

    @IsString()
    message: string; 

    @IsObject()
    data: {
        id: number;
        username: string;
        firstname: string;
        lastname: string;
        email: string; 
    }

}