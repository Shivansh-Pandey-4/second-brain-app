import Button from "./ui/Button";
import { ShareModalProps } from "../lib/types";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

const ShareModal = ({isOpen, onClose}: ShareModalProps)=>{

    const myRef = useRef(null);
    const navigate = useNavigate();
    const [shareLink, setShareLink] = useState("");

    function closeMethod(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        if(myRef.current == e.target){
             onClose();
        }
    }

    async function fetchData(input: boolean){
        if(!localStorage.getItem("token")){
             toast.error("first signin");
             navigate("/signin");
             return;
        }
         try{
              const response = await fetch(`${BACKEND_URL}/api/v1/brain/share`,{
                  method : "POST",
                  headers : {
                      "Content-Type" : "application/json",
                      "token" : localStorage.getItem("token")||""
                  },
                  body : JSON.stringify({share : input})
              })

              const data = await response.json();
              if(!response.ok){
                  toast.error(data?.msg);
                  return;
              }
              if(data.hashString){
                  setShareLink(`http://localhost:3000/api/v1/brain/${data?.hashString}`);
                }else{
                     setShareLink("");
                }
              toast.success(data.msg);
              return;
         }catch(err){
            console.error("Error in fetchData:", err);
            toast.error("Something went wrong while sharing the brain.");
            return;
         }
    }


    return (
      <>
        {
            isOpen && <div ref={myRef} onClick={closeMethod} className="fixed inset-0 backdrop-opacity-80 backdrop-blur-sm flex justify-center items-center">

             <div className="w-2xl flex flex-col">

                <button onClick={onClose} className="place-self-end cursor-pointer py-1 mb-1 bg-black px-2 rounded-xl">{"❌"}</button>

                <div className="flex flex-col items-center border rounded-lg p-3 h-40 bg-white" >

                    <h1 className="text-2xl">Want to share your second brain content with others ?</h1>

                    <div className="pt-5">
                        {
                            shareLink?<Button onClick={()=>fetchData(false)} className="px-5 hover:bg-red-600 hover:text-white">Stop Share Link</Button> :
                            <div>
                                <Button onClick={()=>fetchData(true)} className="px-5 hover:bg-green-500 hover:text-white">Yes</Button>

                                <Button onClick={()=>onClose()} className="px-5 hover:bg-red-600 hover:text-white">No</Button>
                            </div> 
                        }
                    </div>
                    {
                       shareLink&&<span><h1>{shareLink}</h1></span>
                    }
                </div>
             </div>
            </div>
        }
      </>
    )
}

export default ShareModal;