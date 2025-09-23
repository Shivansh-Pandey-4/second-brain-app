import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Data } from "./types";

export function useFetch(link: string, method: string){
    const [data, setData] = useState<Data[]>([]);
    const [isloading,setIsloading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    async function fetchData(){

         const token = localStorage.getItem("token");
         if(!token){
             navigate("/signin");
             return;
         }
          try{
              const response = await fetch(`${BACKEND_URL}`+link,{
                   method : method,
                   headers : {
                       "Content-Type" : "application/json",
                       "token" : token || "token does not exist"
                   }
              })

              const data = await response.json();

              if(!response.ok){
                  setError(true);
                  toast.error(data.detailError || "invalid jwt token");
                  toast.error(data.msg || "invalid jwt token");
                  navigate("/signin");
                  return;
              }

              setData(data.contents || data.userContent || data.content);
              setIsloading(false);
          }catch(err){
              setError(true);
              return toast.error("error in the catch block");
         }
    }

    useEffect(()=>{
        fetchData();
    },[link]);

    return {isloading,error,data,fetchData};

}