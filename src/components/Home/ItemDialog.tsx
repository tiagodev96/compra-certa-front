// ItemDialog.tsx
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useItemDialog } from "@/hooks/useItemDialog";
import { Show } from "..";

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

  const renderInput = (
    id: keyof Item,
    label: string,
    type: string = "text",
    inputMode: "text" | "numeric" | "decimal" = "text"
  ) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={newItem[id] as string}
        inputMode={inputMode}
        onChange={handleInputChange(id)}
        className={`col-span-3 text-lg ${errors[id] ? "border-red-500" : ""}`}
        required
        maxLength={id === "name" ? 25 : undefined}
      />
      <Show>
        <Show.When isTrue={!!errors}>
          <p className="text-xs text-red-500 col-span-4 text-right mb-3 -mt-3">
            {errors[id]}
          </p>
        </Show.When>
      </Show>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] max-w-[425px] min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Adicione um novo item</DialogTitle>
          <DialogDescription>
            Você poderá remover o item ou alterar as quantidades e valores a
            qualquer momento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {renderInput("name", "Nome")}
          {renderInput("amount", "Quantidade", "number", "numeric")}
          {renderInput("value", "Preço", "number", "decimal")}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
