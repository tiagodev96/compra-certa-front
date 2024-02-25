"use client";
import { ItemDialog, ItemsTable } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { useState } from "react";

export interface Item {
  name: string;
  amount: string;
  value: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddItem = (item: Item) => {
    setItems((prev) => [...prev, item]);
    setOpen(false);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    const itemName = items[index].name;
    const itemFormatted = itemName.charAt(0).toUpperCase() + itemName.slice(1);

    toast({
      description: `${itemFormatted} removido com sucesso!`,
      variant: "success",
      duration: 2000,
    });
  };

  const handleUpdateItem = (index: number, newItem: Item) => {
    setItems((prev) => prev.map((item, i) => (i === index ? newItem : item)));
  };

  const calculateTotalValueSum = (items: Item[]) => {
    return items.reduce(
      (acc, item) =>
        acc +
        parseFloat(item.value.replace(",", ".")) * parseInt(item.amount, 10),
      0
    );
  };

  const formatCurrencyValue = (value: number | string) => {
    if (typeof value === "string") {
      value = parseFloat(value.replace(",", "."));
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const totalValueSum = calculateTotalValueSum(items);

  return (
    <main className="bg-white dark:bg-neutral-900 min-h-screen">
      <div className="sectionContainer">
        <div className="flex justify-between items-center mb-5">
          <Card>
            <CardContent className="p-2 bg-primary text-neutral-900 rounded-md flex flex-row gap-x-2 justify-center items-center">
              <h2 className="text-sm font-bold">Total</h2>
              <p className="text-sm font-bold">
                {formatCurrencyValue(totalValueSum)}
              </p>
            </CardContent>
          </Card>
          <Button
            className="hidden sm:flex border-[1px] flex-row items-center gap-x-2"
            onClick={() => setOpen(true)}
          >
            Adicionar Item <Plus size={18} />
          </Button>
          <ItemDialog addItem={handleAddItem} open={open} setOpen={setOpen} />
        </div>
        <ItemsTable
          items={items}
          removeItem={handleRemoveItem}
          updateItem={handleUpdateItem}
          totalValueSum={totalValueSum}
          formatValue={formatCurrencyValue}
        />
        <button
          className="sm:hidden fixed bottom-4 right-[50%] translate-x-[50%] bg-green-500 rounded-full p-2"
          onClick={() => setOpen(true)}
        >
          <Plus size={36} color="white" />
        </button>
      </div>

      <Toaster />
    </main>
  );
}
