import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { ProductDTO } from "./dto/product.dto.js";
import { generateSlug } from "../utils/generate-slug.js";
import { returnProductObject } from "./returnProductObject.js";
import { CategoryService } from "../category/category.service.js";

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private categoryService: CategoryService
    ) {}

    async search(searchTerm: string) {
        return await this.prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            select: returnProductObject
        });
    }

    async getAll(searchTerm?: string) {
        if (searchTerm) return this.search(searchTerm);

        return await this.prisma.product.findMany({
            select: returnProductObject,
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async findBySlag(slug: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug
            },
            select: returnProductObject
        });

        if (!product) throw new Error("product not found");

        return product;
    }
    async findByCategory(categorySlug: string) {
        const category = await this.categoryService.bySlag(categorySlug);

        const products = await this.prisma.product.findMany({
            where: {
                categoryId: category.id
            },
            select: returnProductObject
        });

        if (!products.length) throw new Error("products not found");

        return products;
    }

    async create() {
        return await this.prisma.product.create({
            data: {
                name: "",
                slug: "",
                image: "",
                description: "",
                price: 0
            },
            select: returnProductObject
        });
    }

    async update(id: string, dto: ProductDTO) {
        const { categoryId, description, image, name, price } = dto;

        if (categoryId) {
            await this.categoryService.findById(categoryId);
        }

        return await this.prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                description,
                image,
                price,
                slug: generateSlug(dto.name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        });
    }

    async delete(id: string) {
        return await this.prisma.product.delete({
            where: {
                id
            }
        });
    }
}
