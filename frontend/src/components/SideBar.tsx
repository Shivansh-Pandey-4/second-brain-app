import { LuBrain } from "react-icons/lu";
import { sidebarItems } from "../utils/SidebarItems";
import { useState } from "react";


const SideBar = () => {

    const [isActive, setIsActive] = useState("Home");


    return (
        <div>
            <div className=" top-0 h-screen pl-4 pt-7 pr-8 ">

                <div className="flex justify-center md:justify-between  md:items-center gap-x-2">
                    <span><LuBrain size={40} color="green" /></span>
                    <h1 className="md:text-md md:leading-4 lg:leading-6 lg:text-xl xl:text-2xl font-semibold hidden md:block">
                        Second Brain
                    </h1>
                </div>

                <ul className="pt-10 mt-10 relative">

                    {
                        sidebarItems.map(item => {
                            const Icon = item.icon;

                            return (
                                <li onClick={() => setIsActive(item.name)} key={item.id} className={`flex items-center lg:justify-between justify-center py-2 mb-6 px-2 rounded-sm hover:bg-gray-200 cursor-pointer border border-gray-100 ${isActive === item.name && "bg-gray-300 hover:bg-gray-300"} group hover:scale-110 transition-all`}>

                                    <h2 className="text-2xl"><Icon className="shrink-0" />
                                    </h2>
                                    <span className="lg:block hidden capitalize">{item.name}</span>

                                    <div className="group-hover:visible invisible absolute capitalize left-full ml-3 z-10 bg-gray-200 p-1.5 rounded-md lg:hidden transition-all">
                                        {item.name}
                                    </div>
                                </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SideBar;