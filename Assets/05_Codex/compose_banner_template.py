from PIL import Image

# Simple Codex/PIL template starter for AniManga Wire assets.
# Keep the locked manga sketch style. Do not redesign unless explicitly asked.

CANVAS_SIZE = (2560, 1440)
SAFE_AREA = {
    "x": 507,
    "y": 508,
    "w": 1546,
    "h": 423,
}

banner = Image.open("../03_Modular_Assets/03_Codex_Ready/banner_base_2560x1440.png").convert("RGBA")
# The final banner already contains the locked layout. Use it as your base.
banner.save("codex_export_banner.png")
