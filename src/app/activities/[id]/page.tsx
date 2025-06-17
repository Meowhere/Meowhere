import ExperienceDetailClient from './components/ExperienceDetailClient';

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const activityId = Number(params.id);
  return <ExperienceDetailClient activityId={activityId} />;
}
