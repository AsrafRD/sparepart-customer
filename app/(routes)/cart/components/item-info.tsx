import Image from "next/image";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";

interface CartItemProps {
  data: Product;
}

const ItemInfo: React.FC<CartItemProps> = ({ data }) => {
  return (
    <div className="bg-gray-50 md:bg-gray-100 px-2 py-2 p-2 lg:col-span-1 lg:mt-0 lg:mx-5">
      <li className="flex items-center border-color-white">
        <div className="relative h-24 w-24 md:h-20 md:w-20 rounded-md overflow-hidden">
          <Image
            fill
            src={data.images[0].url}
            alt=""
            className="object-cover object-center"
          />
        </div>
        <div className="ml-4 sm:ml-6">
          <div className="flex flex-col text-gray-700">
            <p className="text-md font-bold">{data.name}</p>
            <Currency value={data.price} />
            <p className="text-sm font-semibold">x {data.quantity}</p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ItemInfo;
