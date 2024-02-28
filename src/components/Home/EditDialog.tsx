"use client";
import { Item } from "@/app/(main)/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ItemInput } from "./ItemInput";
import { Trash } from "lucide-react";
import { useDialogsStore, useItemsStore } from "@/store";
import { useEffect, useState } from "react";
import { validateInputs } from "./utils";

type ItemErrors = {
  name?: string | undefined;
  amount?: string | undefined;
  value?: string | undefined;
};

export function EditDialog() {
  // * Stores
  const [
    openEditDialog,
    setOpenEditDialog,
    setOpenDeleteDialog,
    itemToEdit,
    setItemToEdit,
    setItemToDelete,
  ] = useDialogsStore((state) => [
    state.openEditDialog,
    state.setOpenEditDialog,
    state.setOpenDeleteDialog,
    state.itemToEdit,
    state.setItemToEdit,
    state.setItemToDelete,
  ]);

  const [updateItem] = useItemsStore((state) => [state.updateItem]);

  // * States
  const [errors, setErrors] = useState({ name: "", amount: "", value: "" });

  useEffect(() => {
    setErrors({ name: "", amount: "", value: "" });
  }, [openEditDialog]);

  // * Handlers
  const handleSubmit = () => {
    let errors: ItemErrors = validateInputs(itemToEdit as Item);
    setErrors({
      name: errors.name || "",
      amount: errors.amount || "",
      value: errors.value || "",
    });

    if (Object.keys(errors).length <= 0) {
      updateItem(itemToEdit as Item);
      setOpenEditDialog(false);
    }
  };

  const handleInputChange =
    (id: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let updatedItem: Partial<Item> = { ...itemToEdit };
      if (id === "amount") {
        if (/^\d*$/.test(value)) {
          updatedItem[id] = value;
        }
      } else if (id === "value") {
        if (/^\d*\.?\d{0,2}$/.test(value)) {
          updatedItem[id] = value;
        }
      } else if (id === "name") {
        updatedItem[id] = value;
      }
      setItemToEdit(updatedItem as Item);
    };

  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
        className="w-[90%] max-w-[425px] min-w-[300px]"
      >
        <DialogHeader>
          <DialogTitle className="text-neutral-950 dark:text-neutral-50">
            Editar item
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ItemInput
            id="name"
            label="Nome"
            inputMode="text"
            value={itemToEdit?.name ?? ""}
            onChange={handleInputChange}
            error={errors.name}
          />
          <ItemInput
            id="amount"
            label="Quantidade"
            type="number"
            inputMode="numeric"
            value={itemToEdit?.amount ?? ""}
            onChange={handleInputChange}
            error={errors.amount}
          />
          <ItemInput
            id="value"
            label="Preço"
            type="number"
            inputMode="decimal"
            value={itemToEdit?.value ?? ""}
            onChange={handleInputChange}
            error={errors.value}
          />
        </div>
        <DialogFooter>
          <Button className="border-[1px]" onClick={handleSubmit}>
            Salvar
          </Button>
          <Button
            id={itemToEdit?.id}
            className="flex items-center bg-red-500 hover:border-red-500 border-[1px] group"
            onClick={() => {
              setOpenEditDialog(false);
              setOpenDeleteDialog(true);
              setItemToDelete(itemToEdit as Item);
            }}
          >
            <Trash
              className="cursor-pointer text-neutral-950 dark:text-neutral-50 group-hover:text-red-500 transition-all"
              size={20}
              strokeWidth={2}
            />
            <span className="ml-2 text-neutral-950 dark:text-neutral-50 group-hover:text-red-500">
              Apagar
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
