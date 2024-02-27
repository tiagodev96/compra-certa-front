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
import { Show } from "..";
import { DeleteDialog } from "./DeleteDialog";

import { EditDialog } from "./EditDialog";
import { useDialogsStore, useItemsStore } from "@/store";

interface ItemsTableProps {
  formatValue: (value: number | string) => string;
}

export const ItemsTable = ({ formatValue }: ItemsTableProps) => {
  const [items, totalValue] = useItemsStore((state) => [
    state.items,
    state.totalValueSum,
  ]);
  const [setOpenEditDialog, setItemToDelete] = useDialogsStore((state) => [
    state.setOpenEditDialog,
    state.setItemToDelete,
  ]);

  const renderItems = () =>
    items.map((item, index) => (
      <TableRow
        className="cursor-pointer"
        key={item.id}
        onClick={() => {
          setOpenEditDialog(true, item);
          setItemToDelete(item);
        }}
      >
        <TableCell className="font-medium text-sm text-neutral-950 dark:text-neutral-50 hidden sm:flex">
          {index + 1}
        </TableCell>
        <TableCell className="font-medium text-sm text-neutral-950 dark:text-neutral-50">
          {item.name}
        </TableCell>
        <TableCell>
          <div className="flex flex-row space-x-2 sm:space-x-3">
            <p className="font-medium text-sm text-neutral-950 dark:text-neutral-50">
              {item.amount}
            </p>
          </div>
        </TableCell>
        <TableCell className="text-right font-medium text-sm text-neutral-950 dark:text-neutral-50">
          {formatValue(item.value)}
        </TableCell>
      </TableRow>
    ));

  const renderNoItems = () => (
    <TableRow>
      <TableCell
        colSpan={4}
        className="text-center tex-sm text-neutral-950 dark:text-neutral-50"
      >
        Nenhum item adicionado
      </TableCell>
    </TableRow>
  );

  return (
    <Table className="dark:border-neutral-300 border-neutral-700 border-[1px]">
      <TableCaption>
        <div className="flex flex-row space-x-s justify-center text-neutral-500">
          <p>Compras sob seu controle!</p>
          <Separator orientation="vertical" className="h-100 w-[1px] " />
          <p>&copy; Compra Certa</p>
        </div>
      </TableCaption>

      <TableHeader className="dark:border-neutral-300 border-neutral-700 border-[1px]">
        <TableRow className="dark:border-neutral-300 border-neutral-700 border-[1px]">
          <TableHead className="w-[100px] hidden sm:table-cell">Item</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className="w-[100px]">Qtde.</TableHead>
          <TableHead className="text-right w-[100px]">Valor</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="dark:border-neutral-300 border-neutral-700 border-[1px]">
        <Show>
          <Show.When isTrue={items.length > 0}>{renderItems()}</Show.When>
          <Show.Else>{renderNoItems()}</Show.Else>
        </Show>
      </TableBody>

      <TableFooter className="dark:border-neutral-300 border-neutral-700 border-[1px]">
        <TableRow>
          <TableCell
            colSpan={2}
            className="font-bold text-neutral-950 dark:text-neutral-50"
          >
            Total
          </TableCell>
          <TableCell
            colSpan={2}
            className="text-right font-bold text-neutral-950 dark:text-neutral-50"
          >
            {formatValue(totalValue())}
          </TableCell>
        </TableRow>
      </TableFooter>

      <DeleteDialog />

      <EditDialog />
    </Table>
  );
};
