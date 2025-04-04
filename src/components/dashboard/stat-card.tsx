import React from 'react';
import '../../app/design-system.css';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color?: string;
}

export function StatCard({ title, value, change, icon, color = 'crypto-cyan' }: StatCardProps) {
  const isPositive = !change.includes('-');
  const trendColor = isPositive ? 'text-green-400' : 'text-red-400';
  
  return (
    <div className="stats-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-crypto-gray-light text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-crypto-white mt-1">{value}</h3>
          <div className={`flex items-center mt-1 ${trendColor} text-sm`}>
            {isPositive ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1v-5a1 1 0 112 0v2.586l4.293-4.293a1 1 0 011.414 0L16 9.586V7a1 1 0 112 0v5a1 1 0 01-1 1h-5z" clipRule="evenodd" />
              </svg>
            )}
            <span>{change}</span>
          </div>
        </div>
        <div className={`p-3 bg-${color}/10 rounded-full animate-pulse-slow`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
