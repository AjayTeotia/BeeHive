"use client";

import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OutputSection = ({ aiContent }) => {
  const [editorValue, setEditorValue] = useState(
    aiContent || "Your Result Will Appear Here..."
  );
  const { toast } = useToast();

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      toast({
        title: "Copied!",
        description: "The content has been copied to your clipboard.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy content.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (typeof aiContent === "string") {
      setEditorValue(aiContent);
    } else {
      console.error("aiContent must be a string.");
    }
  }, [aiContent]);

  return (
    <div className="bg-yellow-100 shadow-lg border-2 rounded-lg">
      <div className="flex justify-between items-center p-4">
        <h2>Your Result</h2>
        <Button onClick={handleCopyClick}>
          <CopyIcon className="mr-1 size-4" />
          Copy
        </Button>
      </div>

      <ReactQuill
        value={editorValue}
        onChange={setEditorValue}
        placeholder="Your Result Will Appear Here..."
        style={{ height: "400px" }}
      />
    </div>
  );
};
