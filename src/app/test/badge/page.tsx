import AllBadgeList from '@/src/components/common/badge/AllBadgeList';
import BadgeEarnedModal from '@/src/components/common/badge/BadgeEarnedModal';

export default function MyPage() {
  return (
    <div className='p-4 mt-[100px]'>
      <BadgeEarnedModal />
      <AllBadgeList />
    </div>
  );
}
