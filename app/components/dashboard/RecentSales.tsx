import { getRecentSales } from '@/app/dashboard/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function RecentSales() {
  const data = await getRecentSales();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas recentes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden sm:flex h-9 w-9">
              {item.User?.image && (
                <AvatarImage src={item.User.image} alt="Imagem do Usuário" />
              )}
              <AvatarFallback>{item.User?.name?.slice(0, 3)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">{item.User?.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.User?.email}
              </p>
            </div>
            <p className="ml-auto font-medium">
              +R$
              {new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
              }).format(item.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
