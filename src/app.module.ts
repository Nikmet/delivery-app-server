import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AuthModule } from "./auth/auth.module.js";
import { AppService } from "./app.service.js";
import { ConfigModule } from "@nestjs/config";
import { CategoryModule } from "./category/category.module.js";
import { ProductModule } from "./product/product.module.js";
import { UserModule } from "./user/user.module.js";

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, CategoryModule, ProductModule, UserModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
