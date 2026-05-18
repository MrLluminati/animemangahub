# Search Suggestions Close on Scroll

This patch follows the search suggestion portal visibility fix.

## Problem

Live testing showed that when suggestions were open and the page was scrolled, the portal dropdown stayed fixed above the navbar/header area.

## Fix

- The search suggestions overlay now closes on page scroll.
- Scrolls inside the suggestion overlay are ignored so the dropdown remains usable if it becomes scrollable.
- Overlay positioning is still updated on resize.
- The portal remains width-matched to the active input field.

## Verification

- Open suggestions in the header search.
- Scroll the page.
- Suggestions should close immediately.
- Header/navbar should remain visually clean.
- Re-focus the search input to show suggestions again.
