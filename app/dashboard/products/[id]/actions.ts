'use server';

import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

export async function getProductEdit(productId: string) {
  const prisma = new PrismaClient();

  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}
