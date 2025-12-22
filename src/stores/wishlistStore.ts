import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: number | string;
  slug: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number | string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: number | string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item) => {
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) {
            return state;
          }
          return { items: [...state.items, item] };
        });
      },

      removeFromWishlist: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      toggleWishlist: (item) => {
        const { items, addToWishlist, removeFromWishlist } = get();
        if (items.some((i) => i.id === item.id)) {
          removeFromWishlist(item.id);
        } else {
          addToWishlist(item);
        }
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);

// Selectors
export const useWishlistItems = () => useWishlistStore((state) => state.items);
export const useWishlistTotal = () => useWishlistStore((state) => state.items.length);
