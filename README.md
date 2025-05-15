# Remix + NestJS Boilerplate

This is a Remix + NestJS boilerplate project because I don't want to configure it once again

## Using this bolerplate

Run the following command:

```sh
yarn

# run docker
docker-compose up

# run api
cd ./apps/backend
yarn dev

# run client
cd ./apps/frontend
yarn dev
```

## Create database

```sh
docker exec -it boilerplate-postgres-1 psql -U postgres
CREATE DATABASE bolierplate
```

where:

- `-U postgres` is user (password&) from [docker-compose.yml].services.postgres
- `bolierplate` database name for apps/backend/.env