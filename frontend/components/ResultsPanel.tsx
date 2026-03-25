import { cn } from "@/lib/utils";
import type { Mode } from "@/components/ModeToggle";

export type BatchResult = {
  text: string;
  predicted: string | null;
};

export type ResultsCopy = {
  title: string;
  modeLabels: {
    single: string;
    batch: string;
  };
  predictedIntent: string;
  inputLabel: string;
  awaitingTitle: string;
  awaitingBody: string;
  batchReadyTitle: string;
  batchReadyBody: string;
  unknown: string;
  classifying: string;
};

type ResultsPanelProps = {
  mode: Mode;
  singleResult: string | null;
  batchResults: BatchResult[];
  error: string | null;
  isLoading: boolean;
  copy: ResultsCopy;
};

export function ResultsPanel({
  mode,
  singleResult,
  batchResults,
  error,
  isLoading,
  copy
}: ResultsPanelProps) {
  const hasSingle = Boolean(singleResult);
  const hasBatch = batchResults.length > 0;

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-[var(--fg)]">
          {copy.title}
        </h2>
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {mode === "single" ? copy.modeLabels.single : copy.modeLabels.batch}
        </span>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-6 text-sm text-[var(--muted)]">
          {copy.classifying}
        </div>
      ) : mode === "single" ? (
        <div className="mt-6">
          {hasSingle ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/60 px-5 py-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {copy.predictedIntent}
              </p>
              <p className="mt-3 font-display text-2xl font-semibold text-[var(--fg)] md:text-3xl">
                {singleResult}
              </p>
            </div>
          ) : (
            <Placeholder
              title={copy.awaitingTitle}
              body={copy.awaitingBody}
            />
          )}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {hasBatch ? (
            batchResults.map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/60 p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {copy.inputLabel}
                </p>
                <p className="mt-2 text-sm text-[var(--fg)]">{item.text}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {copy.predictedIntent}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--fg)] shadow">
                    {item.predicted ?? copy.unknown}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <Placeholder
              title={copy.batchReadyTitle}
              body={copy.batchReadyBody}
            />
          )}
        </div>
      )}
    </section>
  );
}

type PlaceholderProps = {
  title: string;
  body: string;
};

function Placeholder({ title, body }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-[var(--border)]",
        "bg-transparent px-5 py-6"
      )}
    >
      <p className="font-display text-lg font-semibold text-[var(--fg)]">
        {title}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
    </div>
  );
}
