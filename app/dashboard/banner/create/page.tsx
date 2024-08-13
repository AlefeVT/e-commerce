'use client';

import { SubmitButton } from '@/app/components/SubmitButtons';
import ImageUpload from '@/components/imageUpload/ImageUpload';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { bannerSchema } from '@/schemas';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { createBanner } from '../actions';

export default function BannerRoute() {
  const [image, setImages] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createBanner, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant={'outline'} size={'icon'} asChild>
          <Link href={'/dashboard/banner'}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Novo Banner</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Detalhes do Banner</CardTitle>
          <CardDescription>Crie seu banner aqui mesmo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Nome</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                type="text"
                placeholder="Crie o titulo do seu Banner"
              />

              <p className="text-red-500">
                {fields.title.errors && fields.title.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.title.errors?.join(', ')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Imagem</Label>
              <input
                type="hidden"
                value={image}
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue}
              />
              {image !== undefined ? (
                <Image
                  src={image}
                  alt="Imagem do Banner"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] object-cover border rounded-lg"
                />
              ) : (
                <ImageUpload
                  onClientUploadComplete={(res) => {
                    setImages(res[0].url);
                  }}
                  onUploadError={() => {
                    toast.error('Algo deu errado!');
                  }}
                  maxFiles={1}
                />
              )}

              <p className="text-red-500">
                {fields.imageString.errors &&
                fields.imageString.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.imageString.errors?.join(', ')}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Criar Banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
