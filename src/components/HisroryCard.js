import { BookTextIcon, ClockIcon, CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export const HistoryCard = ({ history }) => {
  const { toast } = useToast();

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(history.aiResponse);

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

  // Helper function to count total words
  const countTotalWords = () => {
    const text = `${history.templateName} ${history.formData} ${history.aiResponse}`;
    const words = text.trim().split(/\s+/); // Split by whitespace and count words
    return words.length;
  };

  return (
    <div className="p-5 bg-yellow-50 rounded-md border-2 shadow-md flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
      <h2 className="font-bold text-lg">{history.templateName}</h2>

      <p className="font-semibold">{history.formData}</p>

      <p className="line-clamp-3 text-sm">{history.aiResponse}</p>

      <div className="flex items-center justify-between gap-5">
        <p className="text-gray-500 text-xs flex items-center">
          <ClockIcon className="mr-1 size-3" /> {history.createdAt}
        </p>

        <Button
          className="flex items-center gap-2 text-sm"
          onClick={handleCopyClick}
        >
          <CopyIcon className="w-4 h-4" /> Copy
        </Button>
      </div>

      <p className="text-gray-500 text-xs flex items-center">
        <BookTextIcon className="mr-1 size-3" />
        Total Words: {countTotalWords()} {/* Display total word count */}
      </p>
    </div>
  );
};
