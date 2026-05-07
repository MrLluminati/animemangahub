# Database Migrations

SQL migration files go here. Managed by Prisma.

Prisma generates migration files automatically when you run:

```bash
cd backend
npx prisma migrate dev --name describe_what_changed
```

## Migration naming convention

- `001_initial_schema` — first migration, creates all core tables
- `002_add_user_lists` — adds watchlist and reading list tables
- `003_add_reviews` — adds reviews and ratings
- `004_add_subscriptions` — adds Stripe subscription fields

## Manual seeds (not Prisma migrations)

Sample data scripts live in `/database/seeds/`. Run with:

```bash
cd backend && npm run seed
```
