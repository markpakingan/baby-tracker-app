import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { BabyEntity } from 'src/baby/baby.entity';


@Entity({name: "naptime", synchronize: true})
export class NapTimeEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=> BabyEntity)
    @JoinColumn({name: "babyId"})
    babyId: number;
    


    @Column()
    date: Date;


}

