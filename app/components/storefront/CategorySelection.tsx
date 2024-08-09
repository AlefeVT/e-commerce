import Link from 'next/link';
import Image from 'next/image';
import todos from '@/public/todos.png';
import masculino from '@/public/masculino.png';
import feminino from '@/public/feminino.png';

export function CategoriesSelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Compre por categoria
        </h2>

        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href={'/products/all'}
        >
          Navegue por todos os produtos &#8594;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
          <Image
            src={todos}
            alt="Imagens da Categoria Todos"
            className="object-cover object-center"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="p-6 flex items-end">
            <Link href={'/products/all'}>
              <h3 className="text-white font-semibold">Produtos no Geral</h3>
              <p className="mt-1 text-sm text-white">Compre agora</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={masculino}
            alt="Imagens da Categoria Masculina"
            className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href={'/products/men'}>
              <h3 className="text-white font-semibold">Produtos masculinos</h3>
              <p className="mt-1 text-sm text-white">Compre agora</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={feminino}
            alt="Imagens da Categoria Feminina"
            className="object-center object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href={'/products/'}>
              <h3 className="text-white font-semibold">Produtos femininos</h3>
              <p className="mt-1 text-sm text-white">Compre agora</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
