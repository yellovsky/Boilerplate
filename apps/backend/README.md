# NestJS API

The backend is built with **NestJS**. The structure loosely follows **Domain-Driven Design (DDD)**.

## Prisma

Install Prisma CLI (for schema and migrations):

```sh
yarn add -D prisma
```

For working with the database, use:

```sh
# init
npx prisma init

# generate types
npx prisma generate

# migrate
npx prisma migrate dev
```
