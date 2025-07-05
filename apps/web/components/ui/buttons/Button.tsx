import { ReactElement, MouseEvent } from "react";

const colorVariants = {
    yellow: "bg-[#ffbf23] hover:bg-black hover:text-[#ffbf23] font-bold text-xl border border-black",
    black_yellow: "bg-black text-white text-xl font-bold hover:bg-[#ffbf23] hover:text-black border border-black",
    black_green: "bg-black text-white text-xl font-bold hover:bg-[#cef261] hover:text-black border border-black"
}

const sizeVariants = {
    small: "p-1",
    medium: "p-2",
    large: "p-3"
}

const defaultButtonStyles = "cursor-pointer flex items-center justify-center space-x-2 transition-all duration-300 rounded-xl";

const disabledStyles = "opacity-50 cursor-not-allowed";

interface ButtonProps {
    colorVariant: "yellow" | "black_yellow" | "black_green";
    sizeVariant: "small" | "medium" | "large";
    text: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export const Button = ({
    colorVariant,
    sizeVariant,
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
                ${colorVariants[colorVariant]}
                ${sizeVariants[sizeVariant]}
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