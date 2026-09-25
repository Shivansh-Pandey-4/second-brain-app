import { IData } from "../lib/types";
import Button from "./ui/Button";

interface IProps {
    data: IData;
    page: number;
    setPage: (page: number) => void;
    isloading: boolean;
}

export default function Pagination({ data, page, setPage, isloading }: IProps) {

    const pagination = data.pagination;

    if (!pagination) { return null; }

    function handlePrevBtn() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleNextBtn() {

        if (pagination) {
            if (page < pagination.totalPage) {
                setPage(page + 1);
                return;
            }
        }
    }


    return (
        <div className="flex items-center justify-center gap-x-20 w-full flex-wrap my-10">
            <Button
                variant="colorFull"
                onClick={handlePrevBtn}
                disabled={page <= 1 || isloading === true}
            >Prev</Button>

            <Button
                variant="colorFull"
                onClick={handleNextBtn}
                disabled={page >= pagination.totalPage || isloading === true}
            >Next
            </Button>
        </div>
    )
}