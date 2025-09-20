import { Data } from "../lib/types";
import { SlSocialTwitter } from "react-icons/sl";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuBrain } from "react-icons/lu";
import { ReactElement } from "react";

type BrainCardProps = {
     value : Data;
}

const BrainCard = (props : BrainCardProps)=>{
   
    const {createdAt,title,type,link,tags} = props.value;
     const typeIcons: Record<string, ReactElement> = {
        tweet: <SlSocialTwitter color="blue" />,
        youtube: <FaYoutube size={20} color="red" />,
        document: <IoDocumentTextOutline size={20} />,
        random:  <GiPerspectiveDiceSixFacesRandom size={20}/>, 
        brainthought: <LuBrain/>,
    };

    const icon = typeIcons[type] || "📌";

    return (
        <div className="w-[310px] border border-gray-200 rounded-lg p-2 shadow-lg m-5 px-5 min-h-[300px] ">
            <div className="text-lg  font-serif pb-2 capitalize flex justify-between items-start">
                <div className="flex gap-4 mr-4">
                    <span>{icon}</span>
                    <span className="underline">{title} hello world nice to meet you d</span>
                </div>
                <div>
                    <RiDeleteBinLine/>
                </div>
            </div>
             <div className="text-lg font-serif">
                {
                    (type.toLowerCase() === "youtube" && <div><iframe className="w-full h-80 py-5" src={link?.replace("/watch?v=","/embed/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe></div>)
                }
                {
                     (type.toLowerCase() === "tweet" && <div> <blockquote className="twitter-tweet"><a href={link?.replace("/x.com","/twitter.com")}></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script></div> )
                }
                {
                     (type.toLowerCase() === "document" && <div className="my-5 flex flex-col items-center border border-gray-200 p-3 rounded-lg bg-slate-100 ">
                         <h1 className="text-center">This is the document type content</h1>
                          <a className="underline text-blue-600 my-5" href={link} target="_blank">document link</a>
                         </div>
                     )
                }
                {
                    (type.toLowerCase() === "brainthought" && <div>
                         <h1>This is brainthought type content</h1>
                         <a href={link}>document link</a>
                         </div>)
                }
             </div>
             <div className="flex flex-wrap gap-2 py-2"> 
               {/* {
                tags? tags.map((tag,i)=><div key={i} className="bg-blue-400 rounded-md text-white px-2"><h1>{tag}</h1></div>): <div className="bg-blue-400 text-white px-1"><h1>#undefined</h1></div> 
               }    */
                tags ? <div className="bg-blue-400 text-white px-1"><h1>{tags}</h1></div>: <div className="bg-blue-400 text-white px-1"><h1>#undefined</h1></div>
               }
             </div>
             
             <h1 className="py-2">Added on - {createdAt.split("T")[0]}</h1>
        </div>
    )
}

export default BrainCard;