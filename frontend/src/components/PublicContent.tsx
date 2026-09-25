import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { type IData } from "../lib/types";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import BrainCard from "./BrainCard";
import Button from "./ui/Button";
import Pagination from "./Pagination";

const PublicContent = () => {

    const { hashString } = useParams();
    const [data, setData] = useState<IData | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function fetchData() {

        if (!localStorage.getItem("token")) {
            navigate("/signin");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(`${BACKEND_URL}/api/v1/brain/${hashString}?page=${page}&limit=${3}`,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        token: localStorage.getItem("token") || ""
                    }
                });

            let data: IData | null = null;

            try {
                data = await response.json();
            } catch (error) {
                data = null;
            }

            if (!response.ok) {
                setError(true);
                if (data) {
                    if (!data.success) {
                        toast.error(data.error || data.msg);
                        if (data.error?.includes("jwt") || data.msg.includes("authentication")) {
                            navigate("/signin");
                            return;
                        }
                        return;
                    }
                }
                toast.error("failed to get content");
                return;
            }

            if (data && data.success) {
                setData(data);
                return;
            }

        } catch (err) {
            setError(true);
            if (err instanceof TypeError) {
                return toast.error("network error");
            }
            return toast.error(data?.error || data?.msg || (err instanceof Error ? err.message : "something went wrong"));
        } finally {
            setLoading(false);

        }
    }


    useEffect(() => {
        fetchData();
    }, [page]);

    if (error || !data) {
        return <div className=" w-screen h-screen text-2xl flex flex-col justify-center items-center"><h1>Invalid share id </h1> or <h1> User Stopped Sharing Brain.</h1>
            <Link className="mt-10" to={"/"}>
                <Button className="mt-10" variant="logout">Go Back</Button>
            </Link>
        </div>
    }

    if (loading) {
        return <div className=" w-screen h-screen text-2xl flex justify-center items-center"><h1>Loading User Data ... </h1></div>
    }

    if (!data?.contents || data?.contents?.length === 0) {
        return <div className=" w-screen h-screen text-2xl flex justify-center items-center">
            <h1>User second brain is empty.</h1>
            <Link className="mt-10" to={"/"}>
                <Button variant="colorFull">Go Back</Button>
            </Link>
        </div>
    }

    return (
        <div>
            <div className="flex flex-col items-center ">
                <h1 className="my-5 text-2xl text-center">User -'<span className="font-semibold capitalize">{data.contents[0].userId.name}</span>'- Shared Brain.</h1>
                <Link to={"/"}>
                    <Button variant="colorFull">Go Back</Button>
                </Link>
            </div>
            <div className="flex flex-wrap justify-center mt-5">
                {
                    data.contents.map((value, index) => <BrainCard key={index} value={value} />)
                }
            </div>
            {
                data.contents.length !== 0 && <Pagination data={data} isloading={loading} page={page} setPage={setPage} />
            }
        </div>
    )
}

export default PublicContent;