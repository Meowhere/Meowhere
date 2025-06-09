export default function Divider({ className = '' }: { className?: string }) {
  return <hr className={`w-full border-t border-gray-200 my-6 ${className}`} />;
}
