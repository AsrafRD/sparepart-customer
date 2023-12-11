import React, { useState, useEffect } from "react";
import axios from "axios";
import useCart from "@/hooks/use-cart";

interface GetCityProps {
  setSelectedShippingCost: React.Dispatch<React.SetStateAction<number | null>>;
  onProvinceChange: (province: string) => void;
  onCityChange: (city: string) => void;
  onServiceChange: (service: Data | null) => void;
}

interface City {
  city_id: string;
  type: string;
  province: string;
  city_name: string;
  province_id: string;
}

export interface Data {
  value: number;
  etd: string;
  note: string;
  dsc: string;
  srvce: string;
}

export interface Service {
  service: string;
  description: string;
  costs: Data[];
}

const GetOngkir: React.FC<GetCityProps> = ({
  setSelectedShippingCost,
  onProvinceChange,
  onCityChange,
  onServiceChange,
}) => {
  const [provincesData, setProvincesData] = useState<City[]>([]);
  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [ProvinceId, setProvinceId] = useState<string | null>(null);
  const [CityId, setCityId] = useState<string | null>(null);
  const [Province, setProvince] = useState("");
  const [City, setCity] = useState("");
  const [Courier, setCourier] = useState("");

  const [services, setServices] = useState<Service[]>([]);
  const [CourierSrvice, setCourierService] = useState("");
  const [costResult, setCostResult] = useState<any | null>(null);
  const origin = 249;

  const items = useCart((state) => state.items);

  useEffect(() => {
    const fetchProvincesData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/rajaOngkir/province`
        );
        const data = await response.json();
        setProvincesData(data.rajaongkir.results);
      } catch (error) {
        console.error("Error fetching provinces data:", error);
      }
    };

    fetchProvincesData();
  }, []);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceId = event.target.value;
    setProvinceId(provinceId);
    setProvince(event.target.value);

    onProvinceChange(event.target.value);

    const fetchCitiesData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/rajaOngkir/city`,
          {
            provinceId: provinceId,
          }
        );

        setCitiesData(response.data.rajaongkir.results);
      } catch (error) {
        console.error("Error fetching cities data:", error);
      }
    };

    fetchCitiesData();
  };

  const handleCitiesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    setCityId(cityId);
    setCity(event.target.value);

    onCityChange(event.target.value);
  };

  const handleCourierChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCourier = event.target.value;
    setCourier(selectedCourier);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/rajaOngkir/cost`,
        {
          origin: origin,
          destination: CityId,
          weight: totalweight,
          courier: selectedCourier,
        }
      );

      setCostResult(response.data);

      const resultServices: Service[] = response.data.rajaongkir.results.map(
        (courier: any) => {
          return {
            service: courier.code,
            description: courier.name,
            costs: courier.costs.map((cost: any) => {
              return {
                value: cost.cost[0].value,
                etd: cost.cost[0].etd,
                note: cost.cost[0].note,
                dsc: cost.description,
                srvce: cost.service,
              };
            }),
          };
        }
      );

      setServices(resultServices);
    } catch (error) {
      console.error("Error calculating cost:", error);
    }
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedService = event.target.value;
    setCourierService(selectedService);

    const selectedServiceData = services.find((service) =>
      service.costs.some((cost) => cost.srvce === selectedService)
    );
    
    if (selectedServiceData) {
      const selectedCost = selectedServiceData.costs.find(cost => cost.srvce === selectedService);
      if (selectedCost) {
        const selectedCostIndex = selectedServiceData.costs.findIndex(
          (cost) => cost.srvce === selectedService
        );
  
        if (selectedCostIndex !== -1) {
          const shippingCostValue = selectedServiceData.costs[selectedCostIndex].value;
  
          const totalPrice = items.reduce(
            (total: number, item: { price: any; quantity?: number }) => {
              return total + Number(item.price) * (item.quantity || 1);
            },
            0
          );
  
          let ongkir = shippingCostValue;
  
          if (totalPrice >= 100000) {
            ongkir = shippingCostValue * 0.5;
          }
  
          setSelectedShippingCost(ongkir);
          
        }
        onServiceChange(selectedCost)
        // console.log("selected cost", selectedCost)
      }
    }
  };

  const totalweight = items.reduce(
    (total: number, item: { weight: any; quantity?: number }) => {
      return total + Number(item.weight) * (item.quantity || 1);
    },
    0
  );


  return (
    <div>
      <div className="flex flex-col">

        <label>Pilih Provinsi</label>
        <select
          value={Province}
          onChange={handleProvinceChange}
          className="border-2 mb-2 mt-1 py-1 px-2 rounded-md"
        >
          -- Pilih Provinsi --
          <option value="" disabled>
            -- Pilih Provinsi --
          </option>
          {provincesData.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province}
            </option>
          ))}
        </select>

        <label>Pilih Kota</label>
        <select
          value={City}
          onChange={handleCitiesChange}
          className="border-2 mb-2 mt-1 py-1 px-2 rounded-md"
        >
          <option value="" disabled>
            -- Pilih Kota --
          </option>
          {citiesData.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.type} - {city.city_name}
            </option>
          ))}
        </select>

        <label>Pilih Kurir</label>
        <select
          value={Courier}
          onChange={handleCourierChange}
          className="border-2 mb-2 mt-1 py-1 px-2 rounded-md"
        >
          <option value="" disabled>
            -- Pilih Kurir --
          </option>
          <option value="jne">JNE</option>
          <option value="tiki">TIKI</option>
        </select>

        <label>Pilih Layanan</label>
        <select
          value={CourierSrvice}
          onChange={handleServiceChange}
          className="border-2 mb-2 mt-1 py-1 px-2 rounded-md"
        >
          <option value="" disabled>
            -- Pilih Layanan --
          </option>
          {services.map((service) => (
            <optgroup key={service.service} label={service.description}>
              {service.costs.map((cost, index) => (
                <option key={`${service.service}-${index}`} value={cost.srvce}>
                  {`${cost.srvce} (${cost.dsc}) - ${cost.etd} hari - Biaya: ${cost.value} IDR`}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GetOngkir;
