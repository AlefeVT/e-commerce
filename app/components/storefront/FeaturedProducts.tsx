import { getFeaturedProducts } from '@/app/(storefront)/actions';
import { ProductCard } from './ProductCard';

export async function FeaturedProduct() {
  const data = await getFeaturedProducts();

  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">
        Produtos em Destaque
      </h2>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
