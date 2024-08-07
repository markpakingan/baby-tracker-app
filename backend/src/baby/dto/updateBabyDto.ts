import {IsString, IsEnum, IsDateString } from "class-validator";
import { Gender } from "../gender.enum";

export class UpdateBabyDto{


    @IsString()
    name: string; 

    @IsDateString()
    dateOfBirth : string;

    @IsEnum(Gender)
    gender: Gender;

    @IsString()
    userId: number; 

}