import { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";


const Signup = ()=>{

   const [name,setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   async function fetchData(){
    try{

        const response = await fetch(`${BACKEND_URL}/api/v1/signup`,{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({email,password,name})
        })

        const data = await response.json(); 

    if (!response.ok) {
      toast.error(data.msg || "Something went wrong");
      return;
    }

    toast.success(data.msg);
    setName("");
    setEmail("");
    setPassword("");
    return ;

    }catch(err){
       if (err instanceof TypeError) {
            toast.error("Network error. Please check your internet connection.");
        } else {
            toast.error("Unexpected error. Please try again.");
        }
    }
   }

   function handleForm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(name.length < 3){
             toast.error("name should be minimum 3 letters long");
             return ;
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if(!emailRegex.test(email)){
            toast.error("invalid email type");
            return;
        }

        if(password.length <6 || password.length >=30){
              toast.error("password must be 6 letters long and less than 30 letters");
              return;
        }

        fetchData();
   }

   return (
       <div className="flex justify-center mt-10">
          <div className=" border border-gray-300 w-sm h-110 flex flex-col items-center rounded-lg shadow-xl">

                 <h1 className="text-2xl my-5">Sign Up</h1>

            <form onSubmit={handleForm}>

                <div className="flex flex-col items-center">
                    <input autoFocus required value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Name" className="border my-3 rounded-md px-2 py-1.5 w-60"/>

                    <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter Email" className="border my-3 rounded-md px-2 py-1.5 w-60" />

                    <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" className="border my-3 rounded-md px-2 py-1.5 w-60" />

                </div>
                     <button className="border w-full mt-3 border-black cursor-pointer px-3 py-1.5 rounded-md bg-sky-600 text-white hover:bg-sky-700 ">Sign Up</button>
            </form>

                <span className="flex items-center w-xs mt-5 mb-3">
                    <span className="flex-grow border-t border border-gray-400"></span>
                    <span className="mx-1 text-lg">or</span>
                    <span className="flex-grow border-t border border-gray-400"></span>
                </span>

                   <div className="mt-1">

                    <span  className="text-lg">Already have an account ? <button className="text-sky-600 cursor-pointer font-semibold"><Link to={"/signin"}>Login</Link></button> </span>

                  </div>
         </div>
       </div>
   )
}

export default Signup;