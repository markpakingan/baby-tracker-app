// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from './user/user.entity';
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { JwtModule } from "@nestjs/jwt";
// // import { MulterModule } from "@nestjs/platform-express";
// // import { LoggerModule } from "nestjs-pino";
// // import { memoryStorage } from "multer";

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//         isGlobal: true,
//     }),
//     TypeOrmModule.forRootAsync({
//         imports: [ConfigModule],
//         inject: [ConfigService],
//         useFactory: (configService: ConfigService) => ({
//             type: "mysql",
//             host: configService.get<string>("DB_HOST"),
//             port: Number(configService.get<string>("DB_PORT")),
//             username: configService.get<string>("DB_USER"),
//             password: configService.get<string>("DB_PASS"),
//             database: configService.get<string>("DB_NAME"),
//             entities: [
//                 UserEntity
//             ],
//             synchronize: true,
//         }),
//     }),
//     JwtModule.registerAsync({
//         imports: [ConfigModule],
//         inject: [ConfigService],
//         useFactory: async (configService: ConfigService) => ({
//             secret: configService.get<string>("JWT_SECRET"),
//             signOptions: {
//                 expiresIn: configService.get<string>("JWT_EXPIRATION"),
//             },
//         }),
//     }),
//     // MulterModule.register({
//     //     dest: "./uploads",
//     //     storage: memoryStorage(),
//     // }),
//     // LoggerModule.forRoot({
//     //     pinoHttp: {
//     //         transport: {
//     //             target: "pino-pretty",
//     //             options: {
//     //                 singleLine: true,
//     //             },
//     //         },
//     //     },
//     // }),
//     // TypeOrmModule.forFeature([
//     //     UserEntity
//     // ]),
//     UserModule
// ],
// controllers: [
//     AppController,
// ],
// providers: [
//     AppService,
    
// ],
// })
// export class AppModule {}



import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { UserEntity } from "./user/user.entity";


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
                entities: [UserEntity],
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
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
