import React, { useEffect, useState } from "react";
import ProductCard from "./ui/product-card";
import axios from "axios";
import { Button } from "./ui/button";

interface ResultModalProps {
  params?: {
    productId: string;
  };
  result: any | null;
  errorMessage: string | null;
  onClose: () => void;
  selectedIndications: string[];
}

const ResultModal: React.FC<ResultModalProps> = ({
  params,
  result,
  errorMessage,
  onClose,
  selectedIndications,
}) => {
  const [matchingProducts, setMatchingProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatchingProducts = async () => {
      if (result && result.length > 0) {
<<<<<<< HEAD
        const rule = result.rule;
=======
        // Extracting the first matchingProductID from the result
        const firstMatchingProductID = result[0].matchingProductIDs[0];

>>>>>>> 9cbd440bd29c8f6108e1f2d99c9985eb1ba51de1
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/products`,
            {
              params: { productId: rule },
            }
          );
          const allProducts = response.data;
          const matchingProducts = allProducts.filter((product: any) =>
            result.some((item: any) => item.rule.produkRek === product.id)
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
    <div className="fixed top-0 left-0 w-full h-full py-10 px-6 flex items-center justify-center bg-gray-800 bg-opacity-0 overflow-y-auto">
      <div className="bg-white p-5 md:p-10 md:mx-10 mx-2 rounded-md max-h-full overflow-y-auto shadow-xl border-8">
        <div className="flex justify-start">
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-300 border-4 rounded-full"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
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
            <p className="flex justify-center text-center text-4xl font-bold text-orange-500 mb-8">
              HASIL DIAGNOSA KERUSAKAN SEPEDA MOTOR
            </p>
<<<<<<< HEAD
            <p className="flex justify-start text-xl text-black-900 mb-2">
              <span className="font-bold text-2xl">Keterangan : </span>
            </p>
            <p className="flex justify-start text-xl text-black-900 mb-5">
              Jika keluhan paling atas belum berhasil, maka terus coba diagnosa
              selanjutnya hingga berhasil
            </p>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">No.</th>
                  <th className="border border-gray-400 px-4 py-2">Gejala</th>
                  <th className="border border-gray-400 px-4 py-2">Diagnosa</th>
                  <th className="border border-gray-400 px-4 py-2">Akurasi</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Kemungkinan Lain
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Rekomendasi Produk
                  </th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {result.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="border border-gray-400 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {selectedIndications.join(", ")}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.rule.hasil}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <span className="flex justify-center font-bold">
                        {(item.similarity * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.similarity === 1
                        ?  
                        <span className="flex justify-center text-red-500">Tidak ada kemungkinan kerusakan lain</span>
                        : `Kemungkinan lain jika gejala yang dialami adalah ${item.rule.kondisi}. Maka akurasi menjadi 100% kerusakan pada ${item.rule.hasil}`}
                      {item.similarity !== 1 &&
                        matchingProducts.some(
                          (product) => product.id === item.rule.produkRek
                        ) && (
                          <span>
                            {" "}
                            dan kami memiliki rekomendasi produk seperti
                            disamping
                          </span>
                        )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {!matchingProducts.some(
                        (product) => product.id === item.rule.produkRek
                      ) ? (
                        <p className="flex justify-center text-center text-red-500">
                          Tidak ada rekomendasi produk dari kami untuk Anda
                        </p>
                      ) : (
                        matchingProducts
                          .filter(
                            (product: any) => product.id === item.rule.produkRek
                          )
                          .map((product: any) => (
                              <ProductCard key={product.id} data={product} />
                          ))
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <p><span className="font-bold">Disclaimer </span> : <span className="italic">data yang di buat diatas kami tidak bisa menjamin kebenarannya 100% karna keterbatasan pengetahuan yang dimiliki</span></p>
=======
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
>>>>>>> 9cbd440bd29c8f6108e1f2d99c9985eb1ba51de1
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
