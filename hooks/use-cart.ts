// store `useCart`
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  clearCart: () => void; // Fungsi baru untuk membersihkan keranjang
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);
      
      if (existingItem) {
        return toast.success('Keranjang diperbarui.');
      }

      set({ items: [...get().items, data] });
      toast.success('Item ditambahkan ke keranjang.');
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success('Item dihapus dari keranjang.');
    },
    removeAll: () => set({ items: [] }),
    clearCart: () => set({ items: [] }), // Fungsi untuk membersihkan keranjang
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
);

export default useCart;
