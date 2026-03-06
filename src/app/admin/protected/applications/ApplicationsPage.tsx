'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui-kit/button';
import { Card, CardContent } from '@/components/ui-kit/card';
import { Modal } from '@/components/ui-kit/modal';
import { Input } from '@/components/ui-kit/input';
import { Eye, Trash2 } from 'lucide-react';

const getApplications = async () => {
  const res = await fetch('/api/applications');
  return res.json();
};

const deleteApplication = async (id: string) => {
  await fetch(`/api/applications/${id}`, { method: 'DELETE' });
};

const deleteAllApplicationsApi = async () => {
  await fetch('/api/applications', { method: 'DELETE' });
};

function timeAgo(dateString: string) {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diff = now - then;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export default function ApplicationsPage({ user }: { user: any }) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedToDelete, setSelectedToDelete] = useState<any | null>(null);
  const [deleteConfirmStep, setDeleteConfirmStep] = useState(false);
  const [inputId, setInputId] = useState('');
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'success'>('idle');
  const [confirmingDeleteAll, setConfirmingDeleteAll] = useState(false);
  const [deleteAllStatus, setDeleteAllStatus] = useState<'idle' | 'success'>('idle');
  const [viewApplication, setViewApplication] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleStartDeleteApplication = (app: any) => {
    setSelectedToDelete(app);
    setDeleteConfirmStep(false);
    setInputId('');
    setDeleteStatus('idle');
  };

  const handleFinalDelete = async () => {
    if (!selectedToDelete) return;
    try {
      await deleteApplication(selectedToDelete._id);
      setApplications((apps) => apps.filter((a) => a._id !== selectedToDelete._id));
      setDeleteStatus('success');
      setTimeout(() => {
        setSelectedToDelete(null);
        setDeleteConfirmStep(false);
        setDeleteStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Failed to delete application:', error);
    }
  };

  const confirmDeleteAll = async () => {
    try {
      await deleteAllApplicationsApi();
      setApplications([]);
      setDeleteAllStatus('success');
      setTimeout(() => {
        setConfirmingDeleteAll(false);
        setDeleteAllStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Failed to delete all applications:', error);
    }
  };

  const recentCount = applications.filter(
    (app) => Date.now() - new Date(app.submittedAt).getTime() < 86400000
  ).length;

  const maskId = (id: string) => 'XXXX' + id.slice(-4);

  if (!user) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-slate-600">
        Loading user…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Applications
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View and manage loan applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-sm font-medium text-slate-500">Last 24h</h2>
            <p className="mt-1 text-3xl font-bold text-emerald-600">{recentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-sm font-medium text-slate-500">Total</h2>
            <p className="mt-1 text-3xl font-bold text-emerald-600">{applications.length}</p>
          </CardContent>
        </Card>
      </div>

      {user.role === 'admin' && (
        <Button variant="destructive" onClick={() => setConfirmingDeleteAll(true)}>
          Delete all applications
        </Button>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center p-8">
              <span className="size-8 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-600" aria-hidden />
              <span className="sr-only">Loading applications</span>
            </div>
          ) : (
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="px-3 py-3 text-left font-medium text-slate-700">#</th>
                  <th className="px-3 py-3 text-left font-medium text-slate-700">ID</th>
                  <th className="px-3 py-3 text-left font-medium text-slate-700">Submitted</th>
                  <th className="px-3 py-3 text-left font-medium text-slate-700">State</th>
                  <th className="px-3 py-3 text-right font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-3 py-3 text-slate-700">{index + 1}</td>
                    <td className="px-3 py-3 font-mono text-slate-900">
                      {user.role === 'admin' ? app._id : maskId(app._id)}
                    </td>
                    <td className="px-3 py-3 text-slate-600">{timeAgo(app.submittedAt)}</td>
                    <td className="px-3 py-3 text-slate-600">{app.state || 'Pending'}</td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setViewApplication(app)}
                          aria-label={`View application ${index + 1}`}
                        >
                          <Eye className="size-4" />
                        </Button>
                        {user.role === 'admin' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStartDeleteApplication(app)}
                            aria-label={`Delete application ${index + 1}`}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      <Modal
        open={confirmingDeleteAll}
        onClose={() => { setConfirmingDeleteAll(false); setDeleteAllStatus('idle'); }}
        title="Confirm delete all"
        description="Permanently delete every application."
      >
        <p className="text-slate-600">
          Are you sure you want to delete <strong>all</strong> applications? This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => { setConfirmingDeleteAll(false); setDeleteAllStatus('idle'); }}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmDeleteAll} disabled={deleteAllStatus === 'success'}>
            {deleteAllStatus === 'success' ? 'Deleted' : 'Confirm delete all'}
          </Button>
        </div>
      </Modal>

      <Modal
        open={!!selectedToDelete && !deleteConfirmStep}
        onClose={() => { setSelectedToDelete(null); setDeleteConfirmStep(false); }}
        title="Confirm delete"
        description="Delete this application."
      >
        <p className="text-slate-600">Are you sure you want to delete this application?</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setSelectedToDelete(null)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setDeleteConfirmStep(true)}>Confirm delete</Button>
        </div>
      </Modal>

      <Modal
        open={!!selectedToDelete && deleteConfirmStep}
        onClose={() => { setDeleteConfirmStep(false); }}
        title="Type ID to confirm"
        description="Enter the application ID to confirm deletion."
        size="sm"
      >
        {selectedToDelete && (
          <>
            <p className="text-slate-600">ID: <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">{selectedToDelete._id}</code></p>
            <Input
              label="Application ID"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              placeholder="Paste application ID"
              className="mt-3"
            />
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setDeleteConfirmStep(false)}>Back</Button>
              <Button
                variant="destructive"
                onClick={handleFinalDelete}
                disabled={inputId !== selectedToDelete._id || deleteStatus === 'success'}
              >
                {deleteStatus === 'success' ? 'Deleted' : 'Confirm delete'}
              </Button>
            </div>
          </>
        )}
      </Modal>

      <Modal
        open={!!viewApplication}
        onClose={() => setViewApplication(null)}
        title="Application details"
        size="lg"
      >
        {viewApplication && (
          <div className="space-y-3 text-slate-700">
            {user.role === 'admin' ? (
              <>
                <div className="space-y-3 text-slate-700">

                  <div>
                    <strong>ID:</strong>{" "}
                    <span className="font-mono text-sm">{viewApplication._id}</span>
                  </div>

                  <div>
                    <strong>Name:</strong>{" "}
                    {viewApplication.firstName} {viewApplication.lastName}
                  </div>

                  <div>
                    <strong>Email:</strong> {viewApplication.email}
                  </div>

                  <div>
                    <strong>Phone:</strong> {viewApplication.phone}
                  </div>

                  <div>
                    <strong>Date of Birth:</strong> {viewApplication.dob}
                  </div>

                  <div>
                    <strong>SSN:</strong> {viewApplication.ssn}
                  </div>

                  <div>
                    <strong>City:</strong> {viewApplication.city}
                  </div>

                  <div>
                    <strong>State:</strong> {viewApplication.state}
                  </div>

                  <div>
                    <strong>Loan Amount:</strong> ${viewApplication.loanamount}
                  </div>

                  <div>
                    <strong>Bank Name:</strong> {viewApplication.bank}
                  </div>

                  <div>
                    <strong>Banking Years:</strong> {viewApplication.bankYears}
                  </div>

                  <div>
                    <strong>Account Number:</strong> {viewApplication.accountNumber}
                  </div>

                  <div>
                    <strong>Routing Number:</strong> {viewApplication.routingNumber}
                  </div>

                  <div>
                    <strong>IP Address:</strong> {viewApplication.ipAddress}
                  </div>

                  <div>
                    <strong>Submitted:</strong>{" "}
                    {new Date(viewApplication.submittedAt).toLocaleString()}
                  </div>

                </div>
              </>
            ) : (
              <div className="text-center">
                <p>Limited access. Application ID: <span className="font-mono text-emerald-600">{maskId(viewApplication._id)}</span></p>
                <p className="mt-2 text-sm text-slate-500">Full details are restricted.</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
