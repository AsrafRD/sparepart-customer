import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const InputSearch = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter()

  const handleSearch = () => {
    const keyword = searchRef.current?.value.trim();
    
    if (!keyword) return;

    router.push(`/search/${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="relative">
      <input
        placeholder="cari produk...."
        className="px-4 w-full h-10 p-2 rounded-full border-2"
        ref={searchRef}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="absolute top-2 end-3" onClick={handleSearch}>
        <MagnifyingGlass size={24} />
      </button>
    </div>
  );
};

export default InputSearch;
