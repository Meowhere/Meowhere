import SearchIcon from '@/src/components/common/icons/SearchIcon';

export default function SearchButton({
  hasParams,
  params,
  setIsSearching,
  setBackAction,
  keyword,
  setKeyword,
  isSearching,
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
  setKeyword: (keyword: string) => void;
  keyword: string;
  isSearching: boolean;
}) {
  function handleSearch() {
    if (isSearching) return;

    setIsSearching(true);
    setBackAction(() => {
      setIsSearching(false);
      setBackAction(null);
    });
  }

  return (
    <button
      className='w-full h-full bg-white border border-gray-200 text-gray-800 rounded-full text-sm flex items-center justify-center gap-2 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'
      onClick={handleSearch}
    >
      {/* 검색 중 */}
      {isSearching ? (
        <input
          type='text'
          placeholder='여기에 검색어 입력'
          className='w-full h-full text-sm text-gray-800 text-center px-[16px]'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      ) : hasParams ? (
        // 검색 안함 + 필터 있음
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
        // 검색 안함 + 필터 없음
        <>
          <SearchIcon />
          <span>새로운 체험 찾기</span>
        </>
      )}
    </button>
  );
}
