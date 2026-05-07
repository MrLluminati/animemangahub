# Frontend

This folder will contain the Next.js 14 application.

## Setup (Phase 1)

```bash
cd frontend
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

## Structure (once initialised)

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── anime/              # Anime pages
│   │   │   ├── page.tsx        # Anime listing
│   │   │   └── [id]/page.tsx   # Anime detail
│   │   ├── manga/              # Manga pages
│   │   │   ├── page.tsx        # Manga listing
│   │   │   └── [id]/page.tsx   # Manga detail
│   │   └── api/
│   │       └── auth/[...nextauth]/route.ts
│   ├── components/
│   │   ├── ui/                 # Button, Card, Badge, Input...
│   │   ├── anime/              # AnimeCard, AnimeGrid...
│   │   ├── manga/              # MangaCard, MangaGrid...
│   │   └── layout/             # Header, Footer, Nav
│   ├── lib/                    # Utilities, API client
│   └── types/                  # TypeScript interfaces
├── public/                     # Static assets
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```
