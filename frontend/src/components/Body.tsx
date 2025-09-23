import { IoShareSocialOutline } from "react-icons/io5";
import { useState} from "react";
import BrainCard from "./BrainCard";
import Button from "./ui/Button";
import { IoMdAdd } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import AddContentModel from "./AddContentModel";
import ShareModal from "./ShareModal";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../lib/hooks";


const Body = ()=>{

    const {isloading,error,data,fetchData} = useFetch("/api/v1/content", "GET");
    const [isShare, setIsShare] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


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
            <AddContentModel refetch={fetchData} isOpen={isOpen} onClose={()=>setIsOpen(false)} />

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
                (data.length === 0)? <div className="text-2xl mt-10 flex flex-col items-center"> <h1>Currently you have no contents.</h1> <h1 className="mt-3">Click Add Content Button.</h1> <h1 className="mt-3">To Add Content.</h1></div>: data.map((item,index)=><BrainCard value={item} key={index} onDelete={fetchData}/>)
             }
            </div>
         </div>
    )
}

export default Body;