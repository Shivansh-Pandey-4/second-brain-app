import { IoShareSocialOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import BrainCard from "./BrainCard";
import Button from "./ui/Button";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import {data} from "../lib/types";
import AddContentModel from "./AddContentModel";
import ShareModal from "./ShareModal";


const Body = ()=>{

    const [contentData, setContentData] = useState<data[]>([]);
    const [isloading,setIsloading] = useState(true);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    async function fetchData(){
          try{
              const response = await fetch("http://localhost:3000/api/v1/content",{
                   method : "GET",
                   headers : {
                       "Content-Type" : "application/json",
                       "token" : localStorage.getItem("token") || "token does not exist"
                   }
              })

              if(!response.ok){
                  setError(true);
                  return toast.error("error occured in fetch request");
              }

              const data = await response.json();
              setContentData(data.contents);
            console.log(data.contents)
              setIsloading(false);
          }catch(err){
              setError(true);
              return toast.error("error in the catch block");
         }
    }

    useEffect(()=>{
      fetchData();
    },[]);

    if(error){
         return <div className="flex justify-center items-center min-h-screen">
             <h1 className="text-4xl">Error Occurred.</h1>
         </div>
    }

    if(isloading){
         return <div className="flex justify-center items-center min-h-screen">
             <h1 className="text-4xl">Loading...</h1>
         </div>
    }

    return (
         <div className="mt-8">
            <ShareModal isOpen={isOpen} onClose={()=>setIsOpen(false)} />
            <section className="flex justify-between mx-15">
                <h1 className="text-2xl font-bold">Notes</h1>
            <div>
                <Button onClick={()=>{
                    setIsOpen(true);
                }} startIcon={<IoShareSocialOutline/>} variant="colorLess">
                        Share Brain
                </Button>
                <Button startIcon={<IoMdAdd/>} variant="colorFull">
                        Add Content
                </Button>
            </div>
            </section>
             <div className="flex flex-wrap justify-center mt-5">
             {
                (contentData.length === 0)? <div>Currently you have no contents.</div>: contentData.map((item,index)=><BrainCard value={item} key={index}/>)
             }
            </div>
         </div>
    )
}

export default Body;