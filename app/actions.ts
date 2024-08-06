'use server';

import { currentUser } from '@/lib/auth';
import { productSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { PrismaClient } from '@prisma/client';

import { promises as fs } from 'fs';
import { redirect } from 'next/navigation';
import path from 'path';

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
      isFeatured: submission.value.isFeatured,
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
      isFeatured: submission.value.isFeatured,
      status: submission.value.status,
      images: flattenUrls,
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

export async function saveImageToPublic(formData: FormData): Promise<string> {
  try {
    const file = formData.get('image') as File;
    if (!file) {
      throw new Error('Arquivo não encontrado no FormData');
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.name);
    const fileName = `${uniqueSuffix}${ext}`;

    const publicDir = path.join(process.cwd(), 'public', 'uploads');

    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Erro ao salvar a imagem:', error);
    throw new Error(`Erro ao salvar a imagem`);
  }
}
