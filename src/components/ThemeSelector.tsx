import React from "react";
import { Sparkles, Sun, Moon } from "lucide-react";
import { ThemeMode } from "../types";

interface ThemeSelectorProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div id="theme-selector" className="flex bg-slate-100 dark:bg-slate-900 lilac:bg-[#F3F0F7] p-1 rounded-full border border-slate-200 dark:border-slate-800 lilac:border-[#E9E1F0] transition-all duration-300">
      <button
        id="theme-lilac-btn"
        onClick={() => onThemeChange("lilac")}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
          currentTheme === "lilac"
            ? "bg-white text-[#5B21B6] shadow-sm scale-105"
            : "text-[#807090] hover:text-[#5B21B6] hover:bg-white/40"
        }`}
        title="Lilac Mode - Made with Love 💜"
      >
        <Sparkles className="w-3 h-3 fill-current animate-pulse text-[#C084FC]" />
        <span>Lilac</span>
      </button>

      <button
        id="theme-light-btn"
        onClick={() => onThemeChange("light")}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
          currentTheme === "light"
            ? "bg-white text-[#5B21B6] shadow-sm scale-105"
            : "text-[#807090] hover:text-[#5B21B6] hover:bg-white/40"
        }`}
        title="Light Mode"
      >
        <Sun className="w-3 h-3" />
        <span>Light</span>
      </button>

      <button
        id="theme-dark-btn"
        onClick={() => onThemeChange("dark")}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
          currentTheme === "dark"
            ? "bg-slate-800 text-white shadow-sm scale-105"
            : "text-[#807090] dark:text-slate-400 hover:text-[#5B21B6] dark:hover:text-white hover:bg-slate-800/40"
        }`}
        title="Dark Mode"
      >
        <Moon className="w-3 h-3" />
        <span>Dark</span>
      </button>
    </div>
  );
}
