import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller.js";
import { ProductService } from "./product.service.js";
import { PrismaService } from "../prisma.service.js";
import { CategoryService } from "../category/category.service.js";

@Module({
    controllers: [ProductController],
    providers: [ProductService, PrismaService, CategoryService]
})
export class ProductModule {}
