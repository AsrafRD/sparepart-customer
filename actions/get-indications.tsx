import { Indication } from "@/types";
import axios, { AxiosResponse } from "axios"; // tambahkan AxiosResponse

const URL = `${process.env.NEXT_PUBLIC_API_URL}/indications`;

const getIndications = async (): Promise<Indication[]> => {
  const res: AxiosResponse<Indication[]> = await axios.get(URL);

  return res.data; // Mengembalikan data langsung tanpa perlu NextResponse.json
};

export default getIndications;
