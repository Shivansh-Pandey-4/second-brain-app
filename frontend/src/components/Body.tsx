import { IoShareSocialOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import BrainCard from "./BrainCard";
import Button from "./ui/Button";
import { IoMdAdd } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import AddContentModel from "./AddContentModel";
import ShareModal from "./ShareModal";
import { Data } from "../lib/types";
import { useNavigate } from "react-router-dom";


const Body = ()=>{

    const [contentData, setContentData] = useState<Data[]>([]);
    const [isloading,setIsloading] = useState(true);
    const [error, setError] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    async function fetchData(){
         const token = localStorage.getItem("token");
         if(!token){
             return;
         }
          try{
              const response = await fetch("http://localhost:3000/api/v1/content",{
                   method : "GET",
                   headers : {
                       "Content-Type" : "application/json",
                       "token" : localStorage.getItem("token") || "token does not exist"
                   }
              })

              const data = await response.json();

              if(!response.ok){
                  setError(true);
                  toast.error(data.detailError || "invalid jwt token");
                  toast.error(data.msg || "invalid jwt token");
                  return 
              }

              setContentData(data.contents);
              setIsloading(false);
          }catch(err){
              setError(true);
              return toast.error("error in the catch block");
         }
    }


    useEffect(()=>{
      const token =localStorage.getItem("token");
      if(!token){
         navigate("/signin");
      }
    },[]);

    useEffect(()=>{
      fetchData();
    },[]);

    if(error){
         return <div className="flex justify-center items-center min-h-screen">
             <h1 className="text-4xl">Failed To Fetch User Content.</h1>
         </div>
    }

    if(isloading){
         return <div className="flex justify-center items-center min-h-screen">
             <h1 className="text-4xl">Loading...</h1>
         </div>
    }

    return (
         <div className="mt-8">

            <ShareModal isOpen={isShare} onClose={()=>setIsShare(false)} />
            <AddContentModel isOpen={isOpen} onClose={()=>setIsOpen(false)} />

            <section className="flex justify-between mx-15">
                <h1 className="text-2xl font-bold">Notes</h1>
            <div>
                <Button onClick={()=>{
                    setIsShare(true);
                }} startIcon={<IoShareSocialOutline/>} variant="colorLess">
                        Share Brain
                </Button>
                <Button onClick={()=>setIsOpen(true)} startIcon={<IoMdAdd/>} variant="colorFull">
                        Add Content
                </Button>
                <Button onClick={()=>{localStorage.removeItem("token"); toast.success("user logout successfully"); navigate("/signin")}} startIcon={<FiLogOut/>} variant="logout">
                        Logout
                </Button>
            </div>
            </section>
             <div className="flex flex-wrap justify-center mt-5">
             {
                (contentData.length === 0)? <div className="text-2xl mt-10 flex flex-col items-center"> <h1>Currently you have no contents.</h1> <h1 className="mt-3">Click Add Content Button.</h1> <h1 className="mt-3">To Add Content.</h1></div>: contentData.map((item,index)=><BrainCard value={item} key={index}/>)
             }
            </div>
         </div>
    )
}

export default Body;