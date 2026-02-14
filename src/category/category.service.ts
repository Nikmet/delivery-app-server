import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { returnCategoryObject } from "./return-category.object.js";
import { CategoryDTO } from "./dto/category.dto.js";
import { generateSlug } from "../utils/generate-slug.js";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.category.findMany({
            select: returnCategoryObject
        });
    }

    async findById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id
            },
            select: returnCategoryObject
        });

        if (!category) throw new Error("Category not found");

        return category;
    }

    async bySlag(slug: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug
            },
            select: returnCategoryObject
        });

        if (!category) throw new Error("Category not found");

        return category;
    }

    async create() {
        return await this.prisma.category.create({
            data: {
                name: "",
                slug: "",
                image: ""
            }
        });
    }

    async update(id: string, dto: CategoryDTO) {
        console.log(dto);
        
        return await this.prisma.category.update({
            where: {
                id
            },
            data: {
                ...dto,
                slug: generateSlug(dto.name)
            }
        });
    }

    async delete(id: string) {
        return await this.prisma.category.delete({
            where: {
                id
            }
        });
    }
}
