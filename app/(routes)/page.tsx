// pages/index.tsx
import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboards = await getBillboards();

  // Select only the first billboard
  const firstBillboard = billboards.length > 0 ? [billboards[0]] : [];

  return (
    <Container>
      <div className="space-y-2">
        {firstBillboard.map((billboard) => (
          <Billboard key={billboard.id} data={billboard} />
        ))}
        <div className="mt-4 mb-5">
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Produk Tersedia" items={products} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;