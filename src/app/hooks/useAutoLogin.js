"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { loginUser } from "@/app/lib/auth";

export function useAutoLogin() {
  const sessionId = useAuthStore((state) => state.sessionId);
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    const run = async () => {
      if (sessionId) return;

      try {
        const email = process.env.NEXT_PUBLIC_DEFAULT_EMAIL;
        const role = process.env.NEXT_PUBLIC_DEFAULT_ROLE || "AP Analyst";

        if (!email) {
          console.error("Missing NEXT_PUBLIC_DEFAULT_EMAIL");
          return;
        }

        const res = await loginUser(email, role);

        setSession({
          sessionId: res.session_id,
          user: res.user,
          role: res.role,
        });
      } catch (err) {
        console.error("Auto login failed:", err);
      }
    };

    run();
  }, [sessionId, setSession]);
}