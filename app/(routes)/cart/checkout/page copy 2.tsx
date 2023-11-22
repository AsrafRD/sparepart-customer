// "use client";

// declare global {
//   interface Window {
//     snap: {
//       pay: (
//         token: string,
//         config: {
//           onSuccess: (result: any) => void;
//           onPending: (result: any) => void;
//           onError: (result: any) => void;
//           onClose: () => void;
//         }
//       ) => void;
//     };
//   }
// }

// import axios from "axios";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Currency from "@/components/ui/currency";
// import useCart from "@/hooks/use-cart";
// import { Button } from "@/components/ui/button";
// import CartItem from "../components/cart-item";

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
// }

// const CheckoutPage: React.FC = () => {
//   const items = useCart((state) => state.items);
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const errors: Partial<FormData> = {};

//     if (!formData.name) {
//       errors.name = "Nama wajib diisi";
//     }
//     if (!formData.email) {
//       errors.email = "Email wajib diisi";
//     }
//     if (!formData.phone) {
//       errors.phone = "Nomor telepon wajib diisi";
//     }
//     if (!formData.address) {
//       errors.address = "Alamat wajib diisi";
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const handleCheckout = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (validateForm()) {
//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
//           {
//             productIds: items.map((item) => item.id),
//             formData,
//           }
//         );
  
//         // Instead of redirecting, open Snap payment popup
//         const { snapToken, orderId, successUrl, cancelUrl } = response.data;
  
//         if (window.snap && snapToken) {
//           window.snap.pay(snapToken, {
//             onSuccess: function (result) {
//               // Handle successful payment if needed
//               console.log("Payment successful:", result);
//               window.location.href = successUrl;
//             },
//             onPending: function (result) {
//               // Handle pending payment if needed
//               console.log("Payment pending:", result);
//               window.location.href = successUrl; // You may want to handle pending differently
//             },
//             onError: function (result) {
//               // Handle payment error if needed
//               console.error("Payment error:", result);
//               window.location.href = cancelUrl;
//             },
//             onClose: function () {
//               // Handle closure of the Snap popup
//               // You can redirect or perform other actions here if needed
//               // For example, redirect to /cart/checkout
//               window.location.href = "/cart/checkout";
//             },
//           });
//         } else {
//           console.log("error nya disini ternyata")
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
  

//   const totalPrice = items.reduce((total, item) => {
//     return total + Number(item.price);
//   }, 0);

//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div className="px-6">
//       <form
//         onSubmit={handleCheckout}
//         className="md:grid md:grid-cols-3 md:gap-6"
//       >
//         <div className="md:col-span-1">
//           <h1 className="flex justify-center font-bold mb-6 pt-4">
//             Lengkapi Data Untuk Checkout
//           </h1>
//           <div className="flex flex-col">
//             <label htmlFor="name">Nama</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border-2 mb-2 mt-1 py-1 px-2"
//               required
//             />
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               className="border-2 mb-2 mt-1 py-1 px-2"
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="phone">Phone</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               className="border-2 mb-2 mt-1 py-1 px-2"
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="address">Address</label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.address}
//               className="border-2 mb-2 mt-1 py-1 px-2"
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div className="md:col-span-1">
//           <div>
//             <ul>
//               {items.map((item) => (
//                 <div key={item.id}>
//                   <CartItem data={item} />
//                 </div>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="md:col-span-1">
//           <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
//             <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
//             <div className="mt-6 space-y-4">
//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <div className="text-base font-medium text-gray-900">
//                   Order total
//                 </div>
//                 <Currency value={totalPrice} />
//               </div>
//             </div>
//           </div>
//           <Button
//             type="submit"
//             disabled={items.length === 0}
//             className="w-full mt-6"
//           >
//             Checkout
//           </Button>
//           <Link href="/cart">Back to Cart/Kembali ke Keranjang</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CheckoutPage;
