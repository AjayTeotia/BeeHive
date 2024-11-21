import { UserProfile } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="h-full flex items-center justify-center py-5">
      <UserProfile />
    </div>
  );
};

export default Page;
