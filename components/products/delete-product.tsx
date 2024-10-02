"use client";

import { Button } from "@/components/ui/button";
import { ProductResType } from "@/schemaValidations/product.schema";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import productApiRequest from "@/apiRequest/product";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Xóa</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn muốn xóa sản phẩm?</AlertDialogTitle>
          <AlertDialogDescription>
            Sản phẩm &rdquo;{product.name}&rdquo; sẽ được xóa
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteProduct;
