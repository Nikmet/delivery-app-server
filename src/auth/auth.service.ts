import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthDTO } from "./dto/auth.dto.js";
import { faker } from "@faker-js/faker";
import { hash, verify } from "argon2";
import { PrismaService } from "../prisma.service.js";
import { JwtService } from "@nestjs/jwt";
import { User } from "../generated/prisma/client.js";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    private async issueToken(userId: string) {
        const data = { id: userId };

        const accessToken = this.jwt.sign(data, {
            expiresIn: "1h"
        });

        const refreshToken = this.jwt.sign(data, {
            expiresIn: "7d"
        });

        return { accessToken, refreshToken };
    }

    private returnUserFields(user: User) {
        const { id, email } = user;

        return {
            id,
            email
        };
    }

    private async getUser(dto: AuthDTO): Promise<User> {
        const { email } = dto;

        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) throw new NotFoundException("Пользователь не найден");

        const isValid = await verify(user.password, dto.password);

        if (!isValid) throw new UnauthorizedException("Неправильный пароль");

        return user;
    }

    async register(dto: AuthDTO) {
        const { email, password } = dto;

        const oldUser = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (oldUser) {
            throw new BadRequestException("Пользователь с таким email уже зарегистрирован. Попробуйте войти");
        }

        const user = await this.prisma.user.create({
            data: {
                email,
                password: await hash(password),
                name: faker.person.fullName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number()
            }
        });

        const tokens = await this.issueToken(user.id);

        return {
            user: this.returnUserFields(user),
            ...tokens
        };
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken);

        if (!result) throw new UnauthorizedException("Некорректный refreshToken");

        const user = await this.prisma.user.findUnique({
            where: {
                id: result.id
            }
        });

        if (!user) throw new NotFoundException("Пользователь не найден");

        const tokens = await this.issueToken(user.id);

        return {
            user: this.returnUserFields(user),
            ...tokens
        };
    }

    async login(dto: AuthDTO) {
        const user = await this.getUser(dto);
        const tokens = await this.issueToken(user.id);

        return {
            user: this.returnUserFields(user),
            ...tokens
        };
    }
}
