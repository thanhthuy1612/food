"use client";

import React from "react";
import authApiRequest from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { differenceInHours } from "date-fns";

const SlideSession: React.FC = () => {
  React.useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const sessionTokenExpiresAt = new Date(clientSessionToken.expiresAt);
      const expiresAt = sessionTokenExpiresAt
        ? new Date(sessionTokenExpiresAt)
        : new Date();
      if (differenceInHours(expiresAt, now) < 1) {
        const res =
          await authApiRequest.slideSessionFromNextClientToNextServer();
        localStorage.setItem(
          "sessionTokenExpiresAt",
          res?.payload.data.expiresAt ?? ""
        );
      }
    }, 1000 * 60 * 30);
    return () => clearInterval(interval);
  }, []);
  return null;
};
export default SlideSession;
