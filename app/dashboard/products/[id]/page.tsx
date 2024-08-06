import { getProductEdit } from '@/app/actions';
import { EditForm } from '@/app/components/dashboard/EditForm';

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProductEdit(params.id);

  return <EditForm data={data} />;
}
