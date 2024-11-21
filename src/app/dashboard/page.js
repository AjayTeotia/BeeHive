"use client";

import { SearchSection } from "@/components/SearchSection";
import { TemplateListSection } from "@/components/TemplateListSection";
import { useEffect, useState } from "react";

const Page = () => {
  const [userSearchInput, setUserSearchInput] = useState("");

  // useEffect(() => {
  //   console.log(userSearchInput);
  // }, [userSearchInput]);

  return (
    <div>
      <SearchSection onSearchInput={setUserSearchInput} />

      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
};

export default Page;
