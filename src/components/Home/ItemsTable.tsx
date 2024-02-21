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

interface ItemsTableProps {
  items: {
    name: string;
    amount: number;
    value: number;
  }[];
  removeItem: (index: number) => void;
}

export const ItemsTable = ({ items, removeItem }: ItemsTableProps) => {
  const totalValueSum = items
    .reduce((acc, item) => acc + item.value * item.amount, 0)
    .toFixed(2);

  return (
    <Table>
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
          <TableHead>Quantidade</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead className="text-center">Remover</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell className="text-right">R$ {item.value}</TableCell>
            <TableCell>
              <Trash
                className="mx-auto cursor-pointer hover:text-red-500 transition-all"
                size={20}
                strokeWidth={2}
                onClick={() => removeItem(index)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-bold">
            Total
          </TableCell>
          <TableCell colSpan={2} className="text-right font-bold">
            R$ {totalValueSum}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
