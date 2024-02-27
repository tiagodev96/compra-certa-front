type ItemErrors = {
  name?: string | undefined;
  amount?: string | undefined;
  value?: string | undefined;
};

interface Item {
  id: string;
  name: string;
  amount: string;
  value: string;
}

export function validateInputs(item: Item) {
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
}
