import Button from "./ui/Button";
import { ShareModalProps } from "../lib/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { Copy, CopyCheck } from "lucide-react";

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {

    const myRef = useRef(null);
    const navigate = useNavigate();
    const [shareLink, setShareLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    function closeMethod(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (myRef.current == e.target) {
            onClose();
        }
    }

    async function fetchData(input: boolean) {
        if (!localStorage.getItem("token")) {
            toast.error("first signin");
            navigate("/signin");
            return;
        }
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/brain/share`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token") || ""
                },
                body: JSON.stringify({ share: input })
            })

            const data = await response.json();
            if (!response.ok) {
                toast.error(data?.msg);
                return;
            }
            if (data.hashString) {
                setShareLink(`http://localhost:5173/brain/${data?.hashString}`);
            } else {
                setShareLink("");
            }
            toast.success(data.msg);
            return;
        } catch (err) {
            console.error("Error in fetchData:", err);
            toast.error("Something went wrong while sharing the brain.");
            return;
        }
    }


    // useEffect handles the side effect (timer) and its cleanup
    useEffect(() => {
        if (!isCopied) return;

        const timer = setTimeout(() => {
            setIsCopied(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [isCopied]);

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            toast.success("link copied successfully");
            setIsCopied(true); // Triggers the useEffect above

        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };


    return (
        <>
            {
                isOpen && <div ref={myRef} onClick={closeMethod} className="fixed inset-0 backdrop-opacity-80 backdrop-blur-sm flex justify-center items-center">

                    <div className="w-2xl flex flex-col">

                        <button onClick={onClose} className="place-self-end cursor-pointer py-1 mb-1 bg-black px-2 rounded-xl">{"❌"}</button>

                        <div className="flex flex-col items-center border rounded-lg p-3 h-45 bg-white" >

                            <h1 className="text-2xl">Want to share your second brain content with others ?</h1>

                            <div className="pt-5">
                                {
                                    shareLink ? <Button onClick={() => fetchData(false)} className="px-5 hover:bg-red-600 hover:text-white">Stop Share Link</Button> :
                                        <div>
                                            <Button onClick={() => fetchData(true)} className="px-5 hover:bg-green-500 hover:text-white">Yes</Button>

                                            <Button onClick={() => onClose()} className="px-5 hover:bg-red-600 hover:text-white">No</Button>
                                        </div>
                                }
                            </div>
                            {
                                shareLink && <div className=" mt-3 flex items-center justify-between space-x-3">

                                    <div className="text-center border border-black  text-blue-700 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 font-serif">{shareLink}</div>

                                    <Button disabled={isCopied} onClick={() => copyText()} className="hover:cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-all">
                                        {
                                            isCopied ? <CopyCheck className="shrink-0" /> : <Copy className="shrink-0" />
                                        }
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ShareModal;