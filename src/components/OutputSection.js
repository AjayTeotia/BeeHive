"use client";

require("@toast-ui/editor/dist/toastui-editor.css");

import { Editor } from "@toast-ui/react-editor";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { useRef } from "react";

export const OutputSection = () => {
  const editorRef = useRef();
  return (
    <div className="bg-yellow-100 shadow-lg border-2 rounded-lg">
      <div className="flex justify-between items-center p-4">
        <h2>Your Result</h2>

        <Button>
          <CopyIcon className="mr-1 size-4" /> Copy
        </Button>
      </div>

      <Editor
        ref={editorRef}
        initialValue="Your Result Will Appear Here..."
        height="500px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
};
