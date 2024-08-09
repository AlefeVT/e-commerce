import Link from 'next/link';
import { NavbarLinks } from './NavbarLinks';
import { currentUser } from '@/lib/auth';
import { ShoppingBagIcon } from 'lucide-react';
import { UserDropdown } from './UserDropdown';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo/logo';

export async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href={'/'}>
          <Logo />
        </Link>
        <NavbarLinks />
      </div>

      <div className="flex items-center">
        {user ? (
          <>
            <Link href={'/bag'} className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700">5</span>
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
