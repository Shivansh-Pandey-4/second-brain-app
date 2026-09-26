import { ArrowRight, Brain, MenuIcon, X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";


export default function Header() {

    const [show, setShow] = useState(false);

    return (
        <header className="relative">
            <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-600 fixed top-0 z-50 w-full bg-black">

                <a href="#hero">
                    <section className="flex items-center justify-center gap-x-1">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20"> <Brain size={20} />
                        </div>
                        <span className="text-lg font-semibold tracking-tight"> Second<span className="text-violet-400">Brain</span> </span>
                    </section>
                </a>

                <div onClick={() => setShow(prev => !prev)} className="block md:hidden hover:bg-gray-600 rounded-md p-1 transition-all cursor-pointer">
                    {
                        show ? <X className="shrink-0" /> : <MenuIcon className="shrink-0" />
                    }
                </div>

                <ul className="hidden md:flex items-center justify-center gap-x-8 text-sm text-zinc-400 ">
                    <a href={"#features"}>
                        <li className="transition hover:text-white">Features</li>
                    </a>
                    <a href={"#how-it-works"}>
                        <li className="transition hover:text-white">How it works</li>
                    </a>
                    <a href={"#contact"}>
                        <li className="transition hover:text-white">Contact</li>
                    </a>
                </ul>
                <section className="hidden md:flex items-center justify-center gap-x-2  ">
                    <a href={"/signin"}>
                        <div className="flex gap-x-2 border py-1 px-2 rounded-md hover:bg-white hover:text-black transition-all">Get started <ArrowRight /></div>
                    </a>
                </section>


                {
                    show && (<ul className="absolute top-full left-0 right-0 mt-3 mx-4 bg-zinc-100 text-black p-3 rounded-md md:hidden transition-all">

                        <a href={"#features"}>
                            <li onClick={() => setShow(false)} className=" mb-4 border border-gray-200 px-2 py-1 rounded-md hover:bg-zinc-300">Features</li>
                        </a>

                        <a href={"#how-it-works"}>
                            <li onClick={() => setShow(false)} className=" mb-4 border border-gray-200 px-2 py-1 rounded-md hover:bg-zinc-300">How it works</li>
                        </a>

                        <a href={"#contact"}>
                            <li onClick={() => setShow(false)} className="mb-4 border border-gray-200 px-2 py-1 rounded-md hover:bg-zinc-300">Contact</li>
                        </a>

                        <a href={"/signin"}>
                            <Button onClick={() => setShow(false)} variant="secondary" className="w-full text-lg flex items-center justify-center gap-x-4">Get started <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" /></Button>
                        </a>

                        {/* <a href={"/signup"}>
                            <li className=" mb-4 border px-2 py-1 rounded-md hover:bg-zinc-300">Signup</li>
                        </a> */}
                    </ul>)
                }

            </nav>
        </header>
    )
}