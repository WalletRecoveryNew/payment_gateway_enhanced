import React from 'react';
import '../app/design-system.css';

export function DataTable({ headers, children, actionLabel, actionHref }) {
  return (
    <div className="table-container">
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-crypto-white">Recent Transactions</h3>
          {actionLabel && actionHref && (
            <a href={actionHref} className="text-crypto-cyan text-sm hover:underline transition-all duration-200 flex items-center">
              {actionLabel}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TableRow({ children }) {
  return <tr>{children}</tr>;
}

export function TableCell({ children, highlight = false }) {
  return (
    <td className={highlight ? "table-cell-highlight" : "table-cell"}>
      {children}
    </td>
  );
}

export function StatusBadge({ status }) {
  const statusMap = {
    completed: "status-badge-success",
    pending: "status-badge-pending",
    failed: "status-badge-failed",
    processing: "status-badge-info"
  };
  
  const className = statusMap[status.toLowerCase()] || "status-badge-info";
  
  return (
    <span className={className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
