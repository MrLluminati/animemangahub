# Search Suggestion Portal Visibility Fix

This patch follows the search suggestion overlay width fix.

## Problem

Backend suggestions were confirmed to work, but the frontend overlay did not reliably appear during live testing.

## Fix

- Suggestion overlay now uses a maximum z-index to avoid being hidden behind sticky headers or page surfaces.
- Overlay uses explicit theme surface/background classes instead of depending on inherited surface styles.
- Overlay positioning is recalculated from the input rectangle and clamped to the viewport.
- Pointer-down handling now treats the portal overlay as an inside click target.
- Focusing an input with at least two characters reopens the overlay and refreshes its position.

## Verification

- Backend endpoint `/api/search/suggestions?q=One` returns results.
- Header search suggestions visibly appear under the input.
- Homepage search suggestions visibly appear under the input.
- Dropdown width equals the input width only.
- Navbar/header height does not expand.
- Clicking a suggestion opens its detail page.
