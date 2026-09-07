"use client";

import { useEffect, useState } from "react";
import { loginUser } from "@/app/lib/auth";
import { useAuthStore } from "@/store/auth-store";

export function useAutoLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        if (useAuthStore.getState().sessionId) {
          return;
        }

        const email = process.env.NEXT_PUBLIC_DEFAULT_EMAIL;
        const role = process.env.NEXT_PUBLIC_DEFAULT_ROLE || "AP Analyst";

        if (!email) {
          throw new Error("NEXT_PUBLIC_DEFAULT_EMAIL is not configured");
        }

        const data = await loginUser(email, role);
        setSession(data);
      } catch (err) {
        console.error("Auto login failed:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [setSession]);

  return { loading, error };
}