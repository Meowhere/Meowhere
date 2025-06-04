'use client';

import { useParams } from 'next/navigation';
import ExperienceImageViewer from '../../activities/[id]/components/experience/ExperienceImageViewer';
import ExperienceSummarySection from '../../activities/[id]/components/experience/ExperienceSummarySection';
import Divider from './components/Divider';
import SectionTitle from './components/SectionTitle';

export default function ExperienceDetailPage() {
  const { id } = useParams();

  return (
    <main className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-4'>
        <ExperienceImageViewer />
        <ExperienceSummarySection />
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto px-4'>
        <SectionTitle title='만나는 곳' subtitle='서울 중구 청계천로 100 10F' />
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto px-4'>
        <SectionTitle title='체험 설명' />
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto px-4'>
        <SectionTitle title='후기' />
      </div>
    </main>
  );
}
