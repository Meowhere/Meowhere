'use client';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import ManagementCard from './components/activity-management/ManagementCard';
import ManagementCards from './components/activity-management/ManagementCards';
import NotFoundActivities from './components/NotFoundActivities';
import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function MyActivitiesPage() {
  const router = useRouter();
  const { isDesktop } = useBreakpoint();
  useGnb({
    title: '내 체험 관리',
    subtitle: '',
    backAction: () => router.back(),
    rightButtons: [
      <button
        key='register'
        className='text-md font-semibold text-primary-300'
        onClick={() => router.push('/profile/my-activities/register')}
      >
        새 체험
      </button>,
    ],
  });

  // 더미 데이터
  const activitiesData: any[] = [];
  activitiesData
    .push
    // {
    //   id: 1,
    //   title: '함께 배우면 즐거운 스트릿 댄스',
    //   bannerImageUrl: '/assets/icons/test_img.png',
    //   price: 148000,
    //   rating: 3.8,
    // },
    // {
    //   id: 2,
    //   title: '함께 배우면 즐거운 스트릿 댄스',
    //   bannerImageUrl: '/assets/icons/test_img.png',
    //   price: 148000,
    //   rating: 3.8,
    // },
    // {
    //   id: 3,
    //   title: '함께 배우면 즐거운 스트릿 댄스',
    //   bannerImageUrl: '/assets/icons/test2_img.png',
    //   price: 148000,
    //   rating: 3.8,
    // },
    // {
    //   id: 4,
    //   title: '함께 배우면 즐거운 스트릿 댄스',
    //   bannerImageUrl: '/assets/icons/test_img.png',
    //   price: 148000,
    //   rating: 3.8,
    // },
    // {
    //   id: 5,
    //   title: '함께 배우면 즐거운 스트릿 댄스',
    //   bannerImageUrl: '/assets/icons/test2_img.png',
    //   price: 148000,
    //   rating: 3.8,
    // },
    // {
    //   id: 6,
    //   title: '함께 배우면 즐거운 스트릿 댄스',
    //   bannerImageUrl: '/assets/icons/test_img.png',
    //   price: 148000,
    //   rating: 3.8,
    // },
    // {
    //   id: 7,
    //   title: '함께 배우면 즐거운 스트릿 댄스',
    //   bannerImageUrl: '/assets/icons/test_img.png',
    //   price: 148000,
    //   rating: 3.8,
    // },
    // {
    //   id: 8,
    //   title: '함께 배우면 즐거운 스트릿 댄스',
    //   bannerImageUrl: '/assets/icons/test_img.png',
    //   price: 148000,
    //   rating: 3.8,
    // }
    ();

  // 실제 데이터는 API 호출 등을 통해 가져올 수 있습니다.
  return (
    <div className='relative flex flex-col mx-[24px] my-[112px]'>
      {activitiesData.length === 0 ? (
        <NotFoundActivities />
      ) : (
        <div>
          {isDesktop && (
            <div className='absolute right-0 w-[128px]'>
              <BaseButton
                variant='primary'
                className=' text-md font-semibold'
                onClick={() => router.push('/profile/my-activities/register')}
              >
                새 체험
              </BaseButton>
            </div>
          )}
          <ManagementCards activities={activitiesData} />
        </div>
      )}
    </div>
  );
}
