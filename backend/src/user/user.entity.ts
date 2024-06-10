import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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

}

