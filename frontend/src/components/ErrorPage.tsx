import { Link } from "react-router-dom";
import Button from "./ui/Button";

const ErrorPage = ()=>{
     return (
        <div className="bg-[#2d2d2d] min-h-screen">
            <div className="flex justify-center">
                <img className="max-w-md" src="\404 Error-bro.png" alt="" />
            </div>
            <p className="text-center text-white pb-10 font-serif text-lg">Oops! It seems like the page you're trying to access doesn't exist. If you <br /> believe there's an issue, feel free to report it, and we'll look into it.</p>
            <div className="flex justify-center gap-20 pb-10" >
                <Link to={"/"}>
                    <Button className="text-white border-2 bg-indigo-400 border-indigo-500 py-1 px-5 text-xl rounded-xl hover:bg-indigo-500 hover:text-white cursor-pointer "> Go Back To Home </Button>
                </Link>
            </div>
        </div>
     )
}

export default ErrorPage;