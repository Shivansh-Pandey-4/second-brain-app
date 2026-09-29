import Input from "./ui/Input";
import { Search } from "lucide-react";

export default function SearchBox() {


    return (
        <div className="relative max-w-xl w-3xs md:w-full">
            <div className="absolute bottom-0 m-0.5 p-1 rounded-md">
                <Search className="shrink-0" />
            </div>
            <Input type="text" className="pl-12 bg-zinc-100 border-gray-300" placeholder="Search here with title" />
        </div>
    )
}