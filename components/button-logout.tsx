"use client";

import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonLogout: React.FC = () => {
  const router = useRouter();
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
    }
  };
  return (
    <Button size="sm" onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
};

export default ButtonLogout;
