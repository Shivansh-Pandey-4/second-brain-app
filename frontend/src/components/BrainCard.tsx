import { type IContent } from "../lib/types";
import { SlSocialTwitter } from "react-icons/sl";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuBrain } from "react-icons/lu";
import { ReactElement } from "react";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getYouTubeEmbedUrl from "../lib/getYoutubeEmbeding";
import { BACKEND_URL } from "../utils/getUrl";
import YoutubeCard from "./brainCards/Youtube";
import TweetCard from "./brainCards/Tweet";
import DocumentCard from "./brainCards/Document";
import BrainThoughtCard from "./brainCards/BrainThought";


type BrainCardProps = {
    value: IContent;
    onDelete?: () => void;
}



const BrainCard = (props: BrainCardProps) => {

    const { createdAt, title, type, link, tags, _id } = props.value;
    const navigate = useNavigate();

    const contentType = type.toLowerCase();

    const youtubeEmbedUrl = contentType === "youtube" ? getYouTubeEmbedUrl(link) : null;


    async function deleteCard(_id: string) {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/content/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || data.msg);
                return;
            }

            toast.success(data.msg);
            if (props.onDelete) {
                props.onDelete()
            }

        } catch (err) {
            toast.error('unable to make /delete request');
            return;
        }
    }

    const typeIcons: Record<string, ReactElement> = {
        tweet: <SlSocialTwitter color="blue" />,
        youtube: <FaYoutube size={20} color="red" />,
        document: <IoDocumentTextOutline size={20} />,
        random: <GiPerspectiveDiceSixFacesRandom size={20} />,
        brainthought: <LuBrain />,
    };

    const icon = typeIcons[type] || "📌";

    return (
        <div className="w-[310px] border border-gray-200 rounded-lg p-2 shadow-lg m-5 px-5 min-h-[300px] ">

            <div className="text-lg  font-serif pb-2 capitalize flex justify-between items-start w-full">
                <div className="flex gap-4 items-center justify-between w-full">
                    <span className="px-2 py-1 bg-zinc-100 border rounded-md">{icon}</span>
                    <h1 className="underline text-center text-xl">{title}</h1>
                    <Button variant="delete" onClick={() => { deleteCard(_id) }}>
                        <RiDeleteBinLine />
                    </Button>
                </div>
            </div>

            <div className="text-lg font-serif">
                {
                    type.toLowerCase() === "youtube" && youtubeEmbedUrl && (
                        <YoutubeCard youtubeEmbedUrl={youtubeEmbedUrl} />
                    )
                }
                {
                    (type.toLowerCase() === "tweet" && <TweetCard link={link} />)
                }
                {
                    type.toLowerCase() === "document" && (<DocumentCard link={link} />)
                }
                {
                    (type.toLowerCase() === "brainthought" && <BrainThoughtCard link={link} />)
                }
            </div>
            <div className="flex flex-wrap gap-2 py-2">
                {/* {
                tags? tags.map((tag,i)=><div key={i} className="bg-blue-400 rounded-md text-white px-2"><h1>{tag}</h1></div>): <div className="bg-blue-400 text-white px-1"><h1>#undefined</h1></div> 
               }    */
                    tags ? <div className="bg-blue-400 text-white px-1 mt-3"><h1>{tags}</h1></div> : <div className="bg-blue-400 text-white px-1"><h1>#undefined</h1></div>
                }
            </div>

            <h1 className="py-2">Added on - {createdAt.split("T")[0]}</h1>
        </div>
    )
}

export default BrainCard;