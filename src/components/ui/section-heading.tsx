import '../components.css';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  highlightedWord: string;
}

export default function SectionHeading({ badge, title, description, highlightedWord }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      {badge && (
        <div className="badge mb-4">
          {badge}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-crypto-white mb-6">
        {title.split(highlightedWord).map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && <span className="text-crypto-cyan">{highlightedWord}</span>}
          </span>
        ))}
      </h2>
      {description && (
        <p className="text-xl text-crypto-gray-light max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
