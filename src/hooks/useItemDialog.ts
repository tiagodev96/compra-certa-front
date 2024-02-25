import { useState, useEffect } from "react";

interface Item {
  id: string;
  name: string;
  amount: string;
  value: string;
}

interface UseItemDialogProps {
  item: Item | null;
  addItem?: (item: Item) => void;
  updateItem?: (item: Item) => void;
  deleteItem?: (item: Item) => void;
  setOpen: (open: boolean) => void;
}

interface ItemErrors {
  name?: string;
  amount?: string;
  value?: string;
}

export function useItemDialog({
  item,
  addItem,
  updateItem,
  deleteItem,
  setOpen,
}: UseItemDialogProps) {
  const [newItem, setNewItem] = useState<Item>({
    id: "",
    name: "",
    amount: "",
    value: "",
  });
  const [errors, setErrors] = useState<Partial<ItemErrors>>({});

  useEffect(() => {
    if (item) {
      setNewItem(item);
    } else {
      setNewItem({ id: "", name: "", amount: "", value: "" });
    }
  }, [item]);

  const handleDelete = () => {
    if (deleteItem) {
      deleteItem(newItem);
      setOpen(false);
    }
  };

  const validateInputs = (item: Item) => {
    let errors: Partial<ItemErrors> = {};

    if (!item.name || item.name === "") {
      errors.name = "Campo obrigatório";
    }

    const amountAsNumber = parseInt(item.amount, 10);
    if (amountAsNumber <= 0) {
      errors.amount = "Insira um número maior que zero";
    } else if (isNaN(amountAsNumber)) {
      errors.amount = "Campo obrigatório";
    } else if (amountAsNumber % 1 !== 0) {
      errors.amount = "Insira um número inteiro";
    }

    const valueAsNumber = parseFloat(item.value.replace(",", "."));
    if (valueAsNumber <= 0) {
      errors.value = "Insira um número maior que zero";
    } else if (isNaN(valueAsNumber)) {
      errors.value = "Campo obrigatório";
    }

    return errors;
  };

  const handleSubmit = () => {
    let errors = validateInputs(newItem);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (addItem) {
        addItem(newItem);
      }

      if (updateItem) {
        updateItem(newItem);
        setOpen(false);
      }

      setNewItem({ id: "", name: "", amount: "", value: "" });
    }
  };

  const handleInputChange =
    (id: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let updatedItem = { ...newItem };
      if (id === "amount") {
        if (/^\d*$/.test(value)) {
          updatedItem[id] = value;
        }
      } else if (id === "value") {
        if (/^\d*\.?\d{0,2}$/.test(value)) {
          updatedItem[id] = value;
        }
      } else {
        updatedItem[id] = value;
      }
      setNewItem(updatedItem);
    };

  return {
    newItem,
    setNewItem,
    handleSubmit,
    handleInputChange,
    handleDelete,
    errors,
  };
}
