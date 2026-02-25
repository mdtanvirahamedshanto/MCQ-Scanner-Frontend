"use client";

import { ScanJob } from "@/lib/api/types";

export function JobStatusTable({ jobs }: { jobs: ScanJob[] }) {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left px-3 py-2">Job ID</th>
            <th className="text-left px-3 py-2">Status</th>
            <th className="text-left px-3 py-2">Attempts</th>
            <th className="text-left px-3 py-2">Token Charged</th>
            <th className="text-left px-3 py-2">Error</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t border-slate-100">
              <td className="px-3 py-2">{job.id}</td>
              <td className="px-3 py-2">{job.status}</td>
              <td className="px-3 py-2">{job.attempts}</td>
              <td className="px-3 py-2">{job.token_charged ? "Yes" : "No"}</td>
              <td className="px-3 py-2 text-red-600">{job.error_message || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
