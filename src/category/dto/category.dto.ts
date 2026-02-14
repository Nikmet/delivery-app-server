import { IsString, MaxLength, MinLength } from "class-validator";

export class CategoryDTO {
    @IsString({ message: "Название категории должно быть строкой" })
    @MinLength(3, { message: "Название категории должно содержать не менее 3 символов" })
    @MaxLength(50, { message: "Название категории должно содержать не более 50 символов" })
    name: string;

    @IsString({ message: "Ссылка на картинку должна быть строкой" })
    image: string;
}
