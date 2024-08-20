'use server';

import { currentUser } from '@/lib/auth';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function delItem(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  const productId = formData.get('productId');

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath('/bag');
}
