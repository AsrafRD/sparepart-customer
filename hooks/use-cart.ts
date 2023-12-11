// store `useCart`
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product, quantity: number) => void;
  increaseItem: (id: string) => void,
  decreaseItem: (id: string) => void,
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product, quantity: number = 1) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        // Jika item sudah ada, update jumlahnya
        existingItem.quantity = (existingItem.quantity || 1) + quantity;
        set({ items: [...currentItems] });
        toast.success('Keranjang diperbarui.');
      } else {
        // Jika item belum ada, tambahkan ke keranjang
        set({ items: [...currentItems, { ...data, quantity: quantity }] });
        toast.success('Item ditambahkan ke keranjang.');
      }
    },

    increaseItem: (id: string) => {
      const currentItems = get().items;
      const updatedItems = currentItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: (item.quantity || 1) + 1,
          };
        }
        return item;
      });
    
      set({ items: updatedItems });
      toast.success('Jumlah item ditambah.');
    },

    decreaseItem: (id: string) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          set({ items: [...currentItems] });
          toast.success('Jumlah item dikurangi.');
        } else {
          // Jika jumlah item kurang dari atau sama dengan 1, hapus dari keranjang
          set({ items: [...currentItems.filter((item) => item.id !== id)] });
          toast.success('Item dihapus dari keranjang.');
        }
      }
    },

    removeItem: (id: string) => {
      // Ganti window.confirm dengan modal atau komponen konfirmasi yang lebih stylish
      const shouldRemove = confirmModal('Apakah Anda yakin ingin menghapus item dari keranjang?');

      if (shouldRemove) {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success('Item dihapus dari keranjang.');
      } else {
        toast.error('Penghapusan item dibatalkan.');
      }
    },
    removeAll: () => set({ items: [] }),
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  })
);

// Fungsi untuk menampilkan modal konfirmasi dengan Tailwind CSS
const confirmModal = (message: string): boolean => {
  // Tampilkan modal sesuai preferensi styling Anda
  return window.confirm(message);
};

export default useCart;
