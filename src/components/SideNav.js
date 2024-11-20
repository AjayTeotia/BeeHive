"use client";

import {
  FileClockIcon,
  HomeIcon,
  SettingsIcon,
  WalletCardsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNav = () => {
  const path = usePathname();

  const MenuList = [
    {
      name: "Home",
      icon: HomeIcon,
      url: "/dashboard",
    },

    {
      name: "History",
      icon: FileClockIcon,
      url: "/dashboard/history",
    },

    {
      name: "Billing",
      icon: WalletCardsIcon,
      url: "/dashboard/billing",
    },

    {
      name: "Settings",
      icon: SettingsIcon,
      url: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-screen w-full p-5 shadow-md border-r-2">
      <div className="flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width={120} height={100} />
      </div>

      <hr className="h-1 w-full rounded-full shadow-md bg-gray-200" />

      <div className="mt-5">
        {MenuList.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            className={`flex items-center mb-2 p-3 gap-2 hover:bg-primary hover:text-secondary rounded-full hover:font-bold transition-all ease-in-out duration-300 ${
              path === item.url ? "bg-primary text-secondary rounded-full border-2 shadow-md" : ""
            }`}
          >
            <item.icon className="size-7" />

            <h2 className="text-lg">{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
