import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  if (!data || data.label == null) {
    return null;
  }
  console;
  return (
    <div className="p-4 sm:p-6 lg:px-16 rounded-none overflow-hidden">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-xl relative aspect-[2.5/1] md:aspect-[4.8/1] overflow-hidden bg-cover shadow-6xl"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center">
          <div className="font-bold text-white text-md md:text-4xl lg:text-4xl sm:max-w-xl max-w-xs">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
