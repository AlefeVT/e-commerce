import { z } from 'zod';

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(['rascunho', 'publicado', 'arquivado']),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, 'É necessária pelo menos uma imagem'),
  category: z.enum(['masculino', 'feminino', 'infantil']),
  isFeatured: z.boolean().optional(),
});
