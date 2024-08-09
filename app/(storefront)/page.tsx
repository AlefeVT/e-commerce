import { CategoriesSelection } from '../components/storefront/CategorySelection';
import { FeaturedProduct } from '../components/storefront/FeaturedProducts';
import { Hero } from '../components/storefront/Hero';

export default function IndexPage() {
  return (
    <div className="mb-10">
      <Hero />
      <CategoriesSelection />
      <FeaturedProduct />
    </div>
  );
}
