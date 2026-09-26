import { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/config";
import { useNavigate, Link } from "react-router-dom";
import Button from "./ui/Button";
import { Loader2 } from "lucide-react";
import Input from "./ui/Input";


const Signin = () => {
    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function fetchData() {
        try {

            setIsLoading(true);

            const response = await fetch(`${BACKEND_URL}/api/v1/signin`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(inputData)
            })

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || data.msg || "Something went wrong");
                return;
            }

            localStorage.setItem("token", data.token);
            toast.success(data.msg);
            setInputData({ email: "", password: "" });
            navigate("/dashboard");
            return;

        } catch (err) {
            if (err instanceof TypeError) {
                toast.error("Network error. Please check your internet connection.");
            } else {
                toast.error(err instanceof Error ? err.message : "Unexpected error. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(inputData.email)) {
            toast.error("invalid email type");
            return;
        }

        if (inputData.password.trim().length < 6 || inputData.password.trim().length >= 30) {
            toast.error("password must be 6 letters long and less than 30 letters");
            return;
        }

        fetchData();
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputData(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">

            <div className="max-w-3xl w-full mb-10 px-1">
                <Link to={"/"}>
                    <Button>Go Home</Button>
                </Link>
            </div>

            <div className=" border border-gray-300 flex flex-col items-center rounded-lg shadow-xl max-w-sm w-2xs md:w-full">

                <h1 className="text-2xl my-5">Signin Page</h1>
                <form onSubmit={handleForm}>

                    <div className="flex flex-col items-center w-full px-4 md:px-0">

                        <Input autoFocus required value={inputData.email} name="email" onChange={handleInputChange} type="email" placeholder="Enter Email" className="my-3" />

                        <Input required value={inputData.password} name="password" onChange={handleInputChange} type="password" placeholder="Enter Password" className="border my-3 rounded-md px-2 py-1.5 w-full" />

                        <Button type="submit" variant="secondary" className="w-full py-1.5 mt-3 flex items-center justify-center ">
                            {
                                isLoading ? <span><Loader2 className="animate-spin" /></span> : "Sign In"
                            }
                        </Button>
                    </div>



                    <span className="flex items-center  my-5 px-4">
                        <span className="flex-grow border-t border border-gray-400"></span>
                        <span className="mx-1 text-lg">or</span>
                        <span className="flex-grow border-t border border-gray-400"></span>
                    </span>

                    <div className=" flex items-center justify-center px-4 mb-10">
                        <span className="text-lg">Don't have an account ? <button className="text-sky-600 cursor-pointer font-semibold hover:underline"> <Link to={"/signup"}>Signup</Link></button> </span>
                    </div>

                </form>

            </div>

        </div>
    )
}


export default Signin;