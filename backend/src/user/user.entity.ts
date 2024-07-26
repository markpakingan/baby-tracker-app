import { NapTimeEntity } from 'src/naptime/naptime.entity';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity({name: "user", synchronize: true})
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string; 

    @Column()
    password: string; 
    
    @Column()
    email: string;

    @OneToMany(()=> NapTimeEntity, naptime => naptime.userId)
    naptimes: NapTimeEntity

}

