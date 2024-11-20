import { SearchIcon } from "lucide-react";

export const SearchSection = ({ onSearchInput }) => {
  return (
    <div className="p-10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-300 via-yellow-300 to-red-300 text-white">
      <h2 className="text-3xl font-bold">Browser all templates</h2>

      <p>What would like to create today?</p>

      <div className="w-full flex justify-center items-center">
        <div className="w-[40%] flex items-center gap-2 p-2 border-2 border-black text-black shadow-md rounded-full my-5">
          <SearchIcon className="size-6" />

          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-transparent"
            onChange={(e) => onSearchInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
