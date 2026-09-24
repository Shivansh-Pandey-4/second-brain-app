export default function Empty() {

    return (
        <div>
            <div className="flex flex-col justify-center items-center py-10">
                <img className="max-w-sm w-50 md:w-full md:h-80" src="\empty_notes.svg" alt="empty notes" />
                <div className="text-2xl mt-10 flex flex-col items-center">          <h1 className="text-sm md:text-xl lg:text-2xl">Currently you have no contents. 😔</h1>
                    <h1 className="text-sm md:text-xl lg:text-2xl mt-3">Click Add Content Button.</h1>
                    <h1 className="text-sm md:text-xl lg:text-2xl mt-3">To Add Content.</h1></div>
            </div>
        </div>
    )
}