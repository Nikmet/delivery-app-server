import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { PrismaService } from "../prisma.service.js";
import { JwtStrategy } from "./jwt.strategy.js";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJwtConfig } from "../config/jwt.config.js";

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy],
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        })
    ]
})
export class AuthModule {}
