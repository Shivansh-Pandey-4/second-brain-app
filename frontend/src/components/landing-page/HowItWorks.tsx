export default function HowItWorks() {

    return (
        <section id="how-it-works" className="scroll-mt-20 border-t border-white/[0.05] px-5 py-12 sm:px-8" >
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="text-sm font-medium text-violet-400"> HOW IT WORKS </p> <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"> A simpler way to <br />
                            <span className="text-zinc-500"> remember everything. </span>
                        </h2>
                        <p className="mt-5 max-w-lg leading-7 text-zinc-400"> Your Second Brain turns scattered information into an organized personal knowledge base.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Step
                            number="01"
                            title="Capture"
                            description="Save a thought, idea, resource or anything worth remembering."
                        />
                        <Step
                            number="02"
                            title="Organize"
                            description="Put your knowledge into collections and keep everything structured."
                        />
                        <Step
                            number="03"
                            title="Rediscover"
                            description="Search your knowledge whenever you need it and turn old information into new ideas."
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}


function Step({ number, title, description, }: { number: string; title: string; description: string; }) {


    return (
        <div className="flex gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="text-xs font-medium text-violet-400"> {number} </div>
            <div>
                <h3 className="font-semibold"> {title} </h3>
                <p className="mt-1 text-sm leading-6 text-zinc-500"> {description} </p>
            </div>
        </div>
    );
}