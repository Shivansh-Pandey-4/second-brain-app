
import { Link } from "react-router-dom";
import { SocialContactData } from "../../utils/constants"
import { RefAttributes } from "react";
import { IconProps } from "@tabler/icons-react";

interface ISocialContact {
    item: {
        id: number;
        name: string;
        href: string;
        icon: React.ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    }
}

export default function Contact() {

    return (

        <div id="contact" className="border-t mt-12 border-gray-700 py-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto scroll-mt-20">


            <div className=" col-span-1 px-5 text-zinc-400 ">
                <h1 className="text-xl font-medium text-white">Quick Links</h1>
                <ul className="mt-4">
                    <Link to={"#Home"}>
                        <li className="transition hover:text-white text-sm mt-1">Home</li>
                    </Link>
                    <Link to={"#features"}>
                        <li className="transition hover:text-white text-sm mt-1">Features</li>
                    </Link>
                    <Link to={"#howItWorks"}>
                        <li className="transition hover:text-white text-sm mt-1">How it works</li>
                    </Link>
                </ul>
            </div>

            <div className=" col-span-1 text-zinc-400 px-5">
                <h1 className="text-xl font-medium text-white">Contact Me</h1>
                <p className="mt-1">
                    <span className="mt-4 transition hover:text-white text-sm">Delhi, India</span>
                </p>
                <p className="mt-1">
                    <span className=" transition hover:text-white text-sm">Email : shivanshofficial8750@gmail.com</span>
                </p>
                <p className="mt-1">
                    <span className=" transition hover:text-white text-sm cursor-pointer">Portfolio : shivanshspace.co.in</span>
                </p>
            </div>

            <div className=" col-span-1 px-5 flex flex-col lg:items-center ">
                <h1 className="text-xl font-medium">Contact Links</h1>

                <div className="mt-4 flex gap-x-3 ">
                    {
                        SocialContactData.map(item => (
                            <SocialContactItem item={item} key={item.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export function SocialContactItem(props: ISocialContact) {

    const { item } = props;
    const Icon = item.icon;


    return (
        <div className="relative group">

            <Link to={item.href} target="blank">
                <div className="hover:bg-gray-700 border p-2 rounded-full hover:scale-120 transition-all">
                    <Icon className="shrink-0 " size={20} />
                </div >
            </Link>

            <div className="bg-white text-black invisible absolute left-1/2 -translate-x-1/2 bottom-full mb-4 group-hover:visible z-10 px-2 py-1 rounded-md capitalize">
                {item.name}
            </div>
        </div>
    )
}
