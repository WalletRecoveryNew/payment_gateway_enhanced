import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Layout } from '../components/layout';
import './globals.css';
import './components.css';
import './animations.css';
import './design-system.css';
import './mobile-optimizations.css';

export const metadata: Metadata = {
  title: 'CryptoFlow - Enterprise-Grade Crypto Payment Gateway',
  description: 'Accept cryptocurrency payments securely and effortlessly. Integrate with your platform in minutes with our enterprise-ready solution.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
