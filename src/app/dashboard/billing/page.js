"use client";

import { CheckIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/context/user-subscription-context";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { UserSubscriptionID, setUserSubscriptionID } = useContext(
    UserSubscriptionContext
  );

  useEffect(() => {
    // Dynamically load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      setRazorpayLoaded(true);
    };
    script.onerror = (error) => {
      console.error("Error loading Razorpay script:", error);
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    setLoading(true);
    axios
      .post("/api/create-subscription", {})
      .then((response) => {
        onPayment(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const SaveSubscription = async (paymentId) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      status: true,
      paymentId: paymentId,
      joinDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (result) {
      window.location.reload();
    }
  };

  const onPayment = (subId) => {
    if (razorpayLoaded && window.Razorpay) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subId,
        name: "BeeHive",
        description: "BeeHive Monthly Subscription",
        handler: async (response) => {
          console.log(response);
          if (response) {
            SaveSubscription(response?.razorpay_payment_id);
          }
          setLoading(false);
        },
        theme: {
          color: "#fbbf24",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      console.error("Razorpay is not loaded properly.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="font-bold sm:text-4xl">Upgrade with monthly plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
        <div className="p-5 w-full bg-gray-50 rounded-md border-2 shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300 ease-in-out">
          <h3 className="font-semibold">Free</h3>

          <h2 className="font-bold text-3xl">
            ₹0 <span className="text-sm font-medium">/ month</span>
          </h2>

          <ul>
            <li className="flex items-center gap-2 text-gray-500">
              <CheckIcon className="size-5" /> 10,000 words/month
            </li>
          </ul>

          {/* <Button className="w-full border-2 shadow-md rounded-full">
            {UserSubscriptionID ? "Free Plan" : "Current Plan"}
          </Button> */}
        </div>

        <div className="p-5 w-full bg-gray-50 rounded-md border-2 shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300 ease-in-out">
          <h3 className="font-semibold">Pro</h3>

          <h2 className="font-bold text-3xl">
            ₹50 <span className="text-sm font-medium">/ month</span>
          </h2>

          <ul>
            <li className="flex items-center gap-2 text-gray-500">
              <CheckIcon className="size-5" /> 1,00,000 words/month
            </li>
          </ul>

          <Button
            className="w-full border-2 shadow-md rounded-full"
            onClick={handlePayment}
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : UserSubscriptionID ? (
              "Active Plan"
            ) : (
              "Upgrade Now"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
