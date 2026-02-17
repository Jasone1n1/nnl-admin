// components/Share/badge.tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-semibold bg-pink-100 text-pink-800 rounded-full">
      {children}
    </span>
  );
}
