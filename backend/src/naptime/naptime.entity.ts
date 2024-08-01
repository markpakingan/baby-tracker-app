import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import { BabyEntity } from 'src/baby/baby.entity';
import { UserEntity } from 'src/user/user.entity';


@Entity({name: "naptime", synchronize: true})
export class NapTimeEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> BabyEntity, baby => baby.naptimes)
    @JoinColumn({name: "babyId"})
    babies: BabyEntity;
    
    @ManyToOne( () => UserEntity, user=> user.naptimes)
    @JoinColumn({ name: "userId"})
    user: UserEntity;

    @Column()
    date: string;


}


