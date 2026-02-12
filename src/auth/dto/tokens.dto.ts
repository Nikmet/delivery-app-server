import { IsEmail, IsString, MinLength } from "class-validator";

export class RefreshTokenDTO {
    @IsString()
    refreshToken: string;
}
