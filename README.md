# delivery-app-server

Backend API для приложения доставки еды на **NestJS** + **Prisma (PostgreSQL)**: авторизация (JWT), категории, товары и профиль пользователя.

- Глобальный префикс API: **`/api`**
- CORS включён
- Порт: `process.env.PORT` или **`4200`** по умолчанию

---

## Стек

- NestJS
- TypeScript (ESM)
- Prisma + PostgreSQL
- JWT (access/refresh)
- argon2 (хеширование паролей)
- class-validator / ValidationPipe

---

## Быстрый старт

### 1) Установка зависимостей

yarn
# или
npm i
2) Переменные окружения
Создай файл .env в корне проекта:

env
Копировать код
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/delivery?schema=public"
JWT_SECRET="super_secret_key"

# опционально
PORT=4200
3) Миграции Prisma
bash
Копировать код
yarn migrate
# или
npm run migrate
4) Запуск
bash
Копировать код
yarn start:dev
# или
npm run start:dev
Сервер будет доступен по адресу:

http://localhost:4200/api

Скрипты
bash
Копировать код
yarn build        # nest build + tsc-alias
yarn start        # запуск
yarn start:dev    # dev (watch)
yarn start:prod   # запуск dist
yarn migrate      # prisma migrate dev
yarn studio       # prisma studio
yarn lint         # eslint --fix
yarn test         # jest
API
Базовый URL: http://localhost:4200/api

Base
GET / → Hello World!

Auth
POST /auth/register — регистрация
Body:

json
Копировать код
{ "email": "user@mail.com", "password": "password" }
Response:

json
Копировать код
{ "user": { "id": "...", "email": "..." }, "accessToken": "...", "refreshToken": "..." }
POST /auth/login — вход
Body:

json
Копировать код
{ "email": "user@mail.com", "password": "password" }
POST /auth/login/access-token — обновление токенов
Headers:

makefile
Копировать код
Authorization: Bearer <accessToken>
Body:

json
Копировать код
{ "refreshToken": "..." }
Users (JWT)
GET /users/profile — профиль текущего пользователя

PATCH /users/profile/favorites/:productId — добавить/убрать товар из избранного

Products
GET /products — список товаров
Query: searchTerm?=string

GET /products/by-slug/:slug — товар по slug

GET /products/by-category/:categorySlug — товары по slug категории

POST /products/create (JWT) — создать товар

PUT /products/update/:id (JWT) — обновить товар
Body (пример):

json
Копировать код
{ "name": "Pizza", "slug": "pizza", "description": "Tasty", "price": 499, "image": "/uploads/pizza.png" }
DELETE /products/delete/:id (JWT) — удалить товар

Categories
GET /categories — список категорий

GET /categories/by-slug/:slug — категория по slug

GET /categories/by-id/:id — категория по id

POST /categories/create (JWT) — создать категорию

PUT /categories/update/:id (JWT) — обновить категорию
Body (пример):

json
Копировать код
{ "name": "Pizza", "slug": "pizza", "image": "/uploads/pizza.png" }
DELETE /categories/delete/:id (JWT) — удалить категорию

Prisma модели (кратко)
User — email, password, name, avatarPath, phone, orders, favorites

Product — name, slug, description, price, image, category

Category — name, slug, image, products

Order — reference, user
