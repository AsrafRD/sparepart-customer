"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

interface FormData {
  orderId: string;
}

const OrderCheckPage: React.FC = () => {
  const params = useParams();
  const [formData, setFormData] = useState<FormData>({
    orderId: "",
  });
  const [data, setData] = useState<any>({});

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};

    if (!formData.orderId) {
      errors.orderId = "Form wajib diisi";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          order_id: formData.orderId,
        }
      );
      // const data = await response.json();

      // Update state order with the data received
      setData(response.data);

      // Check if 'isPaid' property is present and is a boolean
      if (data.hasOwnProperty("isPaid") && typeof data.isPaid === "boolean") {
        setOrderStatus(data.isPaid);
      } else {
        // If 'isPaid' is not present or not a boolean, assume the order is not paid
        setOrderStatus(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setOrderStatus = (isPaid: boolean) => {
    // Dapatkan elemen status pesanan
    const statusElement = document.getElementById("orderStatus");

    if (statusElement) {
      // Perbarui teks status pesanan sesuai dengan nilai isPaid
      statusElement.innerText = isPaid ? "Selesai Diantar" : "Belum Diantar";
    }
  };

  return (
    <div className="h-full p-6 mt-2 flex flex-col justify-center items-center">
      <div>
        <form onSubmit={handleCheckout}>
          <label>Masukkan id pesanan anda</label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            placeholder="Contoh : df5f3747-25da-4d58-ac3f-a5ce54a71567"
            value={formData.orderId}
            onChange={handleChange}
            className="px-4 py-2 border-2 mt-2 mb-4 w-full"
          />

          <Button type="submit" className="w-full">
            Cek pesanan
          </Button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center my-6 mb-4">
        <p>Status Pembayaranmu</p>
        <div
          id="orderStatus"
          className={`mt-2 w-full px-4 h-10 border ${
            data.isPaid ? "bg-green-400" : "bg-orange-400"
          } flex justify-center items-center text-xl font-semibold text-white rounded-md shadow-xl mb-5`}
        >
          {formData.orderId // Menampilkan isPaid hanya jika orderId sudah dimasukkan
            ? data.isPaid
              ? "Sudah dibayar"
              : "Belum dibayar"
            : // Jika orderId belum dimasukkan, tampilkan pesan kosong
              "Pembayarnmu"}
        </div>
        <p>Nomor Resi Anda</p>
        <div
          id="orderStatus"
          className={`mt-2 w-full px-4 h-10 border ${
            data.isPaid ? "bg-green-400" : "bg-orange-400"
          } flex justify-center items-center text-xl font-semibold text-white rounded-md shadow-xl mb-5`}
        >
          {formData.orderId // Menampilkan isPaid hanya jika orderId sudah dimasukkan
            ? data.orders && data.orders.shippingCode !== undefined // Memeriksa keberadaan dan nilai dari data.orders.statusOrder
              ? data.orders.shippingCode == 0
                ? "Nomor resi belum tersedia"
                : `${data.orders.shippingCode}`
              : "Ini nomor Resi Kamu"
            : "Ini nomor Resi Kamu"}
        </div>
        <p>Status Pesanan Anda</p>
        <div
          id="orderStatus"
          className={`mt-2 w-full px-4 h-10 border ${
            data.isPaid ? "bg-green-400" : "bg-orange-400"
          } flex justify-center items-center text-xl font-semibold text-white rounded-md shadow-xl mb-5`}
        >
          {formData.orderId // Menampilkan isPaid hanya jika orderId sudah dimasukkan
            ? data.orders && data.orders.statusOrder !== undefined // Memeriksa keberadaan dan nilai dari data.orders.statusOrder
              ? data.orders.statusOrder == 0
                ? "Barangmu belum diserahkan ke Kurir"
                : `${data.orders.statusOrder}`
              : "Ini status Pesananmu"
            : "Ini status Pesananmu"}
        </div>
      </div>

      <div className="flex flex-col mt-8 text-gray-600">
        <h1>Petunjuk untuk mendapat id pesanan online yang dikirm menggunakan kurir :</h1>

        <div>
          <table>
            <tbody>
              <tr>
                <td>1.</td>
                <td>Buka email anda</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "top" }}>2.</td>
                <td>
                  Cek balasan email dari kami (Rozic Sparepart) atas konfirmasi
                  pembayaran anda
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>Copy id transaksi anda</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckPage;
