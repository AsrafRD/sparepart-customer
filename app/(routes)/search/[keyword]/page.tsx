import ProductList from "@/components/product-list";

interface ProductPageProps {
  params: {
    keyword: string;
  },
}

const ProductPage: React.FC<ProductPageProps> = async ({ 
  params
 }) => {
  // const products = await getProducts({ isFeatured: true });
  const { keyword } = params;
  const decodedKeyword = decodeURI(keyword);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?q=${decodedKeyword}`
  );  
  
  if (!response.ok) {
    console.error('Failed to fetch search products');
    // Handle error, maybe show a user-friendly message
    return null;
  }
  const searchProduct = await response.json();

  return (
    <>
      <div className="p-4">
         <ProductList title="Produk yang dicari" items={searchProduct} />
      </div>
    </>
  );
};

export default ProductPage;
