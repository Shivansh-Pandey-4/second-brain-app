import { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";


const Signin = ()=>{
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
   
      async function fetchData(){
       try{
   
           const response = await fetch(`${BACKEND_URL}/api/v1/signin`,{
               method : "POST",
               headers : {
                   "content-type" : "application/json"
               },
               body : JSON.stringify({email,password})
           })
   
           const data = await response.json(); 
   
       if (!response.ok) {
         toast.error(data.msg || "Something went wrong");
         return;
       }
       localStorage.setItem("token",data.token);
       toast.success(data.msg);
       setEmail("");
       setPassword("");
       navigate("/");
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
             <div className=" border border-gray-300 w-sm h-100 flex flex-col items-center rounded-lg shadow-xl">
   
                    <h1 className="text-2xl my-5">Sign In</h1>
   
               <form onSubmit={handleForm}>
   
                   <div className="flex flex-col items-center">
   
                       <input autoFocus required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter Email" className="border my-3 rounded-md px-2 py-1.5 w-60" />
   
                       <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" className="border my-3 rounded-md px-2 py-1.5 w-60" />
   
                   </div>
                        <button className="border w-full mt-3 border-black cursor-pointer px-3 py-1.5 rounded-md bg-sky-600 text-white hover:bg-sky-700 ">Sign In</button>
               </form>
   
                   <span className="flex items-center w-xs my-5">
                       <span className="flex-grow border-t border border-gray-400"></span>
                       <span className="mx-1 text-lg">or</span>
                       <span className="flex-grow border-t border border-gray-400"></span>
                   </span>
   
                      <div className="mt-1">
   
                       <span  className="text-lg">Don't have an account ? <button className="text-sky-600 cursor-pointer font-semibold"> <Link to={"/signup"}>Signup</Link></button> </span>
   
                     </div>
            </div>
          </div>
      )
}


export default Signin;