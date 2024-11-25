import { cn } from "@/lib/utils";

export const MaxWidthWrapper = ({ children, className }) => {
  return (
    <div
      className={cn(
        "h-full mx-auto max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};
