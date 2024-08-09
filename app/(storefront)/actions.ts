'use server';

import { PrismaClient } from '@prisma/client';

export async function getFeaturedProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    where: {
      status: 'publicado',
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}
