import getIndications from "@/actions/get-indications";
import IndicationList from "@/components/indication-list";

const Page = async () => {
  const indication = await getIndications();

  return (
        <div className="mt-4">
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <IndicationList
              title="Cek Kondisi Kendaraan di RozicSparepart"
              items={indication}
            />
          </div>
        </div>
  );
};

export default Page;
