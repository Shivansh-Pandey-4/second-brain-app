import Body from "./Body";
import SideBar from "./SideBar";

export default function Dashboard() {


    return (
        <>
            <div className='grid grid-cols-4 md:grid-cols-10 '>
                <div className='col-span-1 md:col-span-2 border-r'>
                    <SideBar />
                </div>
                <div className='col-span-3 md:col-span-8'>
                    <Body />
                </div>
            </div>
        </>
    )
}