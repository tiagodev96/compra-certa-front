import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  amount: string;
  value: string;
};

type DialogsStoreProps = {
  openAddDialog: boolean;
  openEditDialog: boolean;
  openDeleteDialog: boolean;
  itemToEdit: Item | null;
  itemToDelete: Item | null;

  setOpenAddDialog: (open: boolean) => void;
  setOpenEditDialog: (open: boolean, item?: Item) => void;
  setOpenDeleteDialog: (open: boolean, item?: Item) => void;
  setItemToEdit: (item: Item) => void;
  setItemToDelete: (item: Item) => void;
};

export const useDialogsStore = create<DialogsStoreProps>((set) => ({
  openAddDialog: false,
  openEditDialog: false,
  openDeleteDialog: false,
  itemToEdit: null,
  itemToDelete: null,

  setOpenAddDialog: (open: boolean) => set({ openAddDialog: open }),
  setOpenEditDialog: (open: boolean, item: Item | null = null) =>
    set({ openEditDialog: open, itemToEdit: item }),
  setOpenDeleteDialog: (open: boolean, item: Item | null = null) =>
    set({ openDeleteDialog: open, itemToDelete: item }),
  setItemToEdit: (item: Item) => set({ itemToEdit: item }),
  setItemToDelete: (item: Item) => set({ itemToDelete: item }),
}));
