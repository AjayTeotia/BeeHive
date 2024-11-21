"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center gap-3">
      <div>
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </div>

      <div>
        {user ? (
          <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
            Dashboard
          </Link>
        ) : (
          <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
