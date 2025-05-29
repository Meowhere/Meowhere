"use client";

import DropdownItem from "../dropdown-item/DropdownItem";
import {
  DropdownMenuProps,
  DropdownItemButton,
  DropdownItemData,
} from "../../../../types/dropdown-menu.types";

export default function DropdownMenu({
  items,
  isMobile = false,
  title,
  bottomButton,
}: DropdownMenuProps) {
  const mobileShadow =
    "shadow-[0_0.4rem_4rem_rgba(0,0,0,0.1)] backdrop-blur-[4rem]";
  const desktopShadow = "shadow-[0_0_2rem_rgba(0,0,0,0.05)]";

  const wrapperClass = `
    w-full rounded-[1.2rem] overflow-hidden bg-white border border-gray-100
    ${mobileShadow}
  `;

  if (isMobile) {
    return (
      <div className="w-full flex flex-col gap-[0.8rem]">
        <div className={wrapperClass}>
          {title && (
            <div className="text-center text-xs text-gray-600 leading-[1.2rem] h-[3.6rem] flex items-center justify-center border-b border-gray-100">
              {title}
            </div>
          )}
          <div className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <DropdownItem
                key={idx}
                {...item}
                isMobile
                isDelete={item.isDelete}
              />
            ))}
          </div>
        </div>

        {bottomButton && (
          <div className={wrapperClass}>
            <DropdownItem
              {...bottomButton}
              isMobile
              isDelete={bottomButton.label === "삭제"}
            />
          </div>
        )}
      </div>
    );
  }

  // NotMobile
  return (
    <div
      className={`
        rounded-[1.2rem] border border-gray-100 bg-white overflow-hidden min-w-[16rem]
        ${desktopShadow}
      `}
    >
      {items.map((item, idx) => (
        <DropdownItem key={idx} {...item} isDelete={item.isDelete} />
      ))}
    </div>
  );
}
