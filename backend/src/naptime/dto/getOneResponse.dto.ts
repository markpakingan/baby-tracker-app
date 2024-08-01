import {IsDateString, IsInt } from "class-validator";

export class GetOneResponseDto{

    @IsDateString()
    date: string; 

    @IsInt()
    baby_id: number; 

    @IsInt()
    userId: number; 
    
}