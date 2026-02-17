'use client';

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-slate-50"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        className="size-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"
        aria-hidden
      />
      <p className="text-sm font-medium text-slate-600">Loading…</p>
    </div>
  );
}
