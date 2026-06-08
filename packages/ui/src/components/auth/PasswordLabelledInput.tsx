import { useState, type ComponentType } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LabelledInput, type InputProps } from "../../ui/LabelledInput";

const withPasswordToggle = (Component: ComponentType<InputProps>) => {
  const PasswordToggleInput = ({ type, className, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    if (type !== "password") {
      return <Component type={type} className={className} {...props} />;
    }

    return (
      <div className="relative">
        <Component
          type={showPassword ? "text" : "password"}
          className={`pr-11 ${className ?? ""}`}
          {...props}
        />
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute right-3 bottom-2 flex h-7 w-7 items-center justify-center text-meta hover:text-foreground"
          onClick={() => setShowPassword((current) => !current)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  };

  return PasswordToggleInput;
};

const PasswordLabelledInput = withPasswordToggle(LabelledInput);

export default PasswordLabelledInput;
