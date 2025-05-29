"use client";

import DropdownMenu from "../../../components/common/dropdowns/dropdown-menu/DropdownMenu";

export default function DropdownMenuTestPage() {
  return (
    <div className="flex flex-col gap-10 p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">DropdownMenu Test Cases</h1>

      {/* 1. Desktop - 버튼만 */}
      <div>
        <h2 className="font-semibold mb-2">1. Desktop - 버튼만</h2>
        <DropdownMenu
          items={[
            { type: "button", label: "예약 완료", onClick: () => {} },
            { type: "button", label: "예약 승인", onClick: () => {} },
            { type: "button", label: "예약 취소", onClick: () => {} },
            { type: "button", label: "예약 거절", onClick: () => {} },
            { type: "button", label: "체험 완료", onClick: () => {} },
          ]}
        />
      </div>

      {/* 2. Desktop - 링크 + 버튼 */}
      <div>
        <h2 className="font-semibold mb-2">2. Desktop - 링크 + 버튼</h2>
        <DropdownMenu
          items={[
            { type: "link", label: "수정하기", href: "/page" },
            {
              type: "button",
              label: "삭제",
              onClick: () => {},
              isDelete: true,
            },
          ]}
        />
      </div>

      {/* 3. Mobile - title + 버튼 리스트 + 하단 취소 버튼 */}
      <div>
        <h2 className="font-semibold mb-2">3. Mobile - 타이틀 + 취소 버튼</h2>
        <DropdownMenu
          isMobile
          title="체험 상태"
          items={[
            { type: "button", label: "예약 완료", onClick: () => {} },
            { type: "button", label: "예약 승인", onClick: () => {} },
            { type: "button", label: "예약 취소", onClick: () => {} },
            { type: "button", label: "예약 거절", onClick: () => {} },
            { type: "button", label: "체험 완료", onClick: () => {} },
          ]}
          bottomButton={{
            type: "button",
            label: "취소",
            onClick: () => alert("취소"),
          }}
        />
      </div>

      {/* 4. Mobile - 링크 포함 + 하단 삭제 버튼 */}
      <div>
        <h2 className="font-semibold mb-2">
          4. Mobile - 링크 포함 + 삭제 버튼
        </h2>
        <DropdownMenu
          isMobile
          title="함께 배우면 즐거운 스트릿 댄스"
          items={[
            { type: "link", label: "수정하기", href: "/page" },
            {
              type: "button",
              label: "삭제",
              onClick: () => {},
              isDelete: true,
            },
          ]}
          bottomButton={{
            type: "button",
            label: "취소",
            onClick: () => {},
          }}
        />
      </div>

      {/* 5. Mobile - 게시글 dropdown */}
      <div>
        <h2 className="font-semibold mb-2">5. Mobile - 게시글 dropdown</h2>
        <DropdownMenu
          isMobile
          title="게시물 관리"
          items={[
            { type: "link", label: "게시물 수정", href: "/page" },
            {
              type: "button",
              label: "게시물 삭제",
              onClick: () => {},
              isDelete: true,
            },
          ]}
          bottomButton={{
            type: "button",
            label: "취소",
            onClick: () => {},
          }}
        />
      </div>
    </div>
  );
}
