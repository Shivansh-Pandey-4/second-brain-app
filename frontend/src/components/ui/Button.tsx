import React, { type ReactElement } from "react";
import clsx from "clsx";

type ButtonProps = {

    children: React.ReactNode;
    className?: string;
    variant?: "colorFull" | "colorLess" | "logout" | "delete";
    startIcon?: ReactElement;

} & React.ComponentProps<"button">;


const Button = ({ children, className, variant = "colorLess", ...props }: ButtonProps) => {

    const { disabled } = props;

    const baseStyle = "px-2 py-1 mx-2 border border-black rounded-md cursor-pointer inline-flex items-center gap-1";

    const variants = {
        colorLess: "bg-gray-100 text-indigo-700 hover:bg-gray-300",
        colorFull: "bg-indigo-500 text-white hover:bg-indigo-600",
        logout: "bg-red-500 text-black hover:bg-red-600",
        delete: "bg-gray-100 text-black hover:bg-red-600"
    }

    return (
        <button disabled={disabled} {...props} className={clsx(`${baseStyle}, ${variants[variant]}, ${className}, ${disabled ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}, ${props.startIcon && "space-x-2 flex items-center justify-between"}`)}>
            {props?.startIcon} {children}
        </button>
    )
}

export default Button;