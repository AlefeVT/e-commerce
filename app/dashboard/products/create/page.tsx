'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { categories } from '@/lib/categories';
import { SubmitButton } from '@/app/components/SubmitButtons';
import { productSchema } from '@/schemas';
import { createProduct } from '../actions';
import { UploadDropzone } from '@/lib/uploadthing';

export default function ProductCreateRoute() {
  const [images, setImages] = useState<string[]>([]);
  const [lastResult, action] = useFormState(createProduct, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4">
        <Button variant={'outline'} size={'icon'} asChild>
          <Link href={'/dashboard/products'}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold tracking-tight">Novo Produto</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Detalhes do Produto</CardTitle>
          <CardDescription>
            Neste formulário você pode criar seu produto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Nome</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                className="w-full"
                placeholder="Nome do Produto"
              />

              <p className="text-red-500">
                {fields.name.errors && fields.name.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.name.errors?.join(', ')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Descrição</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                placeholder="Escreva sua descrição aqui..."
              />

              <p className="text-red-500">
                {fields.description.errors &&
                fields.description.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.description.errors?.join(', ')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Preço</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={fields.price.initialValue}
                type="number"
                placeholder="R$55"
              />

              <p className="text-red-500">
                {fields.price.errors && fields.price.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.price.errors &&
                      fields.price.errors.includes(
                        'Number must be greater than or equal to 1'
                      )
                    ? 'O número deve ser maior ou igual a 1'
                    : fields.price.errors?.join(', ')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Produto em destaque</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue}
              />

              <p className="text-red-500">
                {fields.isFeatured.errors &&
                fields.isFeatured.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.isFeatured.errors?.join(', ')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                name={fields.status.name}
                key={fields.status.key}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="publicado">Publicado</SelectItem>
                  <SelectItem value="arquivado">Arquivado</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-red-500">
                {fields.status.errors &&
                fields.status.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.status.errors?.join(', ')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Categoria</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={fields.category.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-red-500">
                {fields.status.errors &&
                fields.status.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.status.errors?.join(', ')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* <Label>Imagens</Label> */}
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />

              <div className="flex flex-col gap-3">
                <Label>Imagens</Label>
                {images.length > 0 ? (
                  <div className="flex gap-5">
                    {images.map((image, index) => (
                      <div key={index} className="relative w-[100px] h-[100px]">
                        <Image
                          height={100}
                          width={100}
                          src={image}
                          alt="Imagem do Produto"
                          className="w-full h-full object-cover rounded-lg border"
                        />

                        <button
                          onClick={() => handleDelete(index)}
                          className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                          type="button"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    // content={{
                    //   label: "Arraste e solte seus arquivos aqui ou clique para selecionar",
                    //   button: "Enviar Arquivos",
                    // }}
                    onClientUploadComplete={(res) => {
                      setImages(res.map((r) => r.url));
                    }}
                    onUploadError={(error) => {
                      console.error('Erro no upload:', error);
                      toast.error('Falha ao enviar as imagens');
                    }}
                  />
                )}
              </div>

              <p className="text-red-500">
                {fields.images.errors &&
                fields.images.errors.includes('Required')
                  ? 'Este campo é obrigatório'
                  : fields.images.errors?.join(', ')}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Criar Produto" />
        </CardFooter>
      </Card>
    </form>
  );
}
