"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/Button";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ModeToggle, type Mode } from "@/components/ModeToggle";
import { ResultsPanel, type BatchResult } from "@/components/ResultsPanel";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { cn } from "@/lib/utils";

const defaultApiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function Home() {
  const params = useParams<{ locale?: string }>();
  const localeValue = params?.locale ?? defaultLocale;
  const activeLocale: Locale = isLocale(localeValue)
    ? localeValue
    : defaultLocale;
  const t = getTranslations(activeLocale);
  const isRtl = activeLocale === "ar";

  const [mode, setMode] = useState<Mode>("single");
  const [singleText, setSingleText] = useState("");
  const [batchText, setBatchText] = useState("");
  const [singleResult, setSingleResult] = useState<string | null>(null);
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiInput, setApiInput] = useState(defaultApiUrl);
  const [apiUrl, setApiUrl] = useState(defaultApiUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [apiTest, setApiTest] = useState<{
    status: "idle" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const isBusy = isLoading || isTesting;

  const textAreaRows = mode === "single" ? 6 : 8;

  useEffect(() => {
    setError(null);
    setSingleResult(null);
    setBatchResults([]);
  }, [mode]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.lang = activeLocale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [activeLocale, isRtl]);

  const handleLoadExample = () => {
    setError(null);
    setSingleResult(null);
    setBatchResults([]);
    if (mode === "single") {
      setSingleText(t.examples.single);
    } else {
      setBatchText(t.examples.batch);
    }
  };

  const handleClear = () => {
    setSingleText("");
    setBatchText("");
    setSingleResult(null);
    setBatchResults([]);
    setError(null);
  };

  const handleUseApi = () => {
    const trimmed = apiInput.trim();
    if (!trimmed) {
      setError(t.errors.apiEmpty);
      return;
    }
    setApiUrl(trimmed);
    setApiTest({ status: "idle" });
    setError(null);
  };

  const handleResetApi = () => {
    setApiInput(defaultApiUrl);
    setApiUrl(defaultApiUrl);
    setApiTest({ status: "idle" });
    setError(null);
  };

  const handleTestApi = async () => {
    const target = apiInput.trim();
    if (!target) {
      setApiTest({ status: "error", message: t.errors.apiEmpty });
      return;
    }
    setIsTesting(true);
    setApiTest({ status: "idle" });
    setError(null);

    try {
      const baseUrl = target.replace(/\/$/, "");
      const response = await fetch(`${baseUrl}/api/health`, {
        method: "GET"
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.error || t.errors.healthFailed(response.status)
        );
      }

      setApiTest({
        status: "success",
        message: data?.status
          ? t.errors.connectedWithStatus(data.status)
          : t.errors.connected
      });
    } catch (err) {
      setApiTest({
        status: "error",
        message:
          err instanceof Error ? err.message : t.errors.unreachable
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setError(null);
    setSingleResult(null);
    setBatchResults([]);

    try {
      const baseUrl = apiUrl.trim().replace(/\/$/, "");
      if (!baseUrl) {
        throw new Error(t.errors.apiNotSet);
      }

      if (mode === "single") {
        const text = singleText.trim();
        if (!text) {
          throw new Error(t.errors.queryEmpty);
        }

        const response = await fetch(`${baseUrl}/api/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.error || t.errors.predictionFailed);
        }

        setSingleResult(data?.predicted_intent ?? t.results.unknown);
      } else {
        const texts = batchText
          .split(/\n+/)
          .map((entry) => entry.trim())
          .filter(Boolean);

        if (!texts.length) {
          throw new Error(t.errors.batchEmpty);
        }

        const response = await fetch(`${baseUrl}/api/predict-batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texts })
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.error || t.errors.batchFailed);
        }

        const predicted: string[] = Array.isArray(data?.predicted_intents)
          ? data.predicted_intents
          : [];

        setBatchResults(
          texts.map((text, index) => ({
            text,
            predicted: predicted[index] ?? t.results.unknown
          }))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.general);
    } finally {
      setIsLoading(false);
    }
  };

  const apiStatusTone = useMemo(() => {
    if (apiTest.status === "success") {
      return "text-[var(--success)]";
    }
    if (apiTest.status === "error") {
      return "text-[var(--error)]";
    }
    return "text-[var(--muted)]";
  }, [apiTest.status]);

  return (
    <main
      className={cn("relative isolate overflow-hidden", isRtl && "text-right")}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.32),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-[-60px] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(238,200,154,0.5),transparent_70%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:px-10">
        <header className="max-w-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.3em] text-[var(--muted)] shadow-sm">
              {t.badge}
            </div>
            <LocaleSwitcher currentLocale={activeLocale} label={t.locale.label} />
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold text-[var(--fg)] md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)]">{t.subtitle}</p>
        </header>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[var(--fg)]">
                  {t.inputSettingsTitle}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {t.inputSettingsSubtitle}
                </p>
              </div>
              <ModeToggle
                value={mode}
                onChange={setMode}
                disabled={isBusy}
                labels={t.modes}
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="query-input"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
              >
                {mode === "single" ? t.queryLabelSingle : t.queryLabelBatch}
              </label>
              <textarea
                id="query-input"
                rows={textAreaRows}
                value={mode === "single" ? singleText : batchText}
                onChange={(event) =>
                  mode === "single"
                    ? setSingleText(event.target.value)
                    : setBatchText(event.target.value)
                }
                placeholder={
                  mode === "single"
                    ? t.queryPlaceholderSingle
                    : t.queryPlaceholderBatch
                }
                className={cn(
                  "mt-3 w-full rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-3 text-sm text-[var(--fg)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                  "transition shadow-sm"
                )}
                disabled={isBusy}
                dir="auto"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  onClick={handlePredict}
                  disabled={isBusy}
                >
                  {isLoading ? t.buttons.predicting : t.buttons.predict}
                </Button>
                <Button variant="secondary" onClick={handleClear} disabled={isBusy}>
                  {t.buttons.clear}
                </Button>
                <Button variant="ghost" onClick={handleLoadExample} disabled={isBusy}>
                  {t.buttons.loadExample}
                </Button>
              </div>
            </div>

            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <div>
                <p className="text-sm font-semibold text-[var(--fg)]">
                  {t.api.title}
                </p>
                <p className="text-xs text-[var(--muted)]">{t.api.subtitle}</p>
              </div>

              <label
                htmlFor="api-url"
                className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
              >
                {t.api.label}
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  id="api-url"
                  value={apiInput}
                  onChange={(event) => setApiInput(event.target.value)}
                  placeholder="http://localhost:5000"
                  className={cn(
                    "w-full flex-1 rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-sm text-[var(--fg)]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                    "transition shadow-sm"
                  )}
                  disabled={isBusy}
                  dir="ltr"
                />
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={handleUseApi} disabled={isBusy}>
                    {t.api.use}
                  </Button>
                  <Button variant="ghost" onClick={handleTestApi} disabled={isBusy}>
                    {isTesting ? t.api.testing : t.api.test}
                  </Button>
                  <Button variant="ghost" onClick={handleResetApi} disabled={isBusy}>
                    {t.api.reset}
                  </Button>
                </div>
              </div>

              {apiTest.status !== "idle" ? (
                <p className={cn("mt-3 text-xs", apiStatusTone)} role="status">
                  {apiTest.message}
                </p>
              ) : null}

              <p className="mt-3 text-xs text-[var(--muted)]">
                {t.api.current}:{" "}
                <span className="font-mono text-[var(--fg)]">{apiUrl}</span>
              </p>
            </div>
          </div>

          <ResultsPanel
            mode={mode}
            singleResult={singleResult}
            batchResults={batchResults}
            error={error}
            isLoading={isLoading}
            copy={{
              title: t.results.title,
              modeLabels: t.modes,
              predictedIntent: t.results.predictedIntent,
              inputLabel: t.results.inputLabel,
              awaitingTitle: t.results.awaitingTitle,
              awaitingBody: t.results.awaitingBody,
              batchReadyTitle: t.results.batchReadyTitle,
              batchReadyBody: t.results.batchReadyBody,
              unknown: t.results.unknown,
              classifying: t.results.classifying
            }}
          />
        </section>
      </div>
    </main>
  );
}
