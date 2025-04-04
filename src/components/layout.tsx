import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const ResponsiveTest = dynamic(() => import('./responsive-test'), {
  ssr: false
});

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ResponsiveTest />
    </>
  );
}
