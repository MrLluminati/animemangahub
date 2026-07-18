# Approved watermark derivatives

These transparent light-surface watermark files descend from the approved `1254 x 1254` abbreviated/profile raster master.

Generation chain:

`1254 -> 1080 -> 800 -> 512 -> 500`

Both final derivatives start from the `500 x 500` watermark master:

- `500 -> 300`
- `500 -> 150`

Do not generate `150` from `300`. Downsampling uses Pillow LANCZOS. Files remain 8-bit RGBA, preserve geometry, and normalize every alpha-zero pixel to RGB `0,0,0`.

The generic watermark names are production derivatives, not editable sources. Do not independently re-export aliases. Composite QA must cover white, `#070707`, `#DE1C22`, `#808080`, and checkerboard backgrounds. These light-surface derivatives intentionally have limited contrast on dark and brand-red surfaces.

A genuine editable vector or layered source is not currently available. The validated transparent raster master is the approved canonical source type; the missing editable source remains future branding debt. `2048 x 878` is not canonical for the full transparent logo.
