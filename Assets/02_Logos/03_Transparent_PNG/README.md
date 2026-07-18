# Approved transparent logos

The production-approved transparent sources are validated raster masters. A genuine editable vector or layered source is not currently available and remains future branding debt.

## Canonical masters

- Profile: `1254 x 1254`, with light-, dark-, and brand-red-surface variants.
- Full logo: `1916 x 821`, with light-, dark-, and brand-red-surface variants.
- `2048 x 878` is not a canonical transparent-logo size.

Light-surface assets use the black/red composition. Dark-surface assets use the white/red composition. Red-surface assets use the white composition. Generic legacy transparent filenames are byte-identical aliases of the corresponding light-surface masters.

## Production rules

- Preserve RGBA, 8-bit colour, dimensions, canvas, and geometry.
- Keep RGB at `0,0,0` wherever alpha is zero.
- Do not independently re-export, recolour, crop, pad, sharpen, or filter aliases.
- Composite QA must cover white, `#070707`, `#DE1C22`, `#808080`, and checkerboard backgrounds.
- Select the variant for the actual surface; expected contrast loss on a non-target surface is not a reason to alter the approved art.

## Profile derivative chain

Derivatives use Pillow LANCZOS and preserve RGBA:

`1254 -> 1080 -> 800 -> 512 -> 500 watermark master`

The `300` and `150` watermark files are each generated directly from the `500` watermark master. Never generate `150` from `300`.
