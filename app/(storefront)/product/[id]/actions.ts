import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

export async function getProduct(productId: string) {
  const prisma = new PrismaClient();
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}
