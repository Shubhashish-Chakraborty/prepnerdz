import { ReactElement, MouseEvent } from "react";

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-black hover:bg-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  ghost: 'bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100',
};


const sizeVariants = {
  sm: "p-1",
  md: "p-2",
  lg: "p-3",
};


const defaultButtonStyles = "cursor-pointer flex items-center justify-center space-x-2 transition-all duration-300 rounded-xl";

const disabledStyles = "opacity-50 cursor-not-allowed";

interface ButtonProps {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    text: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export const Button = ({
    variant = "primary",
    size = "md",
    text,
    onClick,
    startIcon,
    endIcon,
    disabled = false,
    type = "button",
    className = ""
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={`
                ${defaultButtonStyles}
                ${variantStyles[variant]}
                ${sizeVariants[size]}
                ${disabled ? disabledStyles : ''}
                ${className}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {startIcon && (
                <div className="mr-1">
                    {startIcon}
                </div>
            )}
            {text}
            {endIcon && (
                <div className="ml-1">
                    {endIcon}
                </div>
            )}
        </button>
    );
};