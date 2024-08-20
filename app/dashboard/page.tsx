import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RecentSales } from '../components/dashboard/RecentSales';
import { Chart } from '../components/dashboard/Chart';
import { getDataChart } from './actions';

export default async function Dashboard() {
  const data = await getDataChart();

  return (
    <>
      <DashboardStats />

      <div className="grid gap4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transações</CardTitle>
            <CardDescription>
              Transações recentes dos últimos 7 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>

        <RecentSales />
      </div>
    </>
  );
}
