"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
} from "@/schemaValidations/product.schema";
import productApiRequest from "@/apiRequest/product";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

type Product = ProductResType["data"];

export interface IProductFormProps {
  product?: Product;
}
const ProductForm: React.FC<IProductFormProps> = ({ product }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      description: product?.description ?? "",
      image: product?.image ?? "",
    },
  });

  const image = form.watch("image");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file as Blob);

    const uploadImageResult = await productApiRequest.uploadImage(formData);
    return uploadImageResult?.payload.data;
  };

  const createProduct = async (values: CreateProductBodyType) => {
    const imageUrl = await uploadImage();

    if (imageUrl) {
      const result = await productApiRequest.create({
        ...values,
        image: imageUrl,
      });

      return result;
    }
  };

  const updateProduct = async (_values: CreateProductBodyType) => {
    if (!product) return;
    let values = _values;
    if (file) {
      const imageUrl = await uploadImage();
      if (imageUrl) {
        values = {
          ...values,
          image: imageUrl,
        };
      }
    }

    const result = await productApiRequest.update(product.id, values);

    return result;
  };

  async function onSubmit(values: CreateProductBodyType) {
    setLoading(true);
    try {
      const result = product
        ? await updateProduct(values)
        : await createProduct(values);
      toast({
        description: result?.payload.message,
      });
      router.push("/products");
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-md flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Tên"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Giá"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea disabled={loading} placeholder="Mô tả" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFile(file);
                      field.onChange("http://localhost:3000/" + file.name);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(file || image) && (
          <>
            <Image
              src={file ? URL.createObjectURL(file) : image}
              width={128}
              height={128}
              alt="preview"
              className="w-32 h-32 object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setFile(null);
                form.setValue("image", "");
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              Xóa hình ảnh
            </Button>
          </>
        )}
        <Button type="submit" className="!mt-8 w-full" disabled={loading}>
          {product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
