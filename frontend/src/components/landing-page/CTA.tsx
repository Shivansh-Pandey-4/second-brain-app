import { ArrowRight, Brain } from "lucide-react";
import Button from "../ui/Button";

export default function Cta() {

    return (
        <section className="px-5 py-24 sm:px-8">

            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.12] via-white/[0.03] to-blue-500/[0.08] px-6 py-20 text-center sm:px-12">

                <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

                <div className="relative">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <Brain size={24} className="text-violet-300" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl"> Your brain deserves <br /> a second brain.
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-zinc-400"> Start building your personal knowledge system today.
                    </p>
                    <Button className="mt-8 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-zinc-100"> Create your second brain <ArrowRight size={16} className="ml-2 inline" />
                    </Button>
                </div>
            </div>
        </section>
    )
}