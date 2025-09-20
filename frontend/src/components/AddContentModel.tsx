import { useRef } from "react";
import { ShareModalProps } from "../lib/types";
import Button from "./ui/Button";

const AddContentModel = ({isOpen, onClose}: ShareModalProps )=>{

   const myRef = useRef(null);
  
      function closeMethod(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
          if(myRef.current == e.target){
               onClose();
          }
      }

      function handleForm(e:  React.FormEvent<HTMLFormElement>){
            e.preventDefault();
            
      }
  
      return (
        <>
          {
              isOpen && <div ref={myRef} onClick={closeMethod} className="fixed inset-0 backdrop-opacity-80 backdrop-blur-sm flex justify-center items-center">
  
               <div className="w-2xl flex flex-col">
  
                 <button onClick={onClose} className="place-self-end cursor-pointer py-1 mb-1 bg-black px-2 rounded-xl">{"❌"}</button>
  
                  <div className="flex flex-col items-center border rounded-lg p-3 h-80 bg-white" >
  
                      <h1 className="text-2xl">Brain Dump Zone.</h1>
  
                        <form onSubmit={handleForm}>

                      <div className="pt-5 flex flex-col w-sm">

                         <select required name="" id="" className="border px-2 py-1 mb-4 rounded-md">
                            <option disabled selected>--Choose Type--</option>
                            <option value="tweet">Tweet</option>
                            <option value="youtube">Youtube</option>
                            <option value="document">Document</option>
                            <option value="brainthough">Brain Thought</option>
                         </select>

                         <input required type="text" placeholder="Enter Title" className="border px-3 py-1 rounded-md mb-4" />

                         <input required type="url" placeholder="Enter link ex: youtube, twitter or any website link" className="border px-3 py-1 rounded-md mb-3"/>

                         <input type="text" placeholder="Enter Tags ex: #productivityHack #futurePlans etc" className="border px-3 py-1 rounded-md mb-3"/>

                         <div className="flex justify-center">
                            <Button variant="colorFull" className="px-5 hover:bg-green-500 hover:text-white">
                            Submit</Button>
                         </div>

                      </div>
                        </form>

                  </div>
               </div>
            </div>
          }
        </>
      )
}

export default AddContentModel;