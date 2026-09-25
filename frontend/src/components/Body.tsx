import { IoShareSocialOutline } from "react-icons/io5";
import { useState } from "react";
import BrainCard from "./BrainCard";
import Button from "./ui/Button";
import { IoMdAdd } from "react-icons/io";
import AddContentModel from "./AddContentModel";
import ShareModal from "./ShareModal";
import { useFetch } from "../lib/hooks";
import Empty from "./Empty";
import Pagination from "./Pagination";


const Body = () => {

    const [page, setPage] = useState(1);
    const [isShare, setIsShare] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { isloading, error, data, fetchData } = useFetch("api/v1/content", page, 3);


    if (error) {
        return <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-4xl">Failed To Fetch User Content.</h1>
        </div>
    }

    if (isloading) {
        return <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-4xl">Loading...</h1>
        </div>
    }

    if (!data || !data.contents) {
        return <Empty />
    }

    return (
        <div className="pt-8">

            <ShareModal isOpen={isShare} onClose={() => setIsShare(false)} />
            <AddContentModel refetch={fetchData} isOpen={isOpen} onClose={() => setIsOpen(false)} />

            <section className="flex justify-between items-center mx-4 md:mx-11 space-x-4">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold">Notes</h1>
                <div className="flex flex-wrap gap-1 md:gap-3">
                    <Button
                        onClick={() => {
                            setIsShare(true);
                        }}
                        startIcon={<IoShareSocialOutline className="shrink-0" />} variant="colorLess">
                        <span className="hidden md:block">
                            Share Brain
                        </span>
                    </Button>
                    <Button onClick={() => setIsOpen(true)} startIcon={<IoMdAdd />} variant="colorFull">
                        <span className="hidden md:block">
                            Add Content
                        </span>
                    </Button>
                </div>
            </section>

            <div className="flex flex-wrap mt-5 justify-center">
                {
                    (data.contents.length === 0) ?
                        <Empty />
                        : data.contents.map((item, index) => <BrainCard value={item} key={index} onDelete={fetchData} />)
                }
            </div>

            {
                data.contents.length !== 0 && <Pagination isloading={isloading} data={data} page={page} setPage={setPage} />
            }

        </div>
    )
}

export default Body;