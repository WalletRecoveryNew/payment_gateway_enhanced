import { Layout } from '../components/layout';
import '../app/components.css';

export function metadata() {
  return {
    title: 'CryptoFlow - Enterprise-Grade Crypto Payment Gateway',
    description: 'Accept cryptocurrency payments securely and effortlessly. Integrate with your platform in minutes with our enterprise-ready solution.',
  };
}

export default function RootLayout({ children }) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}
