interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={`mb-4 flex flex-col gap-[8px] ${className}`}>
      <h2 className='text-[2.2rem] leading-[3.2rem] font-semibold text-gray-800 dark:text-gray-200'>
        {title}
      </h2>
      {subtitle && <p className='text-md text-gray-500'>{subtitle}</p>}
    </div>
  );
}
