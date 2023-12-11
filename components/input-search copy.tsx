"use client";

import { MagnifyingGlass } from '@phosphor-icons/react';
import { useRouter } from "next/navigation";
import { useRef } from "react";

const InputSearch = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleSearch = (event: any) => {
    const keyword = searchRef.current?.value;

    if (!keyword) return;

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative px-2">
      <input
        placeholder="search product....."
        className="w-full py-1 p-4 rounded-2xl border-2"
        ref={searchRef}
        onKeyDown={handleSearch}
      />
      <button className="absolute top-2 end-5" onClick={handleSearch}>
        <MagnifyingGlass className='h-5 w-5' />
      </button>
    </div>
  );
};

export default InputSearch;
