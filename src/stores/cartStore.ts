import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
}

// Parse price string to number (e.g., "1.380.000đ" -> 1380000)
const parsePrice = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[^\d]/g, ""), 10) || 0;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.id === item.id && i.selectedColor === item.selectedColor
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated };
          }

          return { items: [...state.items, { ...item, quantity }] };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

// Selectors
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotal = () =>
  useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
export const useCartTotalPrice = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)
  );
