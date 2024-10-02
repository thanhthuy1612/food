import productApiRequest from "@/apiRequest/product";
import ProductForm from "@/components/products/product-form";
import { handleErrorApi } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { id: number };
};

const getDetail = React.cache(productApiRequest.getDetail);
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const result = await getDetail(id);
  const productDetail = result?.payload?.data;

  return {
    title: productDetail?.name,
    description: productDetail?.description,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  let productDetail = null;
  try {
    const result = await getDetail(id);
    productDetail = result?.payload?.data;
  } catch (error) {
    handleErrorApi({ error });
  }
  return (
    <div>
      {productDetail ? (
        <ProductForm product={productDetail} />
      ) : (
        "Không tìm thấy sản phẩm"
      )}
    </div>
  );
}
