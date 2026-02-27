import { useState } from 'react';
import { RefreshCw, Trash2, Loader2, Inbox, AlertCircle, ArrowLeft } from 'lucide-react';
import { useGetAllSubmissions, useDeleteSubmission } from '../hooks/useQueries';
import type { Submission } from '../backend';

function formatTimestamp(ts: bigint): string {
  if (ts === 0n) return '—';
  // ICP timestamps are in nanoseconds
  const ms = Number(ts / 1_000_000n);
  const date = new Date(ms);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function SubmissionCard({ submission, onDelete, isDeleting }: {
  submission: Submission;
  onDelete: (id: bigint) => void;
  isDeleting: boolean;
}) {
  return (
    <div className="bg-[#1a1a1a] border border-white/8 rounded-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-body font-semibold text-white text-base">{submission.name || '—'}</p>
          <p className="font-body text-xs text-[#FF6B35] mt-0.5">{submission.eventType || '—'}</p>
        </div>
        <button
          onClick={() => onDelete(submission.id)}
          disabled={isDeleting}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-sm bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Delete submission"
        >
          {isDeleting ? (
            <Loader2 size={14} className="text-red-400 animate-spin" />
          ) : (
            <Trash2 size={14} className="text-red-400" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-body">
        <div>
          <span className="text-[#888] text-xs uppercase tracking-wide">Email</span>
          <p className="text-white/80 mt-0.5 break-all">{submission.email || '—'}</p>
        </div>
        <div>
          <span className="text-[#888] text-xs uppercase tracking-wide">Phone</span>
          <p className="text-white/80 mt-0.5">{submission.phone || '—'}</p>
        </div>
        <div>
          <span className="text-[#888] text-xs uppercase tracking-wide">Organization</span>
          <p className="text-white/80 mt-0.5">{submission.organization || '—'}</p>
        </div>
        <div>
          <span className="text-[#888] text-xs uppercase tracking-wide">Received</span>
          <p className="text-white/80 mt-0.5">{formatTimestamp(submission.timestamp)}</p>
        </div>
      </div>

      {submission.message && (
        <div>
          <span className="text-[#888] text-xs uppercase tracking-wide font-body">Message</span>
          <p className="text-white/70 text-sm font-body mt-1 leading-relaxed">{submission.message}</p>
        </div>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const { data: submissions, isLoading, isError, refetch, isFetching } = useGetAllSubmissions();
  const deleteSubmission = useDeleteSubmission();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: bigint) => {
    setDeletingId(id);
    setDeleteError(null);
    try {
      await deleteSubmission.mutateAsync(id);
    } catch {
      setDeleteError(`Failed to delete submission #${id}. Please try again.`);
    } finally {
      setDeletingId(null);
    }
  };

  // Filter out the empty placeholder submission (id=0, name='', email='')
  const realSubmissions = (submissions ?? []).filter(
    (s) => !(s.name === '' && s.email === '')
  );

  return (
    <div className="min-h-screen bg-[#111111] text-white font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur border-b border-white/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 text-[#888] hover:text-white transition-colors duration-200 text-sm"
            >
              <ArrowLeft size={16} />
              <span>Back to site</span>
            </a>
            <span className="text-white/20">|</span>
            <h1 className="font-display text-2xl text-white tracking-wide">
              Booking <span className="text-[#FF6B35]">Submissions</span>
            </h1>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] text-sm font-semibold hover:bg-[#FF6B35]/20 hover:border-[#FF6B35]/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats bar */}
        {!isLoading && !isError && (
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-[#1a1a1a] border border-white/8 rounded-sm px-4 py-2 inline-flex items-center gap-2">
              <span className="text-[#FF6B35] font-semibold text-lg">{realSubmissions.length}</span>
              <span className="text-[#888] text-sm">
                {realSubmissions.length === 1 ? 'submission' : 'submissions'} total
              </span>
            </div>
          </div>
        )}

        {/* Delete error */}
        {deleteError && (
          <div className="mb-4 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3 text-red-400 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            {deleteError}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={36} className="text-[#FF6B35] animate-spin" />
            <p className="text-[#888] text-sm">Loading submissions...</p>
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <AlertCircle size={36} className="text-red-400" />
            <p className="text-white font-semibold">Failed to load submissions</p>
            <p className="text-[#888] text-sm">Please try refreshing the page.</p>
            <button
              onClick={() => refetch()}
              className="mt-2 px-4 py-2 rounded-sm bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] text-sm hover:bg-[#FF6B35]/20 transition-all duration-200"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && realSubmissions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Inbox size={48} className="text-[#444]" />
            <p className="text-white font-semibold text-lg">No booking submissions yet</p>
            <p className="text-[#888] text-sm max-w-xs">
              When someone fills out the "Book Jigar Now" form, their details will appear here.
            </p>
          </div>
        )}

        {/* Submissions list */}
        {!isLoading && !isError && realSubmissions.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-sm border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a1a1a] border-b border-white/8">
                    <th className="text-left px-4 py-3 text-[#888] text-xs uppercase tracking-wide font-semibold">#</th>
                    <th className="text-left px-4 py-3 text-[#888] text-xs uppercase tracking-wide font-semibold">Name</th>
                    <th className="text-left px-4 py-3 text-[#888] text-xs uppercase tracking-wide font-semibold">Email</th>
                    <th className="text-left px-4 py-3 text-[#888] text-xs uppercase tracking-wide font-semibold">Phone</th>
                    <th className="text-left px-4 py-3 text-[#888] text-xs uppercase tracking-wide font-semibold">Organization</th>
                    <th className="text-left px-4 py-3 text-[#888] text-xs uppercase tracking-wide font-semibold">Event Type</th>
                    <th className="text-left px-4 py-3 text-[#888] text-xs uppercase tracking-wide font-semibold">Message</th>
                    <th className="text-left px-4 py-3 text-[#888] text-xs uppercase tracking-wide font-semibold">Date</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {realSubmissions.map((sub, idx) => (
                    <tr
                      key={String(sub.id)}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 text-[#555] text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{sub.name || '—'}</td>
                      <td className="px-4 py-3 text-white/70 max-w-[160px] truncate">{sub.email || '—'}</td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap">{sub.phone || '—'}</td>
                      <td className="px-4 py-3 text-white/70 max-w-[140px] truncate">{sub.organization || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-0.5 rounded-sm bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-medium whitespace-nowrap">
                          {sub.eventType || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/60 max-w-[200px]">
                        <span className="line-clamp-2 text-xs leading-relaxed">{sub.message || '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-[#666] text-xs whitespace-nowrap">{formatTimestamp(sub.timestamp)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(sub.id)}
                          disabled={deletingId === sub.id}
                          className="w-8 h-8 flex items-center justify-center rounded-sm bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Delete"
                        >
                          {deletingId === sub.id ? (
                            <Loader2 size={13} className="text-red-400 animate-spin" />
                          ) : (
                            <Trash2 size={13} className="text-red-400" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-4">
              {realSubmissions.map((sub) => (
                <SubmissionCard
                  key={String(sub.id)}
                  submission={sub}
                  onDelete={handleDelete}
                  isDeleting={deletingId === sub.id}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 mt-12 py-6 text-center">
        <p className="text-[#555] text-xs font-body">
          Jigar Chaudhary Admin Panel · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
