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

  const addItem = (item: Item) => {
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, newItem: Item) => {
    setItems((prev) => prev.map((item, i) => (i === index ? newItem : item)));
  };

  let totalValueSum = items.reduce(
    (acc, item) => acc + item.value * item.amount,
    0,
  );

  const formatValue = (value: number | string) => {
    if (typeof value === "string") {
      value = parseFloat(value);
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <main>
      <Header />

      <div className="container py-32 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <Card>
            <CardContent className="p-2 bg-slate-900 text-slate-100 rounded-md flex flex-row gap-x-2 justify-center items-center">
              <h2 className="text-sm font-bold">Total</h2>
              <p className="text-sm font-bold">{formatValue(totalValueSum)}</p>
            </CardContent>
          </Card>
          <ItemDialog addItem={addItem} />
        </div>
        <ItemsTable
          items={items}
          removeItem={removeItem}
          updateItem={updateItem}
          totalValueSum={totalValueSum}
          formatValue={formatValue}
        />
      </div>
    </main>
  );
}
