export function ThemeBootScript() {
  const script = `
(function () {
  try {
    var storageKey = "anipulse-theme-mode";
    var savedMode = window.localStorage.getItem(storageKey);
    var preferredMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    var mode = savedMode === "dark" || savedMode === "light" ? savedMode : preferredMode;
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
