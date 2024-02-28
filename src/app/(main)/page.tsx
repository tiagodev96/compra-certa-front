"use client";
import { GridBackground, ItemDialog, ItemsTable } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useDialogsStore, useItemsStore } from "@/store";
import { Plus } from "lucide-react";
import { useState } from "react";

export interface Item {
  id: string;
  name: string;
  amount: string;
  value: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const { toast } = useToast();

  const [itemsZt, totalValueZt] = useItemsStore((state) => [
    state.items,
    state.totalValueSum,
  ]);

  const [setOpenAddDialog] = useDialogsStore((state) => [
    state.setOpenAddDialog,
  ]);

  const handleRemoveItem = (index: string) => {
    setItems((prev) => prev.filter((item) => item.id !== index));

    const itemName = items.find((item) => item.id === index)?.name || "";
    const itemFormatted = itemName.charAt(0).toUpperCase() + itemName.slice(1);

    toast({
      description: `${itemFormatted} removido com sucesso!`,
      variant: "success",
      duration: 2000,
    });
  };

  const handleUpdateItem = (newItem: Item) => {
    setItems((prev) =>
      prev.map((item) => (item.id === newItem.id ? newItem : item))
    );
  };

  const formatCurrencyValue = (value: string | number) => {
    if (typeof value === "string") {
      value = parseFloat(value.replace(",", "."));
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <main className="bg-neutral-50 dark:bg-neutral-950 min-h-screen relative z-10">
      <GridBackground>
        <div className="sectionContainer max-w-[90%]">
          <div className="flex z-10 justify-between items-center mb-5">
            <Card>
              <CardContent className="p-2 bg-primary text-neutral-950 rounded-md flex flex-row gap-x-2 justify-center items-center">
                <h2 className="text-sm font-bold">Total</h2>
                <p className="text-sm font-bold">
                  {formatCurrencyValue(totalValueZt())}
                </p>
              </CardContent>
            </Card>
            <Button
              className="hidden font-bold z-10 sm:flex border-[1px] flex-row items-center gap-x-2"
              onClick={() => setOpenAddDialog(true)}
            >
              Adicionar Item <Plus size={18} />
            </Button>
            <ItemDialog />
          </div>

          <div className="flex flex-row space-x-s justify-start mb-2 text-neutral-950 dark:text-neutral-50">
            <p>Clique no item para editar ou remover</p>
          </div>
          <ItemsTable formatValue={formatCurrencyValue} />
          <button
            className="sm:hidden z-10 fixed bottom-4 right-[50%] translate-x-[50%] bg-green-500 rounded-full p-2"
            onClick={() => setOpenAddDialog(true)}
          >
            <Plus size={36} color="white" />
          </button>
        </div>
      </GridBackground>
      <Toaster />
    </main>
  );
}