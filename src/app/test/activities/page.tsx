import ExperienceImageViewer from '../../activities/[id]/components/experience/ExperienceImageViewer';
import ExperienceSummarySection from '../../activities/[id]/components/experience/ExperienceSummarySection';

export default function BentoTestPage() {
  return (
    <main className='p-4'>
      <ExperienceImageViewer />
      <ExperienceSummarySection />
    </main>
  );
}
