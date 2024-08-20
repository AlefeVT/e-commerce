'use server';

import { PrismaClient } from '@prisma/client';

export async function getOrders() {
  const prisma = new PrismaClient();

  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}
