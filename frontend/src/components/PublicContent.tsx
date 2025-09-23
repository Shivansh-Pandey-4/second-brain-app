import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Data } from "../lib/types";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import BrainCard from "./BrainCard";
import Button from "./ui/Button";

const PublicContent = ()=>{

    const {hashString} = useParams();
    const [data,setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(false);

    async function fetchData(){
         try{
            const response = await fetch(`${BACKEND_URL}/api/v1/brain/${hashString}`);
            const data = await response.json();
            if(!response.ok){
                 toast.error(data.msg);
                 setError(true);
                 return;
            }

            setData(data.userContent);
            console.log(data);
            setLoading(false);
            toast.success(data.msg);
            return;

         }catch(err){
             setError(true);
             toast.error(`unable to fetch /GET/brain request.`);
             return;
         } 
    }

    useEffect(()=>{
        fetchData();
    },[]);

    if(error){
         return <div className=" w-screen h-screen text-2xl flex flex-col justify-center items-center"><h1>Invalid share id </h1> or <h1> User Stopped Sharing Brain.</h1>
         <Link to={"/"}>
            <Button className="mt-5" variant="logout">Go Back</Button>
            </Link>
         </div>
    }

    if(loading){
         return <div className=" w-screen h-screen text-2xl flex justify-center items-center"><h1>Loading User Data ... </h1></div>
    }

    if(data.length === 0){
        return <div className=" w-screen h-screen text-2xl flex justify-center items-center">
            <h1>User second brain is empty.</h1>
            <Link to={"/"}>
            <Button variant="colorFull">Go Back</Button>
            </Link>
        </div>
    }

    return (
        <div>
            <div className="flex flex-col items-center ">
            <h1 className="my-5 text-2xl text-center">User -`{data[0].userId.firstName.toUpperCase()}`- Shared Brain.</h1>
             <Link to={"/"}>
              <Button variant="colorFull">Go Back</Button>
            </Link>
            </div>
            <div className="flex flex-wrap justify-center mt-5">
            {
                data.map((value,index) =><BrainCard key={index} value={value}/>)
            }
            </div>
        </div>
    )
}

export default PublicContent;