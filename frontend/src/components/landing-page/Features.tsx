import FeatureCard from "./FeatureCard";
import { featureInfo } from "../../utils/constants";


export default function Features() {

    return (

        <section id="features" className="relative border-t border-white/[0.05] px-5 py-28 sm:px-8" >
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-2xl text-center"> <p className="text-sm font-medium text-violet-400"> EVERYTHING IN ONE PLACE </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"> Turn information into
                        <span className="text-zinc-500"> {" "}knowledge. </span>
                    </h2>
                    <p className="mt-5 text-zinc-400"> Your second brain gives every thought a place to live, so you can focus on learning instead of remembering. </p>
                </div>

                <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {
                        featureInfo.map(item => {
                            const Icon = item.icon;

                            return (
                                <FeatureCard
                                    icon={Icon}
                                    description={item.description}
                                    title={item.title}
                                    key={item.id}
                                />
                            )


                        })
                    }
                </div>
            </div>
        </section>
    )
}