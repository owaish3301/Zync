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
    <div className="mb-4 flex flex-col">
      <label
        className="mb-2 text-[13px] font-medium text-foreground-secondary"
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`h-11 rounded-xl border border-white/8 bg-background/55 px-3.5 py-2 text-[15px] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-meta hover:border-white/12 focus:border-accent/55 focus:bg-background/70 focus:outline-none focus:ring-2 focus:ring-accent/6 ${className ?? ""}`}
        {...inputProps}
      />
    </div>
  );
};
