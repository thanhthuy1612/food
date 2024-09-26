"use client";

import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ButtonLogout: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const result = await authApiRequest.logoutFromNextClientToNextServer();
      toast({
        description: result?.payload.message,
      });
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
      authApiRequest.logoutFromNextClientToNextServer(true).then(() => {
        router.push(`/login?redirectFrom=${pathname}`);
      });
    } finally {
      router.refresh();
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionTokenExpiresAt");
    }
  };
  return (
    <Button size="sm" onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
};

export default ButtonLogout;
