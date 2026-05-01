import { SlSocialTwitter } from "react-icons/sl";
import { RiFileVideoLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";


const SideBar = () => {
    return (
        <div>
            <div className=" top-0 h-screen  pl-4 pt-5 pr-8 ">
                <div className="flex md:items-center md:gap-2">
                    <span className="mx-auto"><LuBrain size={40} color="green" /></span>
                    <h1 className="text-2xl font-semibold hidden md:block">
                        Second Brain
                    </h1>
                </div>
                <div className=" md:pl-10 pt-10">
                    <h2 className="text-lg py-4 flex items-center gap-2 justify-center"><SlSocialTwitter />  <span className="lg:block hidden">Tweets</span></h2>

                    <h2 className="text-lg py-4 flex items-center justify-center gap-2"><RiFileVideoLine /> <span className="lg:block hidden">Videos</span></h2>

                    <h2 className="text-lg py-4 flex items-center justify-center gap-2"><IoDocumentTextOutline /> <span className="lg:block hidden">Documents</span></h2>

                    <h2 className="text-lg py-4 flex items-center justify-center gap-2"><IoLinkSharp /> <span className="lg:block hidden">Links</span></h2>

                    <h2 className="text-lg py-4 flex items-center justify-center gap-2"><FaHashtag /><span className="lg:block hidden"> Tags</span></h2>
                </div>
            </div>
        </div>
    )
}

export default SideBar;