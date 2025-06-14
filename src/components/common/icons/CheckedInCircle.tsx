export default function CheckedInCircle({ className }: { className?: string }) {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle cx='20' cy='20' r='18' stroke='currentColor' stroke-width='4' />
      <path
        d='M11.2822 18.8141L18.1098 26.6671L29.4876 14.3594'
        stroke='currentColor'
        stroke-width='4'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
