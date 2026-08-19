import { Search } from "lucide-react";

export default function SearchBar({ username, setUsername, search }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <input
        type="text"
        placeholder="Enter GitHub Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") search();
        }}
        className="
        w-full
        md:w-[450px]
        bg-gray-900
        border
        border-gray-700
        rounded-xl
        px-5
        py-4
        outline-none
        text-white
        focus:border-purple-500
        "
      />

      <button
        onClick={search}
        className="
        flex
        items-center
        justify-center
        gap-2
        bg-purple-600
        hover:bg-purple-700
        px-6
        py-4
        rounded-xl
        transition
        "
      >
        <Search size={20} />
        Search
      </button>
    </div>
  );
}
