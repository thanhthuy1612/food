"use client";

import accountApiRequest from "@/apiRequest/account";
import { clientSessionToken } from "@/lib/http";
import React from "react";

export default function Profile() {
  React.useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.me(clientSessionToken.value);
      console.log(result);
    };
    fetchRequest();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
