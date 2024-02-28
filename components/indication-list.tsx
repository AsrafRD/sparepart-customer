"use client";

import React, { useState } from "react";
import { Indication } from "@/types";
import NoResults from "@/components/ui/no-results";
import { Button } from "./ui/button";
import ResultModal from "./ResultModal";
import axios from "axios";

interface ProductListProps {
  title: string;
  items: Indication[];
}

const IndicationList: React.FC<ProductListProps> = ({ title, items }) => {
  const [selectedIndications, setSelectedIndications] = useState<string[]>([]);

  const [result, setResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckboxChange = (indicationId: string) => {
    setSelectedIndications((prevSelected) => {
      if (prevSelected.includes(indicationId)) {
        // If already selected, remove it
        return prevSelected.filter((id) => id !== indicationId);
      } else {
        // If not selected, add it
        return [...prevSelected, indicationId];
      }
    });
  };

  const handleCheckNowClickOld = async (e: any) => {
    e.preventDefault();
    try {
      // Send selected indications to the server using Axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ceknow`,
        {
          selectedIndications,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // const hasil = response.data?.mostSimilarRule?.hasil;
      const hasilArray = response.data?.hasil;
      const matchingProductIdsArray = response.data?.matchingProductIDs;

      if (hasilArray.length > 0) {
        const hasilStrings = hasilArray.map((item: any) => ({
          rule: item.rule,
          similarity: item.similarity,
          intersection: item.intersection,
          union: item.union,
          matchingProductIDs: matchingProductIdsArray,
          // Add other properties from the 'item' if needed
        }));
        // Gabungkan hasil menjadi satu string jika diperlukan
        // const hasil = hasilStrings.join("\n");

        // Set the result in the state
        console.log("hasil string", hasilStrings);
        setResult(hasilStrings);
      } else {
        setErrorMessage(hasilArray);
      }
    } catch (error) {
      console.error("Error sending indications to the server:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseModal = () => {
    setResult(null);
    setErrorMessage(null);
  };

  // console.log("result nya ni", result)

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <h3 className="font-bold md:text-3xl">{title}</h3>
        {items.length === 0 && <NoResults />}
        <div className="font-medium md:text-xl">
          Pilih beberapa kondisi kendaraan anda
        </div>
      </div>
      <form className="md:grid md:grid-cols-2">
        {items.map((item) => (
          <div className="space-x-1" key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              checked={selectedIndications.includes(item.name)}
              onChange={() => handleCheckboxChange(item.name)}
              className="w-4 h-4"
            />
            <label htmlFor={item.id}>{item.name}</label>
          </div>
        ))}
        <div className="flex justify-center col-span-2 mt-5">
          <Button className="w-full md:w-auto" onClick={handleCheckNowClickOld}>
            Cek Sekarang
          </Button>
        </div>
      </form>

      {loading && <div>Loading...</div>}

      {result !== null && (
        <ResultModal
          result={result}
          errorMessage={errorMessage}
          onClose={handleCloseModal}
          selectedIndications={selectedIndications} // Teruskan selectedIndications sebagai prop
        />
      )}

      {errorMessage !== null && (
        <ResultModal
          result={result}
          errorMessage={errorMessage}
          onClose={handleCloseModal}
          selectedIndications={selectedIndications} // Teruskan selectedIndications sebagai prop
        />
      )}
    </div>
  );
};

export default IndicationList;
