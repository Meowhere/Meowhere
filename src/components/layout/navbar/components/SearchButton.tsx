import SearchIcon from '@/src/components/common/icons/SearchIcon';

export default function SearchButton({
  hasParams,
  params,
  setIsSearching,
  setBackAction,
}: {
  hasParams: boolean;
  params: {
    address: string | null;
    keyword: string | null;
    minPrice: string | null;
    maxPrice: string | null;
  };
  setIsSearching: (isSearching: boolean) => void;
  setBackAction: (action: (() => void) | null) => void;
}) {
  return (
    <button
      className='w-full h-full bg-white border border-gray-200 text-gray-800 rounded-full text-sm flex items-center justify-center gap-2 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'
      onClick={() => {
        setIsSearching(true);
        setBackAction(() => {
          setIsSearching(false);
          setBackAction(null);
        });
      }}
    >
      {hasParams ? (
        <div className='flex flex-col justify-center items-center leading-none gap-[4px]'>
          <div className='flex'>
            <span>{params.address}</span>
            {params.address && params.keyword && <span>의&nbsp;</span>}
            {!params.address && !params.keyword && <span>어디든지</span>}
            <span>{params.keyword}</span>
          </div>
          {(params.minPrice || params.maxPrice) && (
            <div className='flex gap-2 text-gray-400'>
              {params.minPrice && <span>{Number(params.minPrice).toLocaleString()}원</span>}
              <span> ~ </span>
              {params.maxPrice && <span>{Number(params.maxPrice).toLocaleString()}원</span>}
            </div>
          )}
        </div>
      ) : (
        <>
          <SearchIcon />
          <span>새로운 체험 찾기</span>
        </>
      )}
    </button>
  );
}
