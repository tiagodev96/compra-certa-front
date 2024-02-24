import { useState, useEffect } from "react";
import { Item } from "@/app/page";

interface UseItemDialogProps {
  item: Item | null;
  addItem?: (item: Item) => void;
  updateItem?: (item: Item) => void;
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
  setOpen,
}: UseItemDialogProps) {
  const [newItem, setNewItem] = useState<Item>({
    name: "",
    amount: 0,
    value: 0,
  });
  const [errors, setErrors] = useState<Partial<ItemErrors>>({});

  // Update state when item changes
  useEffect(() => {
    if (item) {
      setNewItem(item);
    } else {
      setNewItem({ name: "", amount: 0, value: 0 });
    }
  }, [item]);

  const validateInputs = (item: Item) => {
    let errors: Partial<ItemErrors> = {};

    if (!item.name || item.name === "") {
      errors.name = "Campo obrigatório";
    }

    if (item.amount <= 0) {
      errors.amount = "Insira um número maior que zero";
    } else if (isNaN(item.amount)) {
      errors.amount = "Campo obrigatório";
    } else if (item.amount % 1 !== 0) {
      errors.amount = "Insira um número inteiro";
    }

    if (item.value <= 0) {
      errors.value = "Insira um número maior que zero";
    } else if (isNaN(item.value)) {
      errors.value = "Campo obrigatório";
    }

    return errors;
  };

  // Call the appropriate function
  const handleSubmit = () => {
    setErrors({});
    console.log(newItem);

    if (newItem.name && newItem.amount > 0 && newItem.value > 0) {
      if (addItem) {
        addItem(newItem);
      }

      if (updateItem) {
        updateItem(newItem);
        setOpen(false);
      }

      setNewItem({ name: "", amount: 0, value: 0 });
    }

    let errors = validateInputs(newItem);
    setErrors(errors);
  };

  // Handle input change and ensure only valid characters are entered
  const handleInputChange =
    (field: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Remove non-numeric characters
      if (field === "amount") {
        value = value.replace(/[^0-9]/g, "");
      }

      // Ensure only one decimal point
      if (field === "value") {
        const parts = value.split(".");
        if (parts.length > 1) {
          parts[1] = parts[1].slice(0, 2);
          value = parts.join(".");
        }
      }

      setNewItem((prevItem) => ({
        ...prevItem,
        [field]: field === "name" ? value : parseFloat(value),
      }));
    };

  return {
    newItem,
    setNewItem,
    handleSubmit,
    handleInputChange,
    errors,
  };
}
