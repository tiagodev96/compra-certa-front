"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import React, { useState } from "react";

interface DeleteDialogProps {
  removeItem: (index: number) => void;
  index: number;
}

export const DeleteDialog = ({ removeItem, index }: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash
          className="mx-auto cursor-pointer hover:text-red-500 transition-all"
          size={20}
          strokeWidth={2}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja realmente excluir o item?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-red-500 hover:bg-red-800"
            onClick={() => removeItem(index)}
          >
            Sim
          </Button>
          <Button className="bg-gray-600">Não</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
