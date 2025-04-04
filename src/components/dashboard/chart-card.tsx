import React, { ReactNode } from 'react';
import '../../app/design-system.css';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <h3 className="text-lg font-medium text-crypto-white mb-4">{title}</h3>
      <div className="rounded-md bg-white/5 p-4 min-h-[200px] flex items-center justify-center relative overflow-hidden">
        {children || (
          <div className="text-crypto-gray-light flex flex-col items-center">
            <div className="animate-pulse-slow mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-crypto-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p>Chart visualization will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
