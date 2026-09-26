import { ArrowRight, Brain, Check, ChevronRight, FileText, Link2, Search, Sparkles, Zap } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {

    return (
        <section id="hero" className="relative flex min-h-screen items-center px-5 pt-24 sm:px-8">
            <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[140px]" />

            <div className="pointer-events-none absolute right-[-200px] top-[35%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />

            <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
                <div className="text-center lg:text-left">

                    <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-zinc-300 backdrop-blur sm:text-sm lg:mx-0">
                        <Sparkles size={14} className="text-violet-400" /> Your knowledge, beautifully organized
                    </div>
                    <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl"> Your mind has <br />
                        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"> unlimited ideas. </span>
                    </h1>
                    <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg lg:mx-0"> Capture your thoughts, organize your knowledge, and build your personal second brain — all in one beautiful workspace.
                    </p>
                    <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">

                        <Button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all ease-in-out hover:scale-105 hover:bg-white sm:w-auto"> Start building your brain <ArrowRight size={17} /> </Button>

                        <Button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-300 backdrop-blur transition-all ease-in-out hover:scale-105 hover:bg-white/[0.07] hover:text-white sm:w-auto"> Explore features <ChevronRight size={16} /> </Button>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-400 lg:justify-start">
                        <Check size={14} className="text-emerald-400" /> Free to get started <span className="text-zinc-300">•</span> No credit card required
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-xl">
                    <div className="absolute inset-10 rounded-full bg-violet-500/20 blur-[100px]" />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-100 text-black shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
                        <div className="flex h-11 items-center gap-2 border-b border-white/[0.06] px-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" /> <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                        </div>
                        <div className="grid grid-cols-[150px_1fr]">
                            <div className="hidden border-r border-gray-400 p-4 sm:block">
                                <div className="mb-6 flex items-center gap-2 text-xs font-medium">
                                    <Brain size={15} className="text-violet-400" /> Second Brain
                                </div>
                                <div className="space-y-2">
                                    {
                                        ["Dashboard", "Docs", "Videos", "Twitter",].map((item, index) => (
                                            <div key={item} className={`rounded-lg px-3 py-2 text-[11px] ${index === 0 ? "bg-black text-white" : "text-black"}`} > {item} </div>))
                                    }
                                </div>
                            </div>

                            <div className="p-4  sm:p-7 ">
                                <div className="mb-6">
                                    <p className="text-[10px] text-zinc-500"> GOOD MORNING </p>
                                    <h3 className="mt-1 text-xl font-semibold"> What's on your mind? </h3>
                                </div>
                                <div className="mb-5 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"> <Search size={14} className="text-zinc-500" />
                                    <span className="text-[11px] text-zinc-600"> Search your knowledge... </span>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-zinc-300 bg-neutral-200 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10"> <FileText size={13} className="text-violet-400" />
                                            </div>
                                            <span className="text-[9px] text-zinc-600"> 2 min ago </span>
                                        </div>
                                        <p className="text-xs font-medium"> Learning Docker </p>
                                        <p className="mt-1 text-[10px] leading-4 text-zinc-500"> Containerization makes applications... </p>
                                    </div>
                                    <div className="rounded-xl border border-zinc-300 bg-neutral-200 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10"> <Link2 size={13} className="text-blue-400" />
                                            </div>
                                            <span className="text-[9px] text-zinc-600"> Yesterday </span>
                                        </div>
                                        <p className="text-xs font-medium"> Next.js Resources </p>
                                        <p className="mt-1 text-[10px] leading-4 text-zinc-500"> Useful resources for mastering Next.js... </p>
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.06] bg-gradient-to-r from-violet-500/[0.08] to-blue-500/[0.05] p-4">
                                    <div>
                                        <p className="text-[9px] text-zinc-500"> KNOWLEDGE BASE </p>
                                        <p className="mt-1 text-lg font-semibold"> 248
                                            <span className="ml-1 text-xs font-normal text-zinc-500"> notes </span>
                                        </p>
                                    </div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10">
                                        <Zap size={16} className="text-violet-400" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}