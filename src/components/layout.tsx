import ResponsiveTest from '../components/responsive-test';

export function Layout({ children }) {
  return (
    <>
      {children}
      <ResponsiveTest />
    </>
  );
}
