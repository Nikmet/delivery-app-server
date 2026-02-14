import { Controller, Get, HttpCode, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { Auth } from "../decorators/auth.decorator.js";
import { CurrentUser } from "../decorators/user.decorator.js";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("profile")
    @Auth()
    async getProfile(@CurrentUser("id") userId: string) {
        return this.userService.getById(userId);
    }

    @Patch("profile/favorites/:productId")
    @Auth()
    @HttpCode(200)
    async toggleFavorite(@CurrentUser("id") userId: string, @Param("productId") productId: string) {
        return this.userService.toggleFavorite(userId, productId);
    }
}
