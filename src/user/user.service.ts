import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { returnUserObject } from "./returnUserObject.js";
import { Prisma } from "../generated/prisma/client.js";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getById(id: string, selectObject: Prisma.UserSelect = {}) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                ...returnUserObject,
                favorites: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        price: true,
                        slug: true,
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                ...selectObject
            }
        });

        if (!user) throw new Error("User not found");

        return user;
    }

    async toggleFavorite(userId: string, productId: string) {
        const user = await this.getById(userId);

        if (!user) throw new Error("User not found");

        const isExists = user.favorites.some(favorite => favorite.id === productId);

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                favorites: {
                    [isExists ? "disconnect" : "connect"]: {
                        id: productId
                    }
                }
            }
        });

        return user.favorites;
    }
}
