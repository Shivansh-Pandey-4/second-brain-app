import { IoShareSocialOutline } from "react-icons/io5";
import { useState } from "react";
import BrainCard from "./BrainCard";
import Button from "./ui/Button";
import { IoMdAdd } from "react-icons/io";
import AddContentModel from "./AddContentModel";
import ShareModal from "./ShareModal";
import Empty from "./Empty";
import Pagination from "./Pagination";
import { IData } from "../lib/types";


interface IProps {
    isLoading: boolean;
    page: number;
    setPage: (page: number) => void;
    error: boolean;
    data: IData | null;
    fetchData: () => void;

}


const Body = (props: IProps) => {

    const [isShare, setIsShare] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { data, error, fetchData, isLoading, page, setPage } = props;




    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-4xl">Loading...</h1>
        </div>
    }

    if (error) {
        return <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-lg lg:text-4xl">Failed To Fetch User Content.</h1>
            <h2>Try Again Later.</h2>
        </div>
    }

    if (!data || !data.contents || data.contents.length === 0) {
        return (
            <div className="h-screen">
                <AddContentModel
                    refetch={fetchData}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
                <Empty onAddContent={() => setIsOpen(true)} />
            </div>
        )
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
                        <Empty onAddContent={() => setIsOpen(true)} />
                        : data.contents.map((item, index) => <BrainCard value={item} key={index} onDelete={fetchData} />)
                }
            </div>

            {
                data.contents.length !== 0 && <Pagination isLoading={isLoading} data={data} page={page} setPage={setPage} />
            }

        </div>
    )
}

export default Body;