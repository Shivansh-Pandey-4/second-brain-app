import React, { type ReactElement } from "react";
import clsx from "clsx";


type ButtonProps = {

    children: React.ReactNode;
    className?: string;
    variant?: "colorFull" | "colorLess" | "logout" | "delete" | "secondary";
    startIcon?: ReactElement;

} & React.ComponentProps<"button">;


const Button = ({ children, className, variant = "colorLess", ...props }: ButtonProps) => {

    const { disabled } = props;

    const baseStyle = "px-2 py-1 mx-2 border border-black rounded-md";

    const variants = {
        colorLess: "bg-gray-100 text-indigo-700 hover:bg-gray-300",
        colorFull: "bg-indigo-500 text-white hover:bg-indigo-600",
        secondary: "bg-sky-600 text-white hover:bg-sky-700",
        logout: "bg-red-500 text-black hover:bg-red-600",
        delete: "bg-gray-100 text-black hover:bg-red-600"
    }

    return (
        <button disabled={props.disabled} {...props} className={clsx(`${baseStyle} ${className} ${props.startIcon && "space-x-2 flex items-center justify-between"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${variants[variant]}`)}>
            {props?.startIcon} {children}
        </button>
    )
}

export default Button;