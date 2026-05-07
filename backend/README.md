# Backend

This folder will contain the Express + TypeScript API server.

## Setup (Phase 1)

```bash
cd backend
npm init -y
npm install express cors helmet dotenv @prisma/client
npm install -D typescript @types/express @types/node @types/cors nodemon ts-node prisma
npx tsc --init
npx prisma init
```

## Structure (once initialised)

```
backend/
├── src/
│   ├── index.ts                # Express app entry point
│   ├── routes/
│   │   ├── anime.ts            # /api/anime routes
│   │   ├── manga.ts            # /api/manga routes
│   │   ├── search.ts           # /api/search routes
│   │   └── users.ts            # /api/users routes (Phase 2)
│   ├── controllers/
│   │   ├── animeController.ts
│   │   ├── mangaController.ts
│   │   └── searchController.ts
│   ├── services/
│   │   ├── animeService.ts     # Business logic
│   │   ├── mangaService.ts
│   │   └── jikanService.ts     # Jikan API client
│   ├── middleware/
│   │   ├── auth.ts             # JWT validation
│   │   ├── rateLimit.ts        # API rate limiting
│   │   └── validate.ts         # Request validation
│   └── lib/
│       ├── jikan.ts            # Jikan API wrapper
│       ├── anilist.ts          # AniList GraphQL client
│       └── prisma.ts           # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Auto-generated migrations
├── package.json
├── tsconfig.json
└── .env                        # Copied from ../.env.example
```

## Running

```bash
npm run dev       # Development with hot reload (nodemon)
npm run build     # Compile TypeScript to /dist
npm start         # Run compiled app (production)
npm run migrate   # Run pending database migrations
npm run seed      # Seed database with sample data
npm run generate  # Regenerate Prisma client after schema changes
```
