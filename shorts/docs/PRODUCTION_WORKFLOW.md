# Shorts Production Workflow

## Status

Website development is on hold after the AniManga Wire asset integration checkpoint. New creative work should happen in this Shorts workspace unless it explicitly affects the website.

## Raw Input

- Raw inbox: `D:\movies\Anime`
- Sample style reference: `C:\Users\abhik\Downloads\WhatsApp Video 2026-06-23 at 7.59.14 PM.mp4`
- Brand source kit: `Assets/`
- App-facing brand assets: `frontend/public/assets/animanga-wire/`

## Output Policy

- Generated videos go to `shorts/outputs/`.
- Final upload-ready renders can be copied to `shorts/exports/`.
- Intermediate files go to `shorts/work/`.
- Output videos and work files are ignored by Git.

## First Template

The initial template mirrors the supplied reference:

- 9:16 vertical output.
- Upper clip montage from the raw inbox.
- Lower black information card.
- AniManga Wire logo/watermark.
- Red, white, and limited yellow text accents.
- CTA strip: `FOLLOW @ANIMANGAWIRE FOR ANIME NEWS`

## Render Command

From the repo root:

```powershell
python shorts/scripts/create_sample_short.py
```

The script defaults to the first MP4 it finds under `D:\movies\Anime` and writes:

```text
shorts/outputs/amw-sample-001.mp4
```

If `ffmpeg` is available, the script can mux source audio into the final MP4. Without `ffmpeg`, it still creates a silent MP4 preview through OpenCV.
