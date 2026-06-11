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
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg text-meta transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/4.5 hover:text-foreground active:scale-95"
          onClick={() => setShowPassword((current) => !current)}
        >
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    );
  };

  return PasswordToggleInput;
};

const PasswordLabelledInput = withPasswordToggle(LabelledInput);

export default PasswordLabelledInput;
