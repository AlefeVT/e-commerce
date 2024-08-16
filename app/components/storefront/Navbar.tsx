import Link from 'next/link';
import { NavbarLinks } from './NavbarLinks';
import { currentRole, currentUser } from '@/lib/auth';
import { ShoppingBagIcon } from 'lucide-react';
import { UserDropdown } from './UserDropdown';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo/logo';
import { redis } from '@/lib/redis';
import { Cart } from '@/lib/interfaces';

export async function Navbar() {
  const user = await currentUser();

  const role = await currentRole();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href={'/'}>
          <Logo />
        </Link>
        <NavbarLinks role={role} />
      </div>

      <div className="flex items-center">
        {user ? (
          <>
            <Link href={'/bag'} className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {total}
              </span>
            </Link>

            <UserDropdown
              email={user.email as string}
              name={user.name as string}
              userImage={user.image ?? `https://avatar.vercel.sh/${user.name}`}
            />
          </>
        ) : (
          <div className="md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant={'ghost'} asChild>
              <Link href={'/auth/login'}>Conectar</Link>
            </Button>

            <Button variant={'ghost'} asChild>
              <Link href={'/auth/register'}>Rergistrar-se</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
