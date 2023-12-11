"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import ItemInfo from "../components/item-info";
import GetOngkir from "@/components/ui/rajaOngkir";
import { Data } from "@/components/ui/rajaOngkir";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  [key: string]: string; // Index signature
}

const CheckoutPage: React.FC = () => {
  const items = useCart((state) => state.items);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedServiceData, setSelectedServiceData] = useState<Data | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFormFields = (): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.name) {
      errors.name = "Nama wajib diisi";
    }
    if (!formData.email) {
      errors.email = "Email wajib diisi";
    }
    if (!formData.phone) {
      errors.phone = "Nomor telepon wajib diisi";
    }
    if (!formData.address) {
      errors.address = "Alamat wajib diisi";
    }

    return errors;
  };

  const validateFieldOrder = (): boolean => {
    const fieldOrder = ["province", "city", "courier", "service"];

    const currentIndex = fieldOrder.indexOf("province");
    for (let i = currentIndex + 1; i < fieldOrder.length; i++) {
      const fieldName = fieldOrder[i];
      const fieldValue = fieldName === "province"
        ? selectedProvince
        : fieldName === "city"
        ? selectedCity
        : fieldName === "courier"
        // ? courierValue // replace with actual value
        // : fieldName === "service"
        // ? serviceValue // replace with actual value
        // : "";

      if (!fieldValue) {
        alert(`Please fill in the ${fieldName} field.`);
        return false;
      }
    }

    return true;
  };

  // Combined validation function
  const validateForm = (): boolean => {
    const formFieldErrors = validateFormFields();
    setFormErrors(formFieldErrors);

    if (Object.keys(formFieldErrors).length > 0) {
      return false;
    }

    return validateFieldOrder();
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
          {
            productIds: items.map((item) => item.id),
            selectedShippingCost,
            items,
            formData,
            selectedProvince,
            selectedCity,
            selectedServiceData,
          }
        );
        window.location = response.data.url;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const totalPrice = items.reduce(
    (total: number, item: { price: any; quantity?: number }) => {
      return total + Number(item.price) * (item.quantity || 1);
    },
    0
  );

  const [selectedShippingCost, setSelectedShippingCost] = useState<
    number | null
  >(null);
  const [totalPriceWithShipping, setTotalPriceWithShipping] =
    useState<number>(totalPrice);

  useEffect(() => {
    // console.log("selectedShippingCost changed:", selectedShippingCost);
    setTotalPriceWithShipping(totalPrice + (selectedShippingCost || 0));
  }, [totalPrice, selectedShippingCost]);

  const [isMounted, setIsMounted] = useState(false);

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleServiceChange = (serviceData: Data | null) => {
    setSelectedServiceData(serviceData);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="px-6">
      <form
        onSubmit={handleCheckout}
        className="md:grid md:grid-cols-3 md:gap-6"
      >
        <div className="md:col-span-1">
          <div className="flex flex-col">
            <h1 className="font-bold mb-6 pt-4">
              Lengkapi Data Untuk Checkout
            </h1>
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-2 mb-2 mt-1 py-1 px-2 rounded-md"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className="border-2 mb-2 mt-1 py-1 px-2 rounded-md"
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Nomor Whatsapp</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              className="border-2 mb-2 mt-1 py-1 px-2 rounded-md"
              onChange={handleChange}
              required
            />
            <label htmlFor="address">Alamat</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              className="border-2 mb-2 mt-1 py-1 px-2 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <h1 className="font-bold mb-6 pt-4">Pilih Lokasi Pengiriman</h1>
          <GetOngkir
            setSelectedShippingCost={setSelectedShippingCost}
            onProvinceChange={handleProvinceChange}
            onCityChange={handleCityChange}
            onServiceChange={handleServiceChange}
          />
        </div>

        <div className="md:col-span-1 mb-6 pt-4">
          <ul>
            {items.map((item) => (
              <div key={item.id}>
                <ItemInfo data={item} />
              </div>
            ))}
          </ul>
          <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Order total (Termasuk Ongkir)
                </div>
                <Currency value={totalPriceWithShipping} />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={items.length === 0}
            className="w-full mt-6"
          >
            Checkout
          </Button>
          <Link href="/cart">Back to Cart/Kembali ke Keranjang</Link>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
