"use client";

import { Button } from "@/components/ui/button";
import { ProductResType } from "@/schemaValidations/product.schema";
import React from "react";
import productApiRequest from "@/apiRequest/product";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import AlertDialogCustom from "@/components/alert-dialog-custom";

type Product = ProductResType["data"];

export interface IDeleteProductProps {
  product: Product;
}
const DeleteProduct: React.FC<IDeleteProductProps> = ({ product }) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const result = await productApiRequest.delete(product.id);
      toast({
        description: result?.payload.message,
      });
      router.refresh();
    } catch (error: any) {
      handleErrorApi({ error });
    }
  };
  return (
    <AlertDialogCustom
      title="Bạn muốn xóa sản phẩm?"
      description={`Sản phẩm "${product.name}" sẽ được xóa`}
      handleActive={handleDelete}
    >
      <Button variant="destructive">Xóa</Button>
    </AlertDialogCustom>
  );
};
export default DeleteProduct;
