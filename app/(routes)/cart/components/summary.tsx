"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const router =useRouter();

  useEffect(() => {
    if (searchParams.get('settlement')) {
      toast.success('Payment completed.');
      removeAll();
    }
    if (searchParams.get('pending')) {
      toast.error('Payment belum dibayar.');
    }
    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }

  }, [searchParams, removeAll]);

  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(items));
    router.push('/cart/checkout');
  };
 
  const totalPrice = items.reduce((total: number, item: { price: any; quantity?: number }) => {
    return total + Number(item.price) * (item.quantity || 1);
  }, 0);
  
  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice || 0} />
        </div>
      </div>
      <Button onClick={handleCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}
 
export default Summary;
