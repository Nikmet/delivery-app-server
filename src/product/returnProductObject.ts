import { returnCategoryObject } from "../category/return-category.object.js";
import { Prisma } from "../generated/prisma/client.js";

export const returnProductObject: Prisma.ProductSelect = {
    id: true,
    name: true,
    description: true,
    price: true,
    slug: true,
    image: true,
    category: {
        select: returnCategoryObject
    }
};
