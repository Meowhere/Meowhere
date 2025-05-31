import SearchIcon from '../../common/icons/SearchIcon';

export default function Navbar() {
  return (
    <nav className='fixed top-0 left-0 w-full'>
      <div className='grid grid-cols-3 w-full h-[76px] p-[14px] items-center'>
        <div className='flex justify-start'>위 왼쪽</div>
        <div className='flex justify-center w-full max-w-[500px] h-[48px]'>
          <button className='w-full h-full bg-primary-300 text-white rounded-full text-sm flex items-center justify-center gap-2'>
            <SearchIcon />
            <span>새로운 체험 찾기</span>
          </button>
        </div>
        <div className='flex justify-end'>위 오른쪽</div>
      </div>
      <div className='flex justify-center h-[48px] overflow-x-scroll gap-[100px]'>
        <button>테스트 01</button>
        <button>테스트 02</button>
        <button>테스트 03</button>
        <button>테스트 04</button>
        <button>테스트 05</button>
        <button>테스트 06</button>
      </div>
    </nav>
  );
}
