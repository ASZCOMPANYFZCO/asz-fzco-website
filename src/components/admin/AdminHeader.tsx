"use client";

import { Bell, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/layout";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[var(--color-text-muted)]">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors">
          <Bell className="h-5 w-5 text-[var(--color-text-secondary)]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-[var(--color-border)]">
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-medium text-sm">
            A
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
