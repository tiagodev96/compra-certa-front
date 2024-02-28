"use client";
import { Item } from "@/app/(main)/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ItemInput } from "./ItemInput";
import { useState } from "react";
import { useDialogsStore, useItemsStore } from "@/store";
import { validateInputs } from "./utils";

type NewItemProps = {
  id: string;
  name: string;
  amount: string;
  value: string;
};

export function ItemDialog() {
  const [open, setOpenAddDialog] = useDialogsStore((state) => [
    state.openAddDialog,
    state.setOpenAddDialog,
  ]);

  const [addItem] = useItemsStore((state) => [state.addItem]);

  const initialItem = {
    id: "",
    name: "",
    amount: "",
    value: "",
  };

  const [newItem, setNewItem] = useState<NewItemProps>(initialItem);

  const [errors, setErrors] = useState<Partial<NewItemProps>>({});

  const handleInputChange =
    (id: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let updatedItem = { ...newItem };
      if (id === "amount") {
        if (/^\d*$/.test(value)) {
          updatedItem[id] = value;
        }
      } else if (id === "value") {
        if (/^\d*\.?\d{0,2}$/.test(value)) {
          updatedItem[id] = value;
        }
      } else {
        updatedItem[id] = value;
      }
      setNewItem(updatedItem);
    };

  const handleSubmit = () => {
    let errors = validateInputs(newItem);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (addItem) {
        const id = Math.random().toString(36).substr(2, 9);
        const itemWithId = { ...newItem, id };

        addItem(itemWithId);
        setOpenAddDialog(false);
      }

      setNewItem({ id: "", name: "", amount: "", value: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpenAddDialog}>
      <DialogContent
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
        className="w-[90%] max-w-[425px] min-w-[300px]"
      >
        <DialogHeader>
          <DialogTitle className="text-neutral-950 dark:text-neutral-50">
            Adicione um novo item
          </DialogTitle>
          <DialogDescription className="text-neutral-500">
            Você poderá remover o item ou alterar as quantidades e valores a
            qualquer momento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ItemInput
            id="name"
            label="Nome"
            inputMode="text"
            value={newItem.name as string}
            onChange={handleInputChange}
            error={errors.name}
          />
          <ItemInput
            id="amount"
            label="Quantidade"
            type="number"
            inputMode="numeric"
            value={String(newItem.amount)}
            onChange={handleInputChange}
            error={errors.amount}
          />
          <ItemInput
            id="value"
            label="Preço"
            type="number"
            inputMode="decimal"
            value={String(newItem.value)}
            onChange={handleInputChange}
            error={errors.value}
          />
        </div>
        <DialogFooter>
          <Button className="border-[1px]" onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
