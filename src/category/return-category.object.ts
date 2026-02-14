import { Prisma } from "../generated/prisma/client.js";

export const returnCategoryObject: Prisma.CategorySelect = {
    id: true,
    name: true,
    slug: true,
    image: true
};
