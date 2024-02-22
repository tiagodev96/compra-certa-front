"use client";
import { Header, ItemDialog, ItemsTable } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export interface Item {
  name: string;
  amount: number;
  value: number;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = (item: Item) => {
    setItems((prev) => [...prev, item]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, newItem: Item) => {
    setItems((prev) => prev.map((item, i) => (i === index ? newItem : item)));
  };

  const calculateTotalValueSum = (items: Item[]) => {
    return items.reduce((acc, item) => acc + item.value * item.amount, 0);
  };

  const formatCurrencyValue = (value: number | string) => {
    if (typeof value === "string") {
      value = parseFloat(value);
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const totalValueSum = calculateTotalValueSum(items);

  return (
    <main>
      <Header />

      <div className="container py-32 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <Card>
            <CardContent className="p-2 bg-slate-900 text-slate-100 rounded-md flex flex-row gap-x-2 justify-center items-center">
              <h2 className="text-sm font-bold">Total</h2>
              <p className="text-sm font-bold">
                {formatCurrencyValue(totalValueSum)}
              </p>
            </CardContent>
          </Card>
          <ItemDialog addItem={handleAddItem} />
        </div>
        <ItemsTable
          items={items}
          removeItem={handleRemoveItem}
          updateItem={handleUpdateItem}
          totalValueSum={totalValueSum}
          formatValue={formatCurrencyValue}
        />
      </div>
    </main>
  );
}
