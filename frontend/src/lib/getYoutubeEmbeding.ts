export default function getYouTubeEmbedUrl(url?: string) {
    if (!url) return null;

    try {
        const parsedUrl = new URL(url);

        let videoId: string | null = null;

        if (parsedUrl.hostname === "youtu.be") {
            videoId = parsedUrl.pathname.slice(1);
        } else if (parsedUrl.hostname.includes("youtube.com")) {
            videoId = parsedUrl.searchParams.get("v");

            if (!videoId && parsedUrl.pathname.startsWith("/shorts/")) {
                videoId = parsedUrl.pathname.split("/")[2];
            }

            if (!videoId && parsedUrl.pathname.startsWith("/embed/")) {
                videoId = parsedUrl.pathname.split("/")[2];
            }
        }

        if (!videoId) {
            return null;
        }

        const start = parsedUrl.searchParams.get("t");

        if (start) {
            const seconds = parseInt(start);

            if (!isNaN(seconds)) {
                return `https://www.youtube.com/embed/${videoId}?start=${seconds}`;
            }
        }

        return `https://www.youtube.com/embed/${videoId}`;
    } catch {
        return null;
    }
}