"use client";

import Template from "@/app/(data)/Template";
import { TemplateCard } from "./TemplateCard";
import { useEffect, useState } from "react";

export const TemplateListSection = ({ userSearchInput }) => {
  const [templateList, setTemplateList] = useState(Template);

  useEffect(() => {
    if (userSearchInput) {
      const filterData = Template.filter((template) =>
        template.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );

      setTemplateList(filterData);
    } else {
      setTemplateList(Template);
    }
  }, [userSearchInput]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {templateList.map((template) => (
        <TemplateCard {...template} />
      ))}
    </div>
  );
};
