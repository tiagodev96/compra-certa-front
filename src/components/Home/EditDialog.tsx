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

interface EditDialogProps {
  item: Item | null;
  updateItem: (item: Item) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function EditDialog({
  item,
  updateItem,
  open,
  setOpen,
}: EditDialogProps) {
  const { newItem, handleSubmit, handleInputChange, errors } = useItemDialog({
    updateItem,
    setOpen,
    item,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] max-w-[425px] min-w-[300px]">
        <DialogHeader>
          <DialogTitle className="text-neutral-900 dark:text-neutral-100">
            Editar item
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ItemInput
            id="name"
            label="Nome"
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
