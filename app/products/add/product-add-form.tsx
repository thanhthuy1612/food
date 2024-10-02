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
} from "@/schemaValidations/product.schema";
import productApiRequest from "@/apiRequest/product";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const ProductAddForm: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
    },
  });

  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadImageResult = await productApiRequest.uploadImage(formData);
      const imageUrl = uploadImageResult?.payload.data;
      if (imageUrl) {
        const result = await productApiRequest.create({
          ...values,
          image: imageUrl,
        });

        toast({
          description: result?.payload.message,
        });
        router.push("/products");
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
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
        {file && (
          <>
            <Image
              src={URL.createObjectURL(file)}
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
          Cập nhật
        </Button>
      </form>
    </Form>
  );
};

export default ProductAddForm;
