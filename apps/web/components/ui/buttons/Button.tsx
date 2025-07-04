import { ReactElement } from "react";

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

interface buttonProps {
    colorVariant: "yellow" | "black_yellow" | "black_green";
    sizeVariant: "small" | "medium" | "large";
    text: string;
    // onClick?: () => void;
    onClick?: (e: React.MouseEvent) => void
    startIcon?: ReactElement;
    endIcon?: ReactElement;
}

export const Button = ({ colorVariant, sizeVariant, text, onClick, startIcon, endIcon }: buttonProps) => {
    return (
        <>
            <button
                className={`${colorVariants[colorVariant]} ${sizeVariants[sizeVariant]} ${defaultButtonStyles}`}
                onClick={onClick}
            >
                <div className="mr-1">
                    {startIcon}
                </div>
                {text}
                <div className="ml-1">
                    {endIcon}
                </div>
            </button>
        </>
    )
}