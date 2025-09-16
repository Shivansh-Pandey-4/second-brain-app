import React from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import clsx from "clsx";

type ButtonProps = {

     children : React.ReactNode;
     className ?: string;
     variant ?: "colorFull" | "colorLess"

} & React.ComponentProps<"button">;


const Button = ({children, className, variant="colorLess", ...props}: ButtonProps)=>{

    const baseStyle = "px-2 py-1 border border-black rounded-md cursor-pointer";

    const spanStyle = "inline-flex items-center gap-1";

    const variants = {
         colorLess : "bg-gray-300 text-black hover:bg-gray-400",
         colorFull : "bg-indigo-500 text-white hover:bg-indigo-600"
    }

    return (
        <button {...props} className={clsx(baseStyle, variants[variant], className)}>
             {
                variant === "colorLess" ? <span className={spanStyle}><IoShareSocialOutline />{children} </span> : <span className={spanStyle}><IoMdAdd />{children}</span>
            }
        </button>
    )
}

export default Button;