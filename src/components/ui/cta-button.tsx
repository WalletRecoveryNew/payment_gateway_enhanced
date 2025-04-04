import '../components.css';

export default function CTAButton({ href, children, secondary = false, className = '' }) {
  return (
    <a 
      href={href} 
      className={`inline-flex items-center justify-center ${secondary ? 'secondary-button' : 'cta-button'} ${className}`}
    >
      {children}
    </a>
  );
}
