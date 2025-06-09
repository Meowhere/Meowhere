export default function VerticalDivider({ className = '' }: { className?: string }) {
  return <div className={`w-px h-full bg-gray-200 ${className}`} />;
}
