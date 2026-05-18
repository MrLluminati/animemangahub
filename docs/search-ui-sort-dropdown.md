# Search UI and Sort Dropdown Fix

This patch follows the ranked search suggestions implementation.

## Problems found in live testing

- The search form visually collapsed when suggestions were open.
- The search suggestion dropdown could open automatically on the search page from the default query value.
- The search sort controls were shown as multiple separate buttons instead of a compact selector.

## Fixes

- SearchBox now uses a stable wrapper with the input/button row inside a nested form.
- Suggestions are absolutely positioned relative to the wrapper, not inside the active form row.
- Suggestions only open while the field is focused.
- SearchBox resets suggestion state when `defaultValue` changes.
- Accessibility warnings are avoided without misleading ARIA roles.
- Search sort modes are now shown through a dropdown component.

## Manual verification

- Search input and button remain horizontal and readable when suggestions are open.
- Suggestions do not open automatically on the search results page unless the input is focused.
- Sorting is available from a dropdown.
- Dark and light modes remain readable.
