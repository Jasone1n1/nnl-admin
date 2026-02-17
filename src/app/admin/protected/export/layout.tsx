import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Export',
  description: 'Export applications as CSV or JSON.',
};

export default function ExportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
