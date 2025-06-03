'use client';

import { useParams } from 'next/navigation';
import ExperienceImageViewer from '../../activities/[id]/components/experience/ExperienceImageViewer';
import ExperienceSummarySection from '../../activities/[id]/components/experience/ExperienceSummarySection';
import Divider from './components/Divider';

export default function ExperienceDetailPage() {
  const { id } = useParams();

  return (
    <main className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-4'>
        <ExperienceImageViewer />
        <ExperienceSummarySection />
        <Divider />
      </div>
    </main>
  );
}
