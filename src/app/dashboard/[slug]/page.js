"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Template from "@/app/(data)/Template";
import { FormSection } from "@/components/FormSection";
import { OutputSection } from "@/components/OutputSection";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { GenerateContentByAI } from "@/utils/AIModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/context/total-usage-context";
import { useToast } from "@/hooks/use-toast";
import { UpdateCreditContext } from "@/context/update-credit-context";

const Page = ({ params }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiContent, setAIContent] = useState("");
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCredit, setUpdateCredit } = useContext(UpdateCreditContext);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const template = Template.find((template) => template.slug === params.slug);
    setSelectedTemplate(template);
  }, [params.slug]);

  const GenerateAIContent = async (formData) => {
    setLoading(true);

    if (totalUsage >= 10000) {
      toast({
        title: "Limit Exceeded",
        description:
          "Your usage limit has been exceeded. Please upgrade to a paid plan to continue using our services.",
        variant: "destructive",
      });
      setLoading(false);
      router.push("/dashboard/billing");
      return;
    }

    const selectedPrompt = selectedTemplate?.aiPrompt;
    const FinalPrompt = JSON.stringify(formData) + ". " + selectedPrompt;
    console.log(FinalPrompt);

    try {
      const res = await GenerateContentByAI.sendMessage(FinalPrompt);
      console.log(res.response.text());

      setAIContent(res.response.text());
      await SaveInDB(formData, res.response.text(), selectedTemplate.slug);

      setUpdateCredit(Date.now())

      setLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setLoading(false);
    }
  };

  const SaveInDB = async (formData, aiContent, slug) => {
    const res = await db.insert(AIOutput).values({
      formData: formData,
      aiResponse: aiContent,
      templateSlug: slug,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    console.log(res);
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
          loading={loading}
        />

        <div className="col-span-2">
          <OutputSection aiContent={aiContent} />
        </div>
      </div>
    </div>
  );
};

export default Page;
