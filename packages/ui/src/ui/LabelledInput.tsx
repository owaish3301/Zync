import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: ReactNode;
}

export const LabelledInput = ({ id, label, ...props }: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const { className, ...inputProps } = props;

  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={`bg-foreground/2 border border-border rounded mt-2 px-4 py-2 h-11 ${className ?? ""}`}
        {...inputProps}
      />
    </div>
  );
};
