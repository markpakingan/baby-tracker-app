import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Gender } from './gender.enum';
import { UserEntity } from 'src/user/user.entity';


@Entity({name: "baby", synchronize: true})
export class BabyEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=> UserEntity)
    @JoinColumn({name: "userId"})
    userId: number;

    @Column()
    name: string; 
    
    @Column()
    dateOfBirth: Date;


    @Column({ type: 'enum', enum: Gender, default: Gender.male})
    gender: Gender;

}

