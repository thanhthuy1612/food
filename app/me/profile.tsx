"use client";

import { useAppContext } from "@/app/app-provider";
import envConfig from "@/config";
import React from "react";

export default function Profile() {
  const { sessionToken } = useAppContext();
  React.useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bear ${sessionToken}`,
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      console.log(result);
    };
    fetchRequest();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      {/* <div>Hello {result.payload.data?.name}</div> */}
    </div>
  );
}
