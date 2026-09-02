// src/store/auth-store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      sessionId: null,
      user: null,
      role: null,
      setSession: (payload) =>
        set({
          sessionId: payload.sessionId,
          user: payload.user,
          role: payload.role,
        }),
      logout: () => set({ sessionId: null, user: null, role: null }),
    }),
    {
      name: "auth-store",
    }
  )
);