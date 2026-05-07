# Versioning and Rollback Workflow

AniManga Hub uses beta release tags to preserve safe rollback points after stable milestones.

This project is developed in small, reviewable phases. Each working milestone should be merged through a pull request, verified by GitHub Actions, and then optionally tagged as a beta release.

---

## Current Release Tags

| Tag | Meaning |
|---|---|
| `v0.1.0-beta.1` | Phase 1A working skeleton: Next.js frontend, Express backend, Jikan API wrapper, Prisma schema, and initial catalog UI |

---

## Version Format

Use semantic beta versioning:

```text
vMAJOR.MINOR.PATCH-beta.NUMBER