import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function SuccessRoute() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Compra realizada com sucesso!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Parabéns pela sua compra. Seu pagamento foi realizado com sucesso.
              esperamos que você goste do seu produto
            </p>

            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href={'/'}>Voltar à página inicial</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
