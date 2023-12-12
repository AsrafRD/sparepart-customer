import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProductCard from "./ui/product-card";
import getProducts from "@/actions/get-products";
import axios from "axios";

interface ResultModalProps {
  params?: {
    productId: string;
  };
  result: any | null;
  errorMessage: string | null;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  params,
  result,
  errorMessage,
  onClose,
}) => {
  const [matchingProducts, setMatchingProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatchingProducts = async () => {
      if (result && result.length > 0) {
        // Extracting the first matchingProductID from the result
        const firstMatchingProductID = result[0].matchingProductIDs[0];

        console.log("First matching Product Id:", firstMatchingProductID);

        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/products`,
            {
              params: { productId: firstMatchingProductID },
            }
          );

          // Fetch products based on the first matchingProductID
          const allProducts = response.data;

          // Create a new array by filtering products based on matchingProductIDs
          const matchingProducts = allProducts.filter((product: any) =>
            result.some((item: any) =>
              item.matchingProductIDs.includes(product.id)
            )
          );
          setMatchingProducts(matchingProducts);
        } catch (error) {
          console.error("Error sending request to Server City:", error);
        }
      }
    };

    fetchMatchingProducts();
  }, [result]);

  if (!result && !errorMessage) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full py-10 px-6 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
      <div className="bg-white p-5 md:p-10 md:mx-10 mx-2 rounded-md max-h-full overflow-y-auto">
        {errorMessage?.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <p className="text-red-500">
              ( Keluhan kendaraan yang anda berikan diluar pengetahuan kami )
            </p>
            <p className="font-bold">
              silahkan inputkan keluhan lain jika masih ada
            </p>
          </div>
        ) : result ? (
          <div className="px-5">
            <p className="flex justify-center text-center text-2xl font-bold text-orange-500 mb-8">
              Hasil diagnosa kendaraan oleh RozicSparepart atas keluhan
              kendaraan anda
            </p>
            {result.map((item: any, index: number) => (
              <div key={index} className="mb-5">
                <div className="md:flex md:flex-row md:items-center flex flex-col">
                  <span className="font-bold text-xl">
                    {`Kemungkinan ${index + 1}`}
                  </span>
                  <span className="font-bold text-orange-600">
                    ( tingkat akurasi : {(item.similarity * 100).toFixed(0)}% )
                  </span>
                </div>
                <br />
                Keluhan <span className="font-bold">
                  {item.intersection}
                </span>{" "}
                yang anda sampaikan tersebut, menurut kami kendararaan anda
                mengalami <span className="font-bold">{item.rule.hasil}</span>.
              </div>
            ))}
            <div className="font-bold text-orange-600 mt-8">
              Berikut rekomendasi produk kami :
            </div>
            <div className="grid grid-cols-5 mt-5">
              <div className="col-span-4 md:col-span-1">
                {matchingProducts.length === 0 ? (
                  <p className="text-red-500">Tidak ada rekomendasi produk dari kami untuk Anda</p>
                ) : (
                  matchingProducts.map((product: any) => (
                    <ProductCard key={product.id} data={product} />
                  ))
                )}
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex justify-center">
          <Button
            className="mt-4 p-2 px-4 font-bold bg-orange-400 text-white rounded"
            onClick={onClose}
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
