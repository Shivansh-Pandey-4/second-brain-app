import { IoShareSocialOutline } from "react-icons/io5";
import { useState } from "react";
import BrainCard from "./BrainCard";
import Button from "./ui/Button";
import { IoMdAdd } from "react-icons/io";
import AddContentModel from "./AddContentModel";
import ShareModal from "./ShareModal";
import { useFetch } from "../lib/hooks";
import Empty from "./Empty";


const Body = () => {

    const { isloading, error, data, fetchData } = useFetch("/api/v1/content", "GET");
    const [isShare, setIsShare] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


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
                    (data.length === 0) ?
                        <Empty />
                        : data.map((item, index) => <BrainCard value={item} key={index} onDelete={fetchData} />)
                }
            </div>
        </div>
    )
}

export default Body;