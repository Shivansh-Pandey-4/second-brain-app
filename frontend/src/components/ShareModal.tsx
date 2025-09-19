import Button from "./ui/Button";
import { ShareModalProps } from "../lib/types";
import { useRef } from "react";

const ShareModal = ({isOpen, onClose}: ShareModalProps)=>{

    const myRef = useRef(null);

    function closeMethod(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        if(myRef.current == e.target){
             onClose();
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

                        <Button className="px-5 hover:bg-green-500 hover:text-white">Yes</Button>
                        <Button className="px-5 hover:bg-red-600 hover:text-white">No</Button>

                    </div>
                </div>
             </div>
            </div>
        }
      </>
    )
}

export default ShareModal;