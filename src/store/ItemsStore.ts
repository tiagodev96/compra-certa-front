import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  amount: string;
  value: string;
};

type Store = {
  items: Item[];

  totalValueSum: () => number;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  removeItem: (item: Item) => void;
};

export const useItemsStore = create<Store>((set, get) => ({
  items: [],

  totalValueSum: () => {
    const items = get().items;
    return items.reduce(
      (acc, item) =>
        acc +
        parseFloat(item.value.replace(",", ".")) * parseInt(item.amount, 10),
      0
    );
  },
  addItem: (item: Item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (item: Item) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === item.id ? item : i)),
    })),
  removeItem: (item: Item) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== item.id),
    })),
}));
