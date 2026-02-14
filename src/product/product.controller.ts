import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { ProductService } from "./product.service.js";
import { ProductDTO } from "./dto/product.dto.js";
import { Auth } from "../decorators/auth.decorator.js";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UsePipes(new ValidationPipe())
    @Get()
    getAll(@Query("searchTerm") searchTerm?: string) {
        return this.productService.getAll(searchTerm);
    }

    @Get("/by-slug/:slug")
    bySlag(@Param("slug") slug: string) {
        return this.productService.findBySlag(slug);
    }

    @Get("/by-category/:categorySlug")
    byCategory(@Param("categorySlug") categorySlug: string) {
        return this.productService.findByCategory(categorySlug);
    }

    @Post("/create")
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    @Auth()

    async create() {
        return await this.productService.create();
    }

    @Put("/update/:id")
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    @Auth()

    async update(@Param("id") id: string, @Body() dto: ProductDTO) {
        return await this.productService.update(id, dto);
    }

    @Delete("/delete/:id")
    @HttpCode(200)
    @Auth()
    async delete(@Param("id") id: string) {
        return await this.productService.delete(id);
    }
}
