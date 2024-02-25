import { Show } from "@/components";
import { Item } from "@/app/page";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ItemInputProps {
  id: keyof Item;
  label: string;
  type?: string;
  inputMode?: "text" | "numeric" | "decimal";
  value: string;
  onChange: (
    id: keyof Item
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function ItemInput({
  id,
  label,
  type = "text",
  inputMode = "decimal",
  value,
  onChange,
  error,
}: ItemInputProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label
        htmlFor={id}
        className="text-right text-neutral-900 dark:text-neutral-100"
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        inputMode={inputMode}
        onChange={onChange(id)}
        className={`col-span-3 placeholder:text-sm placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-100 text-lg ${error ? "border-red-500" : ""}`}
        required
        maxLength={id === "name" ? 25 : undefined}
        placeholder={
          id === "name" ? "Ex: Arroz, feijão, etc." : "Ex: 1, 2, 3, etc."
        }
      />
      <Show>
        <Show.When isTrue={!!error}>
          <p className="text-xs text-red-500 col-span-4 text-right mb-3 -mt-3">
            {error}
          </p>
        </Show.When>
      </Show>
    </div>
  );
}
