import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDTO {
    @IsEmail(
        {},
        {
            message: "Некорректный адрес электронной почты"
        }
    )
    email: string;

    @IsString()
    @MinLength(6, {
        message: "Пароль должен содержать не менее 6 символов"
    })
    password: string;
}
