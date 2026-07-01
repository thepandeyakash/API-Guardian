import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="text-left">
          <h1 className="font-heading text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back{user ? `, ${user.name}` : ""}.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut />
          Sign out
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground">
          Dashboard content will be built in the next phase.
        </p>
      </main>
    </div>
  );
}
