import {IsString, IsEnum, IsDateString } from "class-validator";
import { Gender } from "../gender.enum";

export class CreateBabyDto{

    @IsString()
    userId: number; 

    @IsString()
    name: string; 

    @IsDateString()
    dateOfBirth : string;

    @IsEnum(Gender)
    gender: Gender
}