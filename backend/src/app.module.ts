import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { UserEntity } from "./user/user.entity";
import { BabyModule } from './baby/baby.module';
import { BabyEntity } from "./baby/baby.entity";
import { NapTimeModule } from './naptime/naptime.module';
import { NapTimeEntity } from "./naptime/naptime.entity";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get<string>("DB_HOST"),
                port: Number(configService.get<string>("DB_PORT")),
                username: configService.get<string>("DB_USER"),
                password: configService.get<string>("DB_PASS"),
                database: configService.get<string>("DB_NAME"),
                entities: [UserEntity, BabyEntity, NapTimeEntity],
                synchronize: true,
            }),
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.get<string>("JWT_EXPIRATION"),
                },
            }),
        }),
        UserModule,
        BabyModule,
        NapTimeModule, 
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
