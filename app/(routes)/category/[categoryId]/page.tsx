import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getVehicleBrands from '@/actions/get-vehicleBrands';
import getVehicleTypes from '@/actions/get-vehicleTypes';
import getproductBrands from '@/actions/get-productBrands';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';
import getCategories from '@/actions/get-categories';
import MainNav from '@/components/main-nav';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    vehicleBrandId: string;
    vehicleTypeId: string;
    productBrandId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ 
  params, 
  // searchParams
}) => {
  const products = await getProducts({ 
    categoryId: params.categoryId,
  });
  const vehicleBrands = await getVehicleBrands()
  const vehicleTypes = await getVehicleTypes()
  const productBrands = await getproductBrands()
  const category = await getCategory(params.categoryId);
  const categories = await getCategories();

  return (
    <div className="bg-white">
      <Container>
        <Billboard 
          data={category.billboard}
        />
        <div className='px-4'>
        <MainNav data={categories}/>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="md:grid-col5 lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters vehicleBrands={vehicleBrands} vehicleTypes={vehicleTypes} productBrands={productBrands} />
            <div className="hidden lg:block">
              <Filter
                valueKey="vehicleBrandId" 
                name="Vehicle Brands" 
                data={vehicleBrands}
              />
              <Filter
                valueKey="vehicleTypeId" 
                name="Vehicle Types" 
                data={vehicleTypes}
              />
              <Filter
                valueKey="productBrandId" 
                name="Product Brands" 
                data={productBrands}
              />
              {/* <Filter
                valueKey="sizeId" 
                name="Sizes" 
                data={sizes}
              /> */}
              {/* <Filter 
                valueKey="colorId" 
                name="Colors" 
                data={colors}
              /> */}
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;