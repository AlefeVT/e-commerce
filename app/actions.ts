'use server';

import { promises as fs } from 'fs';
import path from 'path';

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
