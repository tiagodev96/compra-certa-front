import { useState } from "react";

interface Item {
  name: string;
  amount: string;
  value: string;
}

const useItems = (
  initialItems: Item[],
  updateItem: (index: number, item: Item) => void
) => {
  const [items, setItems] = useState(initialItems);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const [itemToEditIndex, setItemToEditIndex] = useState<number | null>(null);

  const handleAmountChange = (item: Item, index: number, delta: number) => {
    const newAmount = parseInt(item.amount, 10) + delta;
    if (newAmount === 0) {
      setOpenDeleteDialog(true);
      setItemToDelete(index);
    } else {
      const newItem = { ...item, amount: newAmount.toString() };
      updateItem(index, newItem);
    }
  };

  const handleDeleteClick = (index: number) => {
    setItemToDelete(index);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (item: Item, index: number) => {
    setItemToEdit(item);
    setItemToEditIndex(index);
    setOpenEditDialog(true);
  };

  return {
    items,
    openDeleteDialog,
    setOpenDeleteDialog,
    itemToDelete,
    openEditDialog,
    setOpenEditDialog,
    itemToEdit,
    handleAmountChange,
    handleDeleteClick,
    handleEditClick,
    itemToEditIndex,
  };
};

export default useItems;
