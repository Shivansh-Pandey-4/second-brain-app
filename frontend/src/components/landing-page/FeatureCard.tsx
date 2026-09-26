import { LucideIcon } from "lucide-react";


interface IProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description, }: IProps) {

    const Icon = icon;

    return (
        <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.04]">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/15"> {<Icon />} </div>
            <h3 className="mt-5 text-base font-semibold"> {title} </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-500"> {description} </p>
        </div>
    );
}