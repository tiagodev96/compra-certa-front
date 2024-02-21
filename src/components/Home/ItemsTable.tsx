"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../ui/separator";
import { Trash } from "lucide-react";
import { Show } from "..";
import { DeleteDialog } from "./components/DeleteDialog";

interface Item {
  name: string;
  amount: number;
  value: number;
}

interface ItemsTableProps {
  items: Item[];
  removeItem: (index: number) => void;
}

export const ItemsTable = ({ items, removeItem }: ItemsTableProps) => {
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

  const renderItems = () =>
    items.map((item, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">{index + 1}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.amount}</TableCell>
        <TableCell className="text-right">{formatValue(item.value)}</TableCell>
        <TableCell>
          <DeleteDialog index={index} removeItem={removeItem} />
        </TableCell>
      </TableRow>
    ));

  const renderNoItems = () => (
    <TableRow>
      <TableCell colSpan={5} className="text-center font-bold">
        Nenhum item adicionado
      </TableCell>
    </TableRow>
  );

  return (
    <Table className="border-gray-200 border-[1px]">
      <TableCaption>
        <div className="flex flex-row space-x-s justify-center">
          <p>Compras sob seu controle!</p>
          <Separator
            orientation="vertical"
            className="h-100 w-[1px] bg-[#64748B]"
          />
          <p>&copy; Compra Certa</p>
        </div>
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Qtde.</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead className="text-center">Remover</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <Show>
          <Show.When isTrue={items.length > 0}>{renderItems()}</Show.When>
          <Show.Else>{renderNoItems()}</Show.Else>
        </Show>
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-bold">
            Total
          </TableCell>
          <TableCell colSpan={2} className="text-right font-bold">
            {formatValue(totalValueSum)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
