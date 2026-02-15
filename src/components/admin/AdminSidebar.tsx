"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  MessageSquare,
  FolderOpen,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { signOut } from "@/lib/auth";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: MessageSquare,
  },
  {
    label: "Documents",
    href: "/admin/documents",
    icon: FolderOpen,
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] flex flex-col transform transition-transform duration-300 ease-in-out lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3" onClick={handleLinkClick}>
            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white font-bold">
              ASZ
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)]">
                {SITE_CONFIG.name}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">Admin Panel</p>
            </div>
          </Link>
          {/* Close button - mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "bg-[var(--color-accent)] text-white"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] space-y-1">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ChevronLeft className="h-5 w-5 flex-shrink-0" />
            Back to Website
          </Link>
          <button
            onClick={async () => {
              await signOut();
              router.replace("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// Mobile header component for admin
export function AdminMobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-4 py-3 flex items-center gap-3">
      <button
        onClick={onMenuClick}
        className="p-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold">
          ASZ
        </div>
        <span className="font-semibold text-[var(--color-text-primary)]">Admin</span>
      </div>
    </header>
  );
}
