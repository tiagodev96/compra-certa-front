"use client";
import { Item } from "@/app/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useItemDialog } from "@/hooks/useItemDialog";
import { ItemInput } from "./ItemInput";
import { Trash } from "lucide-react";
import useItems from "@/hooks/useItems";

interface EditDialogProps {
  item: Item | null;
  updateItem: (item: Item) => void;
  deleteItem: (item: Item) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function EditDialog({
  item,
  updateItem,
  deleteItem,
  open,
  setOpen,
}: EditDialogProps) {
  const { newItem, handleSubmit, handleInputChange, errors } = useItemDialog({
    updateItem,
    deleteItem,
    setOpen,
    item,
  });

  const { handleDeleteClick } = useItems({
    initialItems: [],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] max-w-[425px] min-w-[300px]">
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
            value={newItem.name as string}
            onChange={handleInputChange}
            error={errors.name}
          />
          <ItemInput
            id="amount"
            label="Quantidade"
            type="number"
            inputMode="numeric"
            value={newItem.amount}
            onChange={handleInputChange}
            error={errors.amount}
          />
          <ItemInput
            id="value"
            label="Preço"
            type="number"
            inputMode="decimal"
            value={newItem.value}
            onChange={handleInputChange}
            error={errors.value}
          />
        </div>
        <DialogFooter>
          <Button className="border-[1px]" onClick={handleSubmit}>
            Salvar
          </Button>
          <Button
            id={newItem.id}
            className="flex items-center bg-red-500 hover:border-red-500 border-[1px] group"
            onClick={() => {
              handleDeleteClick(newItem.id);
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
