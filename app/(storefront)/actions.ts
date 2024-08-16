'use server';

import { currentUser } from '@/lib/auth';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { stripe } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

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
    return redirect('/');
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
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath('/', 'layout');
}

export async function checkOut() {
  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => {
        if (!item.price || !item.name || !item.quantity || !item.imageString) {
          throw new Error('Item data is incomplete.');
        }

        return {
          price_data: {
            currency: 'brl',
            unit_amount: item.price * 100,
            product_data: {
              name: item.name,
              images: [item.imageString],
            },
          },
          quantity: item.quantity,
        };
      });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/cancel',
    });

    return redirect(session.url as string);
  }
}
