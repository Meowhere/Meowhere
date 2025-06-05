'use client';

interface ExperienceDescriptionProps {
  description: string;
}

export default function ExperienceDescription({ description }: ExperienceDescriptionProps) {
  return (
    <div className='text-gray-700 text-md font-regular opacity-[0.75] px-[12px] whitespace-pre-wrap leading-relaxed'>
      {description}
    </div>
  );
}
