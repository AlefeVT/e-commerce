import { PrismaClient } from '@prisma/client';

export async function getDashboardInfo() {
  const prisma = new PrismaClient();

  const [user, products, order] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),

    prisma.product.findMany({
      select: {
        id: true,
      },
    }),

    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return {
    user,
    products,
    order,
  };
}

export async function getRecentSales() {
  const prisma = new PrismaClient();

  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          name: true,
          image: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 7,
  });

  return data;
}

export async function getDataChart() {
  const prisma = new PrismaClient();

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat('pt-BR').format(item.createdAt),
    revenue: item.amount / 100,
  }));

  return result;
}
