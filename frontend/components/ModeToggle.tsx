import { cn } from "@/lib/utils";

export type Mode = "single" | "batch";

type ModeToggleProps = {
  value: Mode;
  onChange: (mode: Mode) => void;
  disabled?: boolean;
  labels: {
    single: string;
    batch: string;
  };
};

export function ModeToggle({
  value,
  onChange,
  disabled,
  labels
}: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-[var(--border)] bg-white/70 p-1">
      {(["single", "batch"] as const).map((mode) => {
        const isActive = value === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            disabled={disabled}
            aria-pressed={isActive}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition",
              isActive
                ? "bg-[var(--accent)] text-white shadow"
                : "text-[var(--muted)] hover:text-[var(--fg)]",
              disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {mode === "single" ? labels.single : labels.batch}
          </button>
        );
      })}
    </div>
  );
}
