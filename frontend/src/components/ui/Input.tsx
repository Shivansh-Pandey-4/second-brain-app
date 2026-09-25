import clsx from "clsx";
import { ComponentProps } from "react";


interface IProps extends ComponentProps<"input"> {
    className: string;
}

export default function Input({ className, ...props }: IProps) {

    const baseStyle = "border rounded-md px-2 py-1.5 w-full"

    return (
        <input {...props} className={clsx(`${baseStyle} ${className}`)} />
    )
}