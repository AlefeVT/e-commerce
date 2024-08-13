import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      aa
      <Button>
        <Link href={'/auth/login'}>Logar</Link>
      </Button>
      <Button>
        <Link href={'/auth/register'}>Cadastrar-se</Link>
      </Button>
    </div>
  );
}
