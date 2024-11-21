"use client";

import { HistoryCard } from "@/components/HisroryCard";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm"; // Correctly import desc
import { useEffect, useState } from "react";

const Page = () => {
  const { user } = useUser();
  const [getHistoryByUser, setGetHistoryByUser] = useState([]);

  const getHistory = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(AIOutput.createdAt)); // Correctly use desc here

      // console.log(result);
      setGetHistoryByUser(result);
    }
  };

  // Fetch history when the component mounts or when the user changes
  useEffect(() => {
    getHistory();
  }, [user]);

  return (
    <div>
      {/* Wrap the grid container around the entire list of history items */}
      <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {getHistoryByUser.length > 0 ? (
          getHistoryByUser.map((historyItem, index) => (
            <HistoryCard key={index} history={historyItem} />
          ))
        ) : (
          <p>No history found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
