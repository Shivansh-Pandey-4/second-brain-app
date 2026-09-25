import { ArrowRight, Brain, MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Header() {

    const [show, setShow] = useState(false);

    return (
        <header className="relative">
            <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-600 fixed top-0 z-50 w-full bg-black">

                <section className="flex items-center justify-center gap-x-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20"> <Brain size={20} />
                    </div>
                    <span className="text-lg font-semibold tracking-tight"> Second<span className="text-violet-400">Brain</span> </span>
                </section>

                <div onClick={() => setShow(prev => !prev)} className="block md:hidden hover:bg-gray-600 rounded-md p-1 transition-all cursor-pointer">
                    {
                        show ? <X className="shrink-0" /> : <MenuIcon className="shrink-0" />
                    }
                </div>

                <ul className="hidden md:flex items-center justify-center gap-x-8 text-sm text-zinc-400 ">
                    <Link to={"#features"}>
                        <li className="transition hover:text-white">Features</li>
                    </Link>
                    <Link to={"#howItWorks"}>
                        <li className="transition hover:text-white">How it works</li>
                    </Link>
                    <Link to={"#about"}>
                        <li className="transition hover:text-white">About</li>
                    </Link>
                </ul>
                <section className="hidden md:flex items-center justify-center gap-x-2 ">
                    <Link to={"/signin"}>
                        <div>Signin</div>
                    </Link>
                    <Link to={"/signup"}>
                        <div>Signup</div>
                    </Link>
                </section>


                {
                    show && (<ul className="absolute top-full left-0 right-0 mt-3 mx-4 bg-zinc-100 text-black p-3 rounded-md md:hidden transition-all">

                        <Link to={"#features"}>
                            <li onClick={() => setShow(false)} className=" mb-4 border border-gray-200 px-2 py-1 rounded-md hover:bg-zinc-300">Features</li>
                        </Link>

                        <Link to={"#howItWorks"}>
                            <li onClick={() => setShow(false)} className=" mb-4 border border-gray-200 px-2 py-1 rounded-md hover:bg-zinc-300">How it works</li>
                        </Link>

                        <Link to={"#about"}>
                            <li onClick={() => setShow(false)} className="mb-4 border border-gray-200 px-2 py-1 rounded-md hover:bg-zinc-300">About</li>
                        </Link>

                        <Link to={"/signin"}>
                            <Button onClick={() => setShow(false)} variant="secondary" className="w-full text-lg flex items-center justify-center gap-x-4">Get started <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" /></Button>
                        </Link>

                        {/* <Link to={"/signup"}>
                            <li className=" mb-4 border px-2 py-1 rounded-md hover:bg-zinc-300">Signup</li>
                        </Link> */}
                    </ul>)
                }

            </nav>
        </header>
    )
}