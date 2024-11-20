import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-400">Hello, World</h1>

      <Button>Click me</Button>
    </div>
  );
}
