"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface DeleteDialogProps {
  removeItem: (index: number) => void;
  index: number | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DeleteDialog = ({
  removeItem,
  index,
  open,
  setOpen,
}: DeleteDialogProps) => {
  const handleDelete = () => {
    if (index !== null) {
      removeItem(index);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[90%] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Deseja realmente excluir o item?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-red-500 hover:bg-red-800"
            onClick={handleDelete}
          >
            Sim
          </Button>

          <Button className="bg-gray-600" onClick={() => setOpen(false)}>
            Não
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
