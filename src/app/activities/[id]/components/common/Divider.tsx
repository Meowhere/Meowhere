export default function Divider({ className = '' }: { className?: string }) {
  return (
    <div className='px-[12px]'>
      <hr className={`w-full border-t border-gray-200 my-6 ${className}`} />
    </div>
  );
}
