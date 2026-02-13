import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-[var(--color-accent)]",
}: StatsCardProps) {
  return (
    <div className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--color-text-muted)] mb-1">{title}</p>
          <p className="text-3xl font-bold text-[var(--color-text-primary)]">
            {value}
          </p>
          {change && (
            <p
              className={cn(
                "text-sm mt-1",
                changeType === "increase" && "text-green-500",
                changeType === "decrease" && "text-red-500",
                changeType === "neutral" && "text-[var(--color-text-muted)]"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center",
            iconColor
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
