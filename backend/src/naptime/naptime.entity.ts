import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { BabyEntity } from 'src/baby/baby.entity';
import { UserEntity } from 'src/user/user.entity';


@Entity({name: "naptime", synchronize: true})
export class NapTimeEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=> BabyEntity)
    @JoinColumn({name: "babyId"})
    babyId: number;
    
    @ManyToOne( () => UserEntity, user=> user.naptimes)
    @JoinColumn({ name: "userId"})
    userId: number;

    @Column()
    date: string;


}


