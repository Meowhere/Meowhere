'use client';

interface ExperienceDescriptionProps {
  description: string;
}

export default function ExperienceDescription({ description }: ExperienceDescriptionProps) {
  return (
    <div className='text-gray-600 dark:text-gray-400 text-md font-regular whitespace-pre-wrap leading-relaxed'>
      {description}
    </div>
  );
}
