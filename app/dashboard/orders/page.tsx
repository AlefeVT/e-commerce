import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getOrders } from './actions';

export default async function OrdersPage() {
  const data = await getOrders();

  const formatStatus = (status: string) => {
    if (status === 'pending') return 'Pendente';
    if (status === 'complete') return 'Completa';
    return status;
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Pedidos</CardTitle>
        <CardDescription>Pedidos recentes da sua loja</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.User?.name}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.User?.email}
                  </p>
                </TableCell>
                <TableCell>Compra</TableCell>
                <TableCell>{formatStatus(item.status)}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('pt-br').format(item.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  R$
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                  }).format(item.amount / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
