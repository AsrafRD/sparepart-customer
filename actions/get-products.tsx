import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  productIds?: string[]; // Change the name to reflect that it can be an array
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  // Check if productIds is an array and join them with a comma
  const productIdParam = Array.isArray(query.productIds)
    ? query.productIds.join(",")
    : query.productIds;

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      productId: productIdParam,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
