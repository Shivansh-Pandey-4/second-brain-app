import React, { type ReactElement } from "react";
import clsx from "clsx";

type ButtonProps = {

     children : React.ReactNode;
     className ?: string;
     variant ?: "colorFull" | "colorLess" | "logout";
     startIcon ?: ReactElement;

} & React.ComponentProps<"button">;


const Button = ({children, className, variant="colorLess", ...props}: ButtonProps)=>{

    const baseStyle = "px-2 py-1 mx-2 border border-black rounded-md cursor-pointer inline-flex items-center gap-1";

    const variants = {
         colorLess : "bg-gray-100 text-indigo-700 hover:bg-gray-300",
         colorFull : "bg-indigo-500 text-white hover:bg-indigo-600",
         logout : "bg-red-500 text-black hover:bg-red-600"
    }

    return (
        <button {...props} className={clsx(baseStyle, variants[variant], className)}>
              {props?.startIcon} {children} 
        </button>
    )
}

export default Button;