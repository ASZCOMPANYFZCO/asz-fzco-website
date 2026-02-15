"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AdminSidebar, AdminMobileHeader } from "@/components/admin";
import { getUser, onAuthStateChange } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    if (!isSupabaseConfigured()) {
      setAuthenticated(true);
      setChecking(false);
      return;
    }

    getUser().then((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        router.replace("/admin/login");
      }
      setChecking(false);
    });

    const { data } = onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setAuthenticated(false);
        router.replace("/admin/login");
      } else if (event === "SIGNED_IN") {
        setAuthenticated(true);
      }
    });

    return () => {
      data?.subscription?.unsubscribe();
    };
  }, [isLoginPage, router]);

  // Login page renders without admin shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading or redirecting
  if (checking || !authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-primary)]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminMobileHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
