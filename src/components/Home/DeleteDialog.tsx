"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogsStore } from "@/store";
import React from "react";

export const DeleteDialog = () => {
  const handleDelete = () => {
    console.log(itemToDelete);
    setOpenDeleteDialog(false);
  };

  // * Stores
  const [openDeleteDialog, setOpenDeleteDialog, itemToDelete] = useDialogsStore(
    (state) => [
      state.openDeleteDialog,
      state.setOpenDeleteDialog,
      state.itemToDelete,
    ]
  );

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent className="max-w-[90%] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="dark:text-neutral-50 text-neutral-950">
            Deseja realmente excluir o item?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-red-500 hover:bg-red-800 hover:text-neutral-50 text-neutral-50 transition-all"
            onClick={handleDelete}
          >
            Sim
          </Button>

          <Button
            className="bg-gray-600 hover:bg-gray-300 hover:text-neutral-950 text-neutral-50 transition-all"
            onClick={() => setOpenDeleteDialog(false)}
          >
            Não
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
