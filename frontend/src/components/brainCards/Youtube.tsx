
export default function YoutubeCard({ youtubeEmbedUrl }: { youtubeEmbedUrl: string; }) {


    return (
        <div className="py-3">
            <iframe
                className="w-full h-100 rounded-md"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    )
}