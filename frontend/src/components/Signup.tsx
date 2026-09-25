import { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/config";
import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { Loader2 } from "lucide-react";
import Input from "./ui/Input";


const Signup = () => {

    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function fetchData() {
        try {
            setIsLoading(true);
            const response = await fetch(`${BACKEND_URL}/api/v1/signup`, {
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

            toast.success(data.msg);
            setInputData({ name: "", email: "", password: "" });
            navigate("/signin");

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
        if (inputData.name.trim().length < 3) {
            toast.error("name should be minimum 3 letters long");
            return;
        }
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
        <div className="flex flex-col  justify-center items-center h-screen">

            <div className="max-w-3xl w-full mb-10">
                <Link to={"/"}>
                    <Button>Go Home</Button>
                </Link>
            </div>

            <div className=" border border-gray-300 flex flex-col items-center rounded-lg shadow-xl max-w-sm w-2xs md:w-full">

                <h1 className="text-2xl my-5">Signup Page</h1>

                <form onSubmit={handleForm}>

                    <div className="flex flex-col items-center w-full px-4 md:px-0">

                        <Input autoFocus required name="name" value={inputData.name} onChange={handleInputChange} type="text" placeholder="Enter Name" className="my-3" />

                        <Input required value={inputData.email} name="email" onChange={handleInputChange} type="email" placeholder="Enter Email" className="my-3" />

                        <Input required value={inputData.password} name="password" onChange={handleInputChange} type="password" placeholder="Enter Password" className="my-3" />

                        <Button variant="secondary" className="mt-3 flex items-center justify-center w-full">
                            {
                                isLoading ? <span><Loader2 className="animate-spin" /></span> : "Sign Up"
                            }
                        </Button>

                    </div>



                    <span className="flex items-center mt-5 mb-3">
                        <span className="flex-grow border-t border border-gray-400"></span>
                        <span className="mx-1 text-lg">or</span>
                        <span className="flex-grow border-t border border-gray-400"></span>
                    </span>

                    <div className="mt-1 mb-10 flex items-center justify-center">
                        <span className="text-lg">Already have an account ? <button className="text-sky-600 cursor-pointer font-semibold hover:underline"><Link to={"/signin"}>Login</Link></button> </span>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup;