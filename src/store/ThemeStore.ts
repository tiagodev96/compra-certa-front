import { create } from "zustand";

type Theme = {
  isDark: boolean;
  toggle: () => void;
};

export const useThemeStore = create<Theme>((set) => ({
  isDark:
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark",
  toggle: () =>
    set((state) => {
      const newIsDark = !state.isDark;
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      if (newIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { isDark: newIsDark };
    }),
}));
