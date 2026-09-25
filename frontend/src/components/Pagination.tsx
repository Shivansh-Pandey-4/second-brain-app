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
    console.log(pagination);

    if (!pagination) { return null; }

    function handlePrevBtn() {
        console.log("handlePrev is called");
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleNextBtn() {
        console.log("handleNext is called");

        if (pagination) {
            if (page < pagination.totalPage) {
                setPage(page + 1);
                return;
            }
        }
    }

    console.log("current page props : ", page);

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