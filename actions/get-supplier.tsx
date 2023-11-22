import { Supplier } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/suppliers`;

const getSupplier = async (id: string): Promise<Supplier> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getSupplier;