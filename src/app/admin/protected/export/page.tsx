'use client';

import { useState } from 'react';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui-kit/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-kit/card';
import { Input } from '@/components/ui-kit/input';

async function getApplications() {
  const res = await fetch('/api/applications');
  return res.json();
}

export default function ExportPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const result = await getApplications();
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  const handleExportAll = async () => {
    setLoading(true);
    try {
      const result = await getApplications();
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type: 'csv' | 'json') => {
    if (data.length === 0) return;
    if (type === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      saveAs(blob, 'export.json');
    } else {
      const headers = Object.keys(data[0]);
      const rows = data.map((row) => headers.map((key) => JSON.stringify(row[key] ?? '')).join(','));
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      saveAs(blob, 'export.csv');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Export
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fetch and export applications as CSV or JSON
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fetch data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Start date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="End date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button onClick={handleFetch} isLoading={loading} className="w-full sm:w-auto">
              Fetch data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={handleExportAll} isLoading={loading} variant="secondary" className="w-full sm:w-auto">
              Load all applications
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-slate-600">
              <span className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-600" aria-hidden />
              Loading…
            </div>
          ) : data.length === 0 ? (
            <p className="text-slate-500">No data loaded. Fetch or load all applications first.</p>
          ) : (
            <pre className="max-h-[300px] overflow-auto rounded-lg bg-slate-50 p-4 text-xs text-slate-800">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => handleExport('csv')} disabled={data.length === 0}>
          Export as CSV
        </Button>
        <Button onClick={() => handleExport('json')} variant="secondary" disabled={data.length === 0}>
          Export as JSON
        </Button>
      </div>
    </div>
  );
}
