# Search Suggestion Overlay Width Fix

This patch fixes a search UI issue found after the sort-dropdown patch.

## Problems

- Header search suggestions could visually expand the navbar/header area.
- Suggestion dropdown width covered both the input and the search button.
- The dropdown should be aligned to the search input only.

## Fix

- Search suggestions now render through a React portal to `document.body`.
- The dropdown is positioned with `position: fixed` using the input element's viewport rectangle.
- Dropdown width is now equal to the input width only.
- Scroll and resize events update the dropdown position.
- The search button remains outside the dropdown width calculation.

## Verification

- Header suggestions no longer expand the navbar.
- Homepage suggestions no longer expand the hero/search row.
- Dropdown starts under the input field.
- Dropdown width matches the input field only.
- Search button remains visually separate.
