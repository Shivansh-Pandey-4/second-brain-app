export default function TweetCard({ link }: { link?: string }) {
  return (
    <div>
      {" "}
      <blockquote className="twitter-tweet">
        <a href={link?.replace("/x.com", "/twitter.com")}></a>
      </blockquote>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </div>
  );
}
