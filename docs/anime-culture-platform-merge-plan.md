# Anime Culture Platform Merge Plan

## Decision

AniManga Hub will remain the single platform.

A separate Anime Culture Platform will not be created. The anime culture publication, legal discovery guides, mature-theme media-literacy commentary, censorship analysis, fandom safety content, and future safe creator directory will be merged into AniManga Hub.

## Unified Positioning

AniManga Hub is a non-explicit anime and manga culture, legal discovery, catalog, review, and fandom platform.

## Existing AniManga Hub Features to Preserve

Preserve:

- Next.js 14 App Router frontend.
- Express + TypeScript backend.
- Prisma.
- SQLite local development database.
- Jikan-powered anime/manga catalog.
- Anime listing page.
- Manga listing page.
- Anime detail page.
- Manga detail page.
- Combined search.
- Clickable catalog cards.
- Local SQLite cache.
- Cache observability endpoints.
- Development-only frontend cache debug panel.
- PowerShell workflow automation.
- Existing rollback-safe beta tag `v0.1.0-beta.9`.

Do not rebuild the project from scratch.

## New Modules to Add Later

### Editorial/content module

- Articles.
- Reviews.
- Guides.
- Culture pieces.
- News.
- Censorship analysis.
- Media-literacy commentary.
- Author profiles.
- Editorial workflow.

### Legal watch/read directory

- Legal platform pages.
- Title-platform links.
- Region availability.
- Affiliate disclosures.
- Link review logs.
- User reports for broken/unsafe links.

### Safety and moderation module

- Content ratings.
- Content warnings.
- Reports.
- Moderation queue.
- Admin actions.
- Prohibited terms.
- Audit logs.
- Appeals.

### Safe marketplace/creator directory

- Creator listings.
- Vendor categories.
- Verification status.
- Listing reports.
- Strict non-explicit marketplace policy.

## Database Extensions

Future planned models:

- `Article`
- `ArticleCategory`
- `ArticleTag`
- `ArticleTagJoin`
- `AuthorProfile`
- `EditorialReviewStatus`
- `ContentRating`
- `ContentWarning`
- `ContentReport`
- `ModerationAction`
- `ProhibitedTerm`
- `AuditLog`
- `LegalPlatform`
- `PlatformAvailability`
- `TitlePlatformLink`
- `LinkReviewLog`
- `CreatorListing`
- `MarketplaceCategory`
- `MarketplaceListingReport`
- `MarketplaceVerificationStatus`

Do not implement these models in the strategy-merge documentation patch.

## UI Navigation Direction

Future navigation should evolve toward:

- Home
- Anime
- Manga
- Reviews
- Guides
- Culture
- News
- Marketplace Directory
- About
- Editorial Policy
- Content Safety Policy

Do not create a hentai section, NSFW section, adult video section, porn category, unofficial streaming section, or piracy mirror section.

## Roadmap Changes

The merged roadmap adds content/culture, compliance/moderation, legal watch/read directory, and safe marketplace directory tracks.

The roadmap should remove or de-prioritize outdated Funimation references because Funimation streaming shut down and consolidated into Crunchyroll.

## Compliance Gates Before Launch

Before public launch, complete or review:

- Content safety policy.
- Editorial policy.
- Moderation policy.
- Legal watch/read link policy.
- Terms of service.
- Privacy policy.
- Affiliate disclosure policy.
- DMCA/copyright/takedown process.
- User reporting process.
- Admin moderation workflow.
- Indian cyber-law review.

## Implementation Order

1. Merge strategy and policy documentation.
2. Harden workflow cleanup/tagging.
3. Add content safety and editorial database planning.
4. Add filters to catalog.
5. Add legal watch/read links.
6. Add editorial content model.
7. Add admin/editorial review workflow.
8. Add moderation/reporting foundations.
9. Add user reviews and comments only after moderation exists.
10. Add safe marketplace/directory only after verification and reporting tools exist.

