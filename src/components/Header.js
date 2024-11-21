import { UserButton } from "@clerk/nextjs";
import { SearchIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="p-5 border-b-2 shadow-md flex justify-between items-center gap-3">
      {/* <div className="flex items-center max-w-md rounded-full gap-2 p-2 border-2 border-black shadow-md">
        <SearchIcon />

        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full bg-transparent"
        />
      </div> */}

      <div>
        <h2 className="bg-yellow-200 p-2 text-yellow-700 text-xs md:text-sm shadow-md border-2 rounded-full">
          🔥Join MemberShip just for ₹50/month
        </h2>
      </div>

      <div>
        <UserButton />
      </div>
    </div>
  );
};
