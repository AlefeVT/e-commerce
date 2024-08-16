import { getFeaturedProducts } from '@/app/(storefront)/actions';
import { LoadingProductCard, ProductCard } from './ProductCard';
import { Suspense } from 'react';

export async function FeaturedProduct() {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">
        Produtos em Destaque
      </h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedProducts />
      </Suspense>
    </>
  );
}

async function LoadFeaturedProducts() {
  const data = await getFeaturedProducts();

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
