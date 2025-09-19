import { SlSocialTwitter } from "react-icons/sl";
import { RiFileVideoLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";


const SideBar = ()=>{
    return (
        <div>
            <div className="fixed top-0 h-screen border-r pl-4 pt-5 pr-8 ">
              <h1 className="text-2xl font-semibold flex items-center gap-2"><LuBrain size={40} color="green"/> Second Brain</h1>
                <div className=" pl-10 pt-10">
                  <h2 className="text-lg py-4 flex items-center gap-2"><SlSocialTwitter/> Tweets</h2>
                  <h2 className="text-lg py-4 flex items-center gap-2"><RiFileVideoLine/> Videos</h2>
                  <h2 className="text-lg py-4 flex items-center gap-2"><IoDocumentTextOutline/> Documents</h2>
                  <h2 className="text-lg py-4 flex items-center gap-2"><IoLinkSharp/> Links</h2>
                  <h2 className="text-lg py-4 flex items-center gap-2"><FaHashtag/> Tags</h2>
                </div>
            </div>
        </div>
    )
}

export default SideBar;