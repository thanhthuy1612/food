"use client";

import authApiRequest from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === clientSessionToken.value) {
      authApiRequest
        .logoutFromNextClientToNextServer(true, signal)
        .then((res) => {
          if (res?.status === 200) {
            router.push(`/login?redirectFrom=${pathName}`);
          }
        });
    }
    return () => {
      controller.abort();
    };
  }, [pathName, router, sessionToken]);
  return <></>;
}
