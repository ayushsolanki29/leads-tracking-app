# backend

> Scaffolded with [create-xpress-backend](https://github.com/ayushsolanki29/create-xpress-backend) · TypeScript

## Stack

- **Runtime** — Node.js ≥ 18
- **Language** — TypeScript 5 (strict mode)
- **Framework** — Express 4
- **ORM** — Prisma 7 + PostgreSQL (driver adapter)
- **Validation** — Joi
- **Auth** — JWT (jsonwebtoken + bcryptjs)

## Features

- ⚡ Express 4 with security middleware (Helmet, CORS)
- 🗄️  Prisma 7 ORM with PostgreSQL (driver adapter)
- ✅ Joi request validation
- 🌱 Database seeding script
- 🔐 JWT authentication (register / login)
- 🔄 Graceful shutdown
- 🏥 Health check endpoint
- 🔷 Full TypeScript support with strict mode

## Quick Start

```bash
npm install

# configure DATABASE_URL in .env, then:
npm run db:push
npm run db:seed    # optional
npm run dev
```

Server starts on **http://localhost:5050**

## Build

```bash
npm run build   # compiles TypeScript → dist/
npm start       # runs compiled output
```

## Scripts

| Command               | Description                          |
|-----------------------|--------------------------------------|
| `npm run dev`         | Start dev server with auto-reload    |
| `npm run build`      | Compile TypeScript to `dist/`       |
| `npm start`          | Run compiled production build        |
| `npm run db:push`     | Push Prisma schema to the database   |
| `npm run db:generate` | Regenerate Prisma Client             |
| `npm run db:dev`      | Push schema + generate in one step   |
| `npm run db:seed`     | Seed initial data                    |
| `npm run db:studio`   | Open Prisma Studio                   |
| `npm run db:reset`    | Force-reset the database schema      |

## API Reference

### Demo

| Method   | Path              | Description     |
|----------|-------------------|-----------------|
| `POST`   | `/api/demo`      | Create a record |
| `GET`    | `/api/demo`      | Get all records |
| `GET`    | `/api/demo/:id`  | Get by ID       |
| `PUT`    | `/api/demo/:id`  | Update          |
| `DELETE` | `/api/demo/:id`  | Delete          |


### Auth

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Login |

### Health

| Method | Path      | Description         |
|--------|-----------|---------------------|
| `GET`  | `/health` | Server health check |

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── types/
│   │   └── express.d.ts       ← req.user type augmentation
│   ├── database/
│   │   ├── prisma.ts
│   │   └── seed.ts
│   ├── middleware/
│   │   ├── validate.ts
│   │   └── auth.ts
│   └── modules/
│       ├── index.ts
│       ├── demo/
│       └── auth/
├── tsconfig.json
├── .env
├── .env.example
└── package.json
```

## Environment Variables

| Variable         | Description                    | Default  |
|------------------|--------------------------------|----------|
| `PORT`           | Server port                    | `5050` |
| `DATABASE_URL`   | PostgreSQL connection string   | —        |
| `JWT_SECRET`     | Secret key for JWT signing     | —        |
| `JWT_EXPIRES_IN` | Token expiry duration          | `7d`   |
| `CLIENT_URL`     | Allowed CORS origin            | `*`    |

## License

MIT
