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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

interface ItemDialogProps {
  addItem: (item: Item) => void;
}

export function ItemDialog({ addItem }: ItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    let formattedName = name.trim();
    let formattedAmount = parseInt(amount);
    let formattedPrice = parseFloat(price);

    if (formattedName && formattedAmount && formattedPrice) {
      addItem({
        name: formattedName,
        amount: formattedAmount,
        value: formattedPrice,
      });
      setName("");
      setAmount("");
      setPrice("");
    }

    setOpen(false);
  };

  const renderDialogTrigger = () => (
    <DialogTrigger asChild>
      <Button
        variant="ghost"
        className="bg-green-400 hover:bg-green-200 hover:border-green-400 border-[1px] flex flex-row items-center gap-x-2"
      >
        Adicionar Item <Plus size={18} />
      </Button>
    </DialogTrigger>
  );

  const renderDialogContent = () => (
    <DialogContent className="w-[90%] max-w-[425px] min-w-[300px]">
      <DialogHeader>
        <DialogTitle>Adicione um novo item</DialogTitle>
        <DialogDescription>
          Você poderá remover o item ou alterar as quantidades e valores a
          qualquer momento.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {renderInput("name", name, setName, "Nome")}
        {renderInput("amount", amount, setAmount, "Quantidade", "number")}
        {renderInput("price", price, setPrice, "Preço", "number")}
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleSubmit}>
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  );

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
      {renderDialogTrigger()}
      {renderDialogContent()}
    </Dialog>
  );
}
