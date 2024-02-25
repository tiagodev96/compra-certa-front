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
import { Minus, Pencil, Plus, Trash } from "lucide-react";
import { Show } from "..";
import { DeleteDialog } from "./DeleteDialog";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { EditDialog } from "./EditDialog";
import useItems from "@/hooks/useItems";

interface Item {
  name: string;
  amount: string;
  value: string;
}

interface ItemsTableProps {
  items: Item[];
  removeItem: (index: number) => void;
  updateItem: (index: number, item: Item) => void;
  totalValueSum: number;
  formatValue: (value: number | string) => string;
}

export const ItemsTable = ({
  items,
  removeItem,
  updateItem,
  formatValue,
  totalValueSum,
}: ItemsTableProps) => {
  const {
    handleAmountChange,
    handleDeleteClick,
    handleEditClick,
    openDeleteDialog,
    setOpenDeleteDialog,
    itemToDelete,
    itemToEdit,
    itemToEditIndex,
    openEditDialog,
    setOpenEditDialog,
  } = useItems(items, updateItem);

  const renderItems = () =>
    items.map((item, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium hidden sm:flex">
          {index + 1}
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <div className="flex flex-row space-x-2 sm:space-x-3">
            <button
              className="bg-gray-900 hidden sm:flex text-white rounded-full"
              onClick={() => handleAmountChange(index, -1)}
            >
              <Minus size={24} strokeWidth={2} />
            </button>
            <p>{item.amount}</p>
            <button
              className="bg-gray-900 text-white hidden sm:flex rounded-full"
              onClick={() => handleAmountChange(index, 1)}
            >
              <Plus size={24} strokeWidth={2} />
            </button>
          </div>
        </TableCell>
        <TableCell className="text-right">{formatValue(item.value)}</TableCell>
        <TableCell>
          <div className="flex flex-row items-center justify-center space-x-1 sm:space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center"
                    onClick={() => handleDeleteClick(index)}
                  >
                    <Trash
                      className="cursor-pointer hover:text-red-500 transition-all"
                      size={20}
                      strokeWidth={2}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white">
                  <p>Remover item</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => handleEditClick(item, index)}>
                    <Pencil
                      className="cursor-pointer hover:text-slate-500 transition-all"
                      size={20}
                      strokeWidth={2}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white">
                  <p>Editar item</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableCell>
      </TableRow>
    ));

  const renderNoItems = () => (
    <TableRow>
      <TableCell
        colSpan={5}
        className="text-center font-bold text-neutral-900 dark:text-neutral-100"
      >
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
          <TableHead className="w-[100px] hidden sm:table-cell">Item</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className="w-[100px]">Qtde.</TableHead>
          <TableHead className="text-right w-[100px]">Valor</TableHead>
          <TableHead className="text-center w-[100px]">Ações</TableHead>
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
          <TableCell
            colSpan={3}
            className="font-bold text-neutral-900 dark:text-neutral-100"
          >
            Total
          </TableCell>
          <TableCell
            colSpan={2}
            className="text-right font-bold text-neutral-900 dark:text-neutral-100"
          >
            {formatValue(totalValueSum)}
          </TableCell>
        </TableRow>
      </TableFooter>

      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        index={itemToDelete}
        removeItem={removeItem}
      />
      <EditDialog
        item={itemToEdit}
        updateItem={(item) => {
          if (itemToEditIndex !== null) {
            updateItem(itemToEditIndex, item);
          }
        }}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />
    </Table>
  );
};
