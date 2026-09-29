import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { type IData } from "./types";
import BACKEND_URL from "../utils/getBackendUrl";

export function useFetch(link: string, page : number, limit: number, filter: string="home"){
    const [data, setData] = useState<IData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    async function fetchData(){

        if(!localStorage.getItem("token")){
            navigate("/signin");
            return;
        }

        try {

            const response = await fetch(`${BACKEND_URL}/${link}?filter=${filter}&page=${page}&limit=${limit}`, 
            {
                method : "GET",
                headers : {
                    "content-type" : "application/json",
                    token : localStorage.getItem("token") || ""
                }
            });

            let data: IData | null = null;

            try {
                data = await response.json();
            } catch (error) {
                data = null;
            }

            if(!response.ok){
                if(data){
                    if(!data.success){
                        toast.error(data.error || data.msg);
                        if(data.error?.includes("jwt")){
                            localStorage.removeItem("token");
                            navigate("/signin");
                            return;
                        }
                        return;
                    }
                }
                toast.error("failed to get content");
                return;
            }

            if(data && data.success){
                setData(data);
                return;
            }

        }catch(err){
              setError(true);
              if(err instanceof TypeError){
                return toast.error("network error");
              }
              return toast.error( data?.error || data?.msg ||( err instanceof Error? err.message : "something went wrong"));
         }finally{
            setIsLoading(false);

         }
    }

    useEffect(()=>{
        fetchData();
    },[link, page, filter]);

    return {isLoading,error,data,fetchData};

}