import Body from "./Body";
import SideBar from "./SideBar";
import { DefaultLimit } from "../utils/constants";
import { useFetch } from "../lib/hooks";
import { useState } from "react";



export default function Dashboard() {

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("home");
    const [searchTitle, setSearchTitle] = useState("");

    const { isLoading, error, data, fetchData } = useFetch("api/v1/content", page, DefaultLimit, filter, searchTitle);



    return (
        <>
            <div className='grid grid-cols-4 md:grid-cols-10 '>
                <div className='col-span-1 md:col-span-2 border-r'>
                    <SideBar setFilter={(newFilter) => {
                        setFilter(newFilter);
                        setPage(1);
                    }} />
                </div>
                <div className='col-span-3 md:col-span-8'>
                    <Body isLoading={isLoading} error={error} data={data} fetchData={fetchData} page={page} setPage={setPage} setSearch={setSearchTitle} search={searchTitle} />
                </div>
            </div>
        </>
    )
}