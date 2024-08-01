import { IsDateString, IsInt } from "class-validator";


export class UpdateNapTimeResponse{

    @IsDateString()
    date: string;

    @IsInt()
    babyId: number; 

    @IsInt()
    userId: number;

}

