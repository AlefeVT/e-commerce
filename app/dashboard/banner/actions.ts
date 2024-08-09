'use server';

import { currentUser } from '@/lib/auth';
import { bannerSchema } from '@/schemas';
import { parseWithZod } from '@conform-to/zod';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import path from 'path';
import { promises as fs } from 'fs';

export async function createBanner(prevState: any, formData: FormData) {
  const user = await currentUser();
  const prisma = new PrismaClient();

  if (!user) {
    redirect('/auth/login');
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect('/dashboard/banner');
}

export async function getBanners() {
  const prisma = new PrismaClient();
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export async function deleteBanner(formData: FormData) {
  const prisma = new PrismaClient();
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }

  const bannerId = formData.get('bannerId') as string;

  const banner = await prisma.banner.findUnique({
    where: { id: bannerId },
    select: { imageString: true },
  });

  if (!banner) {
    throw new Error('Banner not found');
  }

  const filePath = banner.imageString;
  const fullFilePath = path.join(process.cwd(), 'public', filePath);

  try {
    await fs.unlink(fullFilePath);
  } catch (err) {
    console.error(`Failed to delete file ${filePath}:`, err);
  }

  await prisma.banner.delete({
    where: { id: bannerId },
  });

  redirect('/dashboard/banner');
}
