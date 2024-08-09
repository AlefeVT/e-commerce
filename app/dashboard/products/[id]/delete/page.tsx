import { SubmitButton } from '@/app/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { deleteProduct } from '../../actions';

export default function DeleteRoute({ params }: { params: { id: string } }) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Você tem certeza absoluta ?</CardTitle>
          <CardDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente este
            produto e removerá todos os dados de nossos servidores
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant={'secondary'} asChild>
            <Link href={'/dashboard/products'}>Cancelar</Link>
          </Button>
          <form action={deleteProduct}>
            <input type="hidden" name="productId" value={params.id} />
            <SubmitButton variant={'destructive'} text="Deletar Produto" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
