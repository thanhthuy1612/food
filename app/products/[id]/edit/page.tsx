import productApiRequest from "@/apiRequest/product";
import { baseOpenGraph } from "@/app/shared-metadata";
import ProductForm from "@/components/products/product-form";
import envConfig from "@/config";
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

  const url = envConfig.NEXT_PUBLIC_URL + "/products/" + productDetail?.id;

  return {
    title: productDetail?.name,
    description: productDetail?.description,
    openGraph: {
      ...baseOpenGraph,
      title: "Next.js",
      description: "The React Framework for the Web",
      url,
      siteName: "Next.js",
      images: [
        {
          url: productDetail?.image ?? "https://nextjs.org/og-alt.png",
          width: 800,
          height: 600,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
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
