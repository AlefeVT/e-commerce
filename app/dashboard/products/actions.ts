'use server';

import { currentUser } from '@/lib/auth';
import { productSchema } from '@/schemas';
import { parseWithZod } from '@conform-to/zod';
import { PrismaClient } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';
import path from 'path';
import { promises as fs } from 'fs';

export async function createProduct(prevState: unknown, fromdata: FormData) {
  const user = await currentUser();
  const prisma = new PrismaClient();

  if (!user) {
    redirect('/auth/login');
  }

  const submission = parseWithZod(fromdata, {
    schema: productSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(',').map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect('/dashboard/products');
}

export async function editProduct(prevState: any, formData: FormData) {
  const prisma = new PrismaClient();
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const productId = formData.get('productId') as string;

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(',').map((url) => url.trim())
  );

  await prisma.product.update({
    where: { id: productId },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      price: submission.value.price,
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect('/dashboard/products');
}

export async function deleteProduct(formData: FormData) {
  const prisma = new PrismaClient();
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }

  const product = await prisma.product.findUnique({
    where: {
      id: formData.get('productId') as string,
    },
    select: {
      images: true,
    },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  const filePaths = product.images;

  for (const filePath of filePaths) {
    const fullFilePath = path.join(process.cwd(), 'public', filePath);
    try {
      await fs.unlink(fullFilePath);
    } catch (err) {
      console.error(`Failed to delete file ${filePath}:`, err);
    }
  }

  await prisma.product.delete({
    where: {
      id: formData.get('productId') as string,
    },
  });

  redirect('/dashboard/products');
}

export async function getProducts() {
  const prisma = new PrismaClient();
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

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
