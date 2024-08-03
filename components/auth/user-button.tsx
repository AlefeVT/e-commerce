import { FaUser } from 'react-icons/fa';
import { ExitIcon, MixerVerticalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from '@/components/auth/logout-button';
import Link from 'next/link';

interface UserButton {
  className?: string;
}

export const UserButton = ({ className }: UserButton) => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <div className="text-gray-400">{user?.name || ''}</div>

        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-gray-400">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-gray-100" align="end">
        <DropdownMenuItem disabled>{user?.email || ''}</DropdownMenuItem>

        <DropdownMenuSeparator />

        <Link href="/settings">
          <DropdownMenuItem>
            <MixerVerticalIcon className="w-3 h-3 mr-3" />
            Configurações
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
