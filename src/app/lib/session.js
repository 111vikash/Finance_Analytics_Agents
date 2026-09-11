import { useAuthStore } from "@/store/auth-store";

export const getSessionId = () => {
  return useAuthStore.getState().sessionId;
};