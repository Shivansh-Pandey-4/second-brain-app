import Input from "./ui/Input";
import { Search } from "lucide-react";

interface IProps {
  setSearch: (search: string) => void;
  search: string;
}

export default function SearchBox(props: IProps) {
  const { search, setSearch } = props;

  return (
    <div className="relative max-w-xl w-3xs md:w-full">
      <div className="absolute bottom-0 m-0.5 p-1 rounded-md">
        <Search className="shrink-0" />
      </div>
      <Input
        autoFocus
        type="text"
        className="pl-12 bg-zinc-100 border-gray-300"
        placeholder="Search here with title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
