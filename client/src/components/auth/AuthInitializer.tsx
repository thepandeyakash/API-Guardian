import { useEffect } from "react";
import { Loader2 } from "lucide-react";

import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";

type AuthInitializerProps = {
  children: React.ReactNode;
};

export function AuthInitializer({ children }: AuthInitializerProps) {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const { data, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  if (token && isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return children;
}
