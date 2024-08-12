import { ProductCard } from '@/app/components/storefront/ProductCard';
import { getProducts } from './actions';

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  const { data, title } = await getProducts(params.name);

  return (
    <section className="mb-4">
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
