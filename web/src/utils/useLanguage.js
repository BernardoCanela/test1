"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLanguage = create(
  persist(
    (set) => ({
      language: "pt",
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "mindframe-language",
    },
  ),
);
