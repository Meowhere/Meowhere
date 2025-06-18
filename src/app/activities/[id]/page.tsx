import ExperienceDetailClient from './components/ExperienceDetailClient';

type ExperienceDetailPageProps = {
  params: {
    id: string;
  };
};

export default function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const activityId = Number(params.id);
  return <ExperienceDetailClient activityId={activityId} />;
}
