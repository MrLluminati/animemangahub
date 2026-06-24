from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from pathlib import Path

import cv2
import numpy as np


REPO_ROOT = Path(__file__).resolve().parents[2]
RAW_INBOX = Path(r"D:\movies\Anime")
OUTPUT_PATH = REPO_ROOT / "shorts" / "outputs" / "amw-sample-001.mp4"
WORK_PATH = REPO_ROOT / "shorts" / "work" / "amw-sample-001-silent.mp4"
STYLE_PATH = REPO_ROOT / "shorts" / "templates" / "shorts-style-template.json"
FULL_LOGO_PATH = REPO_ROOT / "Assets" / "02_Logos" / "03_Transparent_PNG" / "AniManga_Wire_Full_Logo_Transparent.png"
MARK_PATH = REPO_ROOT / "Assets" / "02_Logos" / "03_Transparent_PNG" / "AMW_Abbreviated_Profile_Transparent.png"


def find_ffmpeg() -> str | None:
    candidates = [
        shutil.which("ffmpeg"),
        str(REPO_ROOT / ".codex" / "video-tools" / "node_modules" / "ffmpeg-static" / "ffmpeg.exe"),
    ]

    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate

    return None


def first_video(raw_inbox: Path) -> Path:
    videos = sorted(raw_inbox.rglob("*.mp4"))
    if not videos:
        raise FileNotFoundError(f"No MP4 files found under {raw_inbox}")
    return videos[0]


def load_style() -> dict:
    with STYLE_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def read_logo(path: Path, max_width: int) -> np.ndarray | None:
    image = cv2.imread(str(path), cv2.IMREAD_UNCHANGED)
    if image is None:
        return None

    height, width = image.shape[:2]
    if width <= max_width:
        return image

    scale = max_width / width
    return cv2.resize(image, (max_width, int(height * scale)), interpolation=cv2.INTER_AREA)


def overlay_rgba(base: np.ndarray, overlay: np.ndarray, x: int, y: int) -> None:
    if overlay is None:
        return

    h, w = overlay.shape[:2]
    if x >= base.shape[1] or y >= base.shape[0]:
        return

    visible_w = min(w, base.shape[1] - x)
    visible_h = min(h, base.shape[0] - y)
    if visible_w <= 0 or visible_h <= 0:
        return

    crop = overlay[:visible_h, :visible_w]
    target = base[y : y + visible_h, x : x + visible_w]

    if crop.shape[2] == 4:
        alpha = crop[:, :, 3:4].astype(np.float32) / 255.0
        rgb = crop[:, :, :3].astype(np.float32)
        target[:] = (alpha * rgb + (1.0 - alpha) * target.astype(np.float32)).astype(np.uint8)
    else:
        target[:] = crop


