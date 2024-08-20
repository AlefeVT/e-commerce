import { getDashboardInfo } from '@/app/dashboard/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, PartyPopper, ShoppingBag, User2 } from 'lucide-react';

export async function DashboardStats() {
  const { products, user, order } = await getDashboardInfo();

  const totalAmount = order.reduce((accumalator, currentValue) => {
    return accumalator + currentValue.amount;
  }, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold">
            Rendimento Total
          </CardTitle>
          <DollarSign className="h-6 w-6 text-green-500" />
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold">
            R$
            {new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
            }).format(totalAmount / 100)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            baseado em 100 alterações
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold">Vendas totais</CardTitle>
          <ShoppingBag className="h-6 w-6 text-blue-500" />
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold">+{order.length}</p>
          <p className="text-xs text-muted-foreground mt-2">
            vendas totais em E-commerce
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold">
            Produtos Totais
          </CardTitle>
          <PartyPopper className="h-6 w-6 text-indigo-500" />
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Total de produtos criados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold">
            Usuários Totais
          </CardTitle>
          <User2 className="h-6 w-6 text-orange-500" />
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold">{user.length}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Total de usuários ativos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
