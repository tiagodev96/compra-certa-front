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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2 } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setAmount(item.amount.toString());
      setPrice(item.value.toString());
    }
  }, [item]);

  const handleSubmit = () => {
    let formattedName = name.trim();
    let formattedAmount = parseInt(amount);
    let formattedPrice = parseFloat(price);

    if (formattedName && formattedAmount && formattedPrice) {
      updateItem({
        name: formattedName,
        amount: formattedAmount,
        value: formattedPrice,
      });
    }

    setOpen(false);
  };

  const renderInput = (
    id: string,
    value: string,
    setValue: (value: string) => void,
    label: string,
    type: string = "text",
  ) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="col-span-3"
        required
      />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] max-w-[425px] min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Editar item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {renderInput("name", name, setName, "Nome")}
          {renderInput("amount", amount, setAmount, "Quantidade", "number")}
          {renderInput("price", price, setPrice, "Preço", "number")}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
