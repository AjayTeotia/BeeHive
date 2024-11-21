"use client";

import { TotalUsageContext } from "@/context/total-usage-context";
import { UserSubscriptionContext } from "@/context/user-subscription-context";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import { UpdateCreditContext } from "@/context/update-credit-context";

export const UsageTracker = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { UserSubscriptionID, setUserSubscriptionID } = useContext(
    UserSubscriptionContext
  );
  const [maxWords, setMaxWords] = useState(10000);
  const { updateCredit, setUpdateCredit } = useContext(UpdateCreditContext);

  const GetData = async () => {
    // Get the AIOutput data for the current user
    const res = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

    // If there is a response, set the subscription ID and max words for Pro plan
    if (res) {
      setUserSubscriptionID(res); // You may want to adjust this to store actual subscription data
      setMaxWords(100000); // Assuming the user has a Pro subscription
    }

    // Calculate total usage based on the AIOutput responses
    GetTotalUsage(res);
  };

  const GetTotalUsage = (res) => {
    let total = 0;

    // Sum up the lengths of all AI responses
    if (res) {
      res.forEach((item) => {
        total += item.aiResponse ? item.aiResponse.length : 0; // Ensure there's a response to calculate
      });
    }

    setTotalUsage(total); // Update total usage
  };

  const isUserSubscribed = async () => {
    const res = await db
      .select()
      .from(UserSubscription)
      .where(
        eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress)
      );

    // Set the subscription ID (you may want to store additional subscription details)
    setUserSubscriptionID(res.length > 0 ? res[0].id : null);
  };

  useEffect(() => {
    if (user) {
      GetData();
      isUserSubscribed();
    }
  }, [user, GetData, isUserSubscribed]); // Added missing dependencies

  useEffect(() => {
    user && GetData();
  }, [user, updateCredit, GetData]); // Added missing dependencies

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>

        <div className="h-2 bg-yellow-600 w-full mt-3 rounded-full">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width:
                totalUsage && maxWords
                  ? (totalUsage / maxWords) * 100 + "%"
                  : "0%",
            }} // Calculate width based on totalUsage and maxWords
          ></div>
        </div>

        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} credits
        </h2>
      </div>

      <Link
        href="/dashboard/billing"
        variant="outline"
        className={buttonVariants({
          variant: "outline",
          className: "w-full mt-5",
        })}
      >
        Upgrade
      </Link>
    </div>
  );
};
