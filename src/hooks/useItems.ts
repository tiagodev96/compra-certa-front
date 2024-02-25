import { useState } from "react";

interface Item {
  id: string;
  name: string;
  amount: string;
  value: string;
}

interface UseItemsProps {
  initialItems: Item[];
  setOpenDeleteDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}

const useItems = (initialItems: UseItemsProps) => {
  const [items, setItems] = useState(initialItems);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const [itemToEditIndex, setItemToEditIndex] = useState<number | null>(null);

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (item: Item) => {
    setItemToEdit(item);
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
    handleDeleteClick,
    handleEditClick,
    itemToEditIndex,
  };
};

export default useItems;
