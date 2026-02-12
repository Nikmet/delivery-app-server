import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthDTO } from "./dto/auth.dto.js";
import { RefreshTokenDTO } from "./dto/tokens.dto.js";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("register")
    async register(@Body() dto: AuthDTO) {
        return this.authService.register(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("login")
    async login(@Body() dto: AuthDTO) {
        return this.authService.login(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("login/access-token")
    async getNewTokens(@Body() dto: RefreshTokenDTO) {
        return this.authService.getNewTokens(dto.refreshToken);
    }
}
