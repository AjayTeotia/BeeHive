"use client";

import { useState, useEffect } from "react";
import Template from "@/app/(data)/Template";
import { FormSection } from "@/components/FormSection";
import { OutputSection } from "@/components/OutputSection";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const Page = ({ params }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const template = Template.find((template) => template.slug === params.slug);
    setSelectedTemplate(template);
  }, [params.slug]);

  const GenerateAIContent = (formData) => {
    console.log("formData", formData);
  };

  if (!selectedTemplate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button>
          <ArrowLeftIcon /> Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={GenerateAIContent}
        />

        <div className="col-span-2">
          <OutputSection />
        </div>
      </div>
    </div>
  );
};

export default Page;
