import { Link, Outlet } from "react-router-dom";
import { Shield } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <header className="relative z-10 flex items-center gap-2 px-6 py-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
          <Shield className="size-5 text-primary" />
        </div>
        <div className="text-left">
          <Link to="/" className="font-heading text-lg font-semibold text-foreground">
            API Guardian
          </Link>
          <p className="text-xs text-muted-foreground">
            API monitoring & security
          </p>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-12">
        <Outlet />
      </main>
    </div>
  );
}
