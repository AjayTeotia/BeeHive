"use client";

import { Header } from "@/components/Header";
import { SideNav } from "@/components/SideNav";
import { TotalUsageContext } from "@/context/total-usage-context";
import { UpdateCreditContext } from "@/context/update-credit-context";
import { UserSubscriptionContext } from "@/context/user-subscription-context";
import { useState } from "react";

const Layout = ({ children }) => {
  const [totalUsage, setTotalUsage] = useState();
  const [UserSubscriptionID, setUserSubscriptionID] = useState(false);
  const [updateCredit, setUpdateCredit] = useState();

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider
        value={{ UserSubscriptionID, setUserSubscriptionID }}
      >
        <UpdateCreditContext.Provider value={{ updateCredit, setUpdateCredit }}>
          <div className="h-screen">
            <div className="hidden md:block md:w-[250px] fixed top-0 left-0 h-screen">
              <SideNav />
            </div>

            <div className="md:ml-[250px]">
              <Header />
              {children}
            </div>
          </div>
        </UpdateCreditContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
};

export default Layout;
