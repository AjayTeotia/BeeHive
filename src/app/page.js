import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold underline text-red-400">
        Hello, World
      </h1>

      <Link href="/sign-in">
        <Button>Sign in</Button>
      </Link>

      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
