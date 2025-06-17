export default function Divider({ className = '' }: { className?: string }) {
  return (
    <hr className={`w-full border-t border-gray-200 dark:border-gray-700 my-6 ${className}`} />
  );
}