def cover_resize(frame: np.ndarray, width: int, height: int) -> np.ndarray:
    src_h, src_w = frame.shape[:2]
    scale = max(width / src_w, height / src_h)
    resized = cv2.resize(frame, (int(src_w * scale), int(src_h * scale)), interpolation=cv2.INTER_LINEAR)
    y = max((resized.shape[0] - height) // 2, 0)
    x = max((resized.shape[1] - width) // 2, 0)
    return resized[y : y + height, x : x + width]


def fit_width(frame: np.ndarray, width: int) -> np.ndarray:
    src_h, src_w = frame.shape[:2]
    height = int(src_h * (width / src_w))
    return cv2.resize(frame, (width, height), interpolation=cv2.INTER_LINEAR)


def draw_text(
    frame: np.ndarray,
    text: str,
    x: int,
    y: int,
    scale: float,
    color: tuple[int, int, int],
    thickness: int = 2,
) -> int:
    shadow = (0, 0, 0)
    cv2.putText(frame, text, (x + 3, y + 3), cv2.FONT_HERSHEY_DUPLEX, scale, shadow, thickness + 2, cv2.LINE_AA)
    cv2.putText(frame, text, (x, y), cv2.FONT_HERSHEY_DUPLEX, scale, color, thickness, cv2.LINE_AA)
    text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_DUPLEX, scale, thickness)[0]
    return y + text_size[1] + 18


def draw_multiline(
    frame: np.ndarray,
    lines: list[str],
    x: int,
    y: int,
    scale: float,
    color: tuple[int, int, int],
    thickness: int = 2,
    gap: int = 12,
) -> int:
    for line in lines:
        y = draw_text(frame, line, x, y, scale, color, thickness) + gap
    return y


def draw_info_card(frame: np.ndarray, style: dict, full_logo: np.ndarray | None, mark: np.ndarray | None) -> None:
    width, height = 1080, 1920
    card_y = 900
    cv2.rectangle(frame, (0, card_y), (width, height), (5, 5, 6), -1)
    cv2.rectangle(frame, (0, card_y), (width, card_y + 10), (18, 28, 222), -1)

    data = style["defaultCopy"]
    y = card_y + 95
    y = draw_text(frame, data["eyebrow"], 70, y, 1.18, (255, 255, 255), 2)
    y = draw_text(frame, data["title"], 70, y + 8, 1.42, (40, 215, 255), 3)
    y = draw_text(frame, data["subtitle"], 70, y + 8, 0.66, (220, 220, 220), 1)

    logo_panel_x, logo_panel_y = 70, y + 30
    cv2.rectangle(frame, (logo_panel_x, logo_panel_y), (390, logo_panel_y + 250), (20, 20, 22), -1)
    cv2.rectangle(frame, (logo_panel_x, logo_panel_y), (390, logo_panel_y + 250), (18, 28, 222), 3)
    if mark is not None:
        overlay_rgba(frame, mark, logo_panel_x + 54, logo_panel_y + 24)
    if full_logo is not None:
        overlay_rgba(frame, full_logo, 438, logo_panel_y + 22)

    bullet_x = 438
    bullet_y = logo_panel_y + 130
    for bullet in data["bullets"]:
        cv2.circle(frame, (bullet_x + 10, bullet_y - 10), 6, (18, 28, 222), -1)
        draw_text(frame, bullet, bullet_x + 34, bullet_y, 0.66, (245, 245, 245), 1)
        bullet_y += 58

    strip_y = 1810
    cv2.rectangle(frame, (0, strip_y), (width, height), (18, 28, 222), -1)
    draw_text(frame, "FOLLOW @ANIMANGAWIRE FOR ANIME NEWS", 56, strip_y + 68, 0.86, (255, 255, 255), 2)


def render_silent(source: Path, output: Path, duration: int, fps: int, style: dict) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    cap = cv2.VideoCapture(str(source))
    if not cap.isOpened():
        raise RuntimeError(f"Could not open source video: {source}")

    source_fps = cap.get(cv2.CAP_PROP_FPS) or 24
    source_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    source_duration = source_frames / source_fps if source_fps else 0
    start_seconds = 90 if source_duration > 130 else max(source_duration * 0.2, 0)

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(str(output), fourcc, fps, (1080, 1920))
    if not writer.isOpened():
        raise RuntimeError(f"Could not open writer: {output}")

    full_logo = read_logo(FULL_LOGO_PATH, 520)
    mark = read_logo(MARK_PATH, 220)

    total_frames = duration * fps
    cut_seconds = [start_seconds, start_seconds + 18, start_seconds + 36, start_seconds + 54]

    for out_index in range(total_frames):
        t = out_index / fps
        cut = int(t // 4.5) % len(cut_seconds)
        source_time = cut_seconds[cut] + (t % 4.5)
        cap.set(cv2.CAP_PROP_POS_MSEC, source_time * 1000)
        ok, raw = cap.read()
        if not ok:
            cap.set(cv2.CAP_PROP_POS_MSEC, start_seconds * 1000)
            ok, raw = cap.read()
        if not ok:
            raw = np.zeros((1080, 1920, 3), dtype=np.uint8)

        frame = np.zeros((1920, 1080, 3), dtype=np.uint8)
        background = cover_resize(raw, 1080, 900)
        background = cv2.GaussianBlur(background, (45, 45), 0)
        frame[:900, :] = (background * 0.62).astype(np.uint8)

        main = fit_width(raw, 1080)
        y = 84
        main_h = min(main.shape[0], 700)
        frame[y : y + main_h, :] = main[:main_h, :]

        cv2.rectangle(frame, (0, 0), (1079, 899), (18, 28, 222), 6)
        cv2.putText(frame, "ANIMANGA WIRE | SAMPLE SHORT", (38, 52), cv2.FONT_HERSHEY_DUPLEX, 0.62, (255, 255, 255), 2, cv2.LINE_AA)
        cv2.rectangle(frame, (0, 810), (1080, 900), (0, 0, 0), -1)
        draw_text(frame, "ANIME NEWS. MANGA UPDATES. WIRED DAILY.", 54, 865, 0.7, (255, 255, 255), 2)

        draw_info_card(frame, style, full_logo, mark)
        writer.write(frame)

    cap.release()
    writer.release()


def mux_audio(ffmpeg: str, video: Path, source: Path, output: Path, duration: int) -> bool:
    command = [
        ffmpeg,
        "-y",
        "-i",
        str(video),
        "-ss",
        "90",
        "-t",
        str(duration),
        "-i",
        str(source),
        "-map",
        "0:v:0",
        "-map",
        "1:a:0?",
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-shortest",
        str(output),
    ]
    result = subprocess.run(command, capture_output=True, text=True)
    return result.returncode == 0 and output.exists()


def main() -> None:
    parser = argparse.ArgumentParser(description="Create an AniManga Wire sample Short.")
    parser.add_argument("--source", type=Path, default=None, help="Raw source MP4. Defaults to first MP4 in raw inbox.")
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH, help="Output MP4 path.")
    parser.add_argument("--duration", type=int, default=18, help="Duration in seconds.")
    parser.add_argument("--fps", type=int, default=24, help="Output frames per second.")
    args = parser.parse_args()

    source = args.source or first_video(RAW_INBOX)
    style = load_style()
    WORK_PATH.parent.mkdir(parents=True, exist_ok=True)

    print(f"Source: {source}")
    print(f"Silent render: {WORK_PATH}")
    render_silent(source, WORK_PATH, args.duration, args.fps, style)

    ffmpeg = find_ffmpeg()
    if ffmpeg and mux_audio(ffmpeg, WORK_PATH, source, args.output, args.duration):
        print(f"Rendered with audio: {args.output}")
    else:
        shutil.copyfile(WORK_PATH, args.output)
        print(f"Rendered silent preview: {args.output}")


if __name__ == "__main__":
    main()
