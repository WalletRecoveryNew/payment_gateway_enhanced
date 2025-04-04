import '../components.css';
import { ReactNode } from 'react';

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}

export default function CTAButton({ href, children, secondary = false, className = '' }: CTAButtonProps) {
  return (
    <a 
      href={href} 
      className={`inline-flex items-center justify-center ${secondary ? 'secondary-button' : 'cta-button'} ${className}`}
    >
      {children}
    </a>
  );
}
