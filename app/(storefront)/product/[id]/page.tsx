import { ImageSlider } from '@/app/components/storefront/ImageSlider';
import { getProduct } from './actions';
import { ShoppingBag, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeaturedProduct } from '@/app/components/storefront/FeaturedProducts';

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProduct(params.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">R${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>

          <Button size={'lg'} className="w-full mt-5">
            <ShoppingBag className="mr-4 h-5 w-5" /> Adicionar ao carrinho
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProduct />
      </div>
    </>
  );
}
