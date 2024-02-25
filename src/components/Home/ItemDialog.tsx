"use client";
import { Item } from "@/app/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useItemDialog } from "@/hooks/useItemDialog";
import { ItemInput } from "./ItemInput";

interface ItemDialogProps {
  addItem: (item: Item) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ItemDialog({ addItem, open, setOpen }: ItemDialogProps) {
  const { newItem, handleSubmit, handleInputChange, errors } = useItemDialog({
    addItem,
    setOpen,
    item: null,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] max-w-[425px] min-w-[300px]">
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
