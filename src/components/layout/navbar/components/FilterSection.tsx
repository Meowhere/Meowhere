export default function FilterSection({
  children,
  title,
  isOpen,
  onClick,
  value = '',
  ...rest
}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <section
      className={`${isOpen ? 'h-auto pt-[18px] pb-[24px]' : 'h-[52px]'} flex flex-col justify-center items-start w-full gap-[16px] bg-white rounded-[8px] px-[24px]`}
      {...rest}
      onClick={onClick}
    >
      <div className='flex justify-between items-center w-full'>
        <h2
          className={`${isOpen ? 'text-[22px]' : 'text-[13px]'} leading-none font-semibold text-gray-800`}
        >
          {title}
        </h2>
        <span>{value}</span>
      </div>
      {isOpen && children}
    </section>
  );
}
