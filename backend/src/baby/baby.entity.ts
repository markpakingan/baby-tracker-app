import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Gender } from './gender.enum';
import { UserEntity } from 'src/user/user.entity';


@Entity({name: "baby", synchronize: true})
export class BabyEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> UserEntity, user => user.babies )
    @JoinColumn({name: "userId"})
    user: UserEntity;

    @Column()
    name: string; 
    
    @Column()
    dateOfBirth: Date;


    @Column({ type: 'enum', enum: Gender, default: Gender.male})
    gender: Gender;

}

