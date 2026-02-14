import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoryService } from "./category.service.js";
import { CategoryDTO } from "./dto/category.dto.js";
import { Auth } from "../decorators/auth.decorator.js";

@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getAll() {
        return this.categoryService.getAll();
    }

    @Get("/by-slug/:slug")
    bySlug(@Param("slug") slug: string) {
        return this.categoryService.bySlag(slug);
    }

    @Get("/by-id/:id")
    byId(@Param("id") id: string) {
        return this.categoryService.findById(id);
    }

    @Post("/create")
    @HttpCode(200)
    @Auth()
    create() {
        return this.categoryService.create();
    }

    @Put("/update/:id")
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    @Auth()
    update(@Param("id") id: string, @Body() dto: CategoryDTO) {
        console.log(dto);

        return this.categoryService.update(id, dto);
    }

    @Delete("/delete/:id")
    @HttpCode(200)
    @Auth()
    delete(@Param("id") id: string) {
        return this.categoryService.delete(id);
    }
}
