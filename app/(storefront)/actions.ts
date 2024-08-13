'use server';

import { currentUser } from '@/lib/auth';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function getFeaturedProducts() {
  const prisma = new PrismaClient();
  const data = await prisma.product.findMany({
    where: {
      status: 'publicado',
      isFeatured: true,
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
    take: 3,
  });

  return data;
}

export async function addItem(productId: string) {
  const prisma = new PrismaClient();

  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error('Produto não encontrado');
  }

  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        }
      ],
    }
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      })
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath("/", "layout")
}