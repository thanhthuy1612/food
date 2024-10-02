import productApiRequest from "@/apiRequest/product";
import { handleErrorApi } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: { id: number };
  // searchParams: { [key: string]: string | string[] | undefined };
};

const getDetail = React.cache(productApiRequest.getDetail);
export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const id = params.id;

  const result = await getDetail(id);
  const productDetail = result?.payload?.data;

  return {
    title: productDetail?.name,
    description: productDetail?.description,
  };
}

export default async function Page({ params }: Props) {
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
        <div>
          <Image
            src={productDetail.image}
            alt={productDetail.name}
            width={100}
            height={100}
            className="w-32 h-32 object-cover"
          />
          <h3>{productDetail.name}</h3>
          <div>{productDetail.description}</div>
          <div>{productDetail.price}</div>
        </div>
      ) : (
        "Không tìm thấy sản phẩm"
      )}
    </div>
  );
}
