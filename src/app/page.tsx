"use client";
import { Header, ItemDialog, ItemsTable } from "@/components";
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

  return (
    <main>
      <Header />

      <div className="container py-32 flex flex-col">
        <div className="self-end mb-5">
          <ItemDialog addItem={addItem} />
        </div>
        <ItemsTable items={items} removeItem={removeItem} />
      </div>
    </main>
  );
}
