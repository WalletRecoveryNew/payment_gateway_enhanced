import '../components.css';

export default function FeatureCard({ icon, title, description, linkText, linkHref }) {
  return (
    <div className="feature-card">
      <div className="w-14 h-14 bg-crypto-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-crypto-cyan/30 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-crypto-white mb-4">{title}</h3>
      <p className="text-crypto-gray-light mb-6 leading-relaxed">
        {description}
      </p>
      <a href={linkHref} className="inline-flex items-center text-crypto-cyan hover:text-crypto-cyan/80 font-medium group-hover:translate-x-1 transition-transform duration-300">
        {linkText}
      </a>
    </div>
  );
}
