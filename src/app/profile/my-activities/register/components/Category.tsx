import DropdownTrigger from '@/src/components/common/dropdowns/DropdownTrigger';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { useState } from 'react';

export default function Category() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DropdownTrigger label='카테고리' text='웰빙' isOpen={open} onClick={() => setOpen(false)} />
      {/* <DropdownMenu /> */}
    </div>
  );
}
