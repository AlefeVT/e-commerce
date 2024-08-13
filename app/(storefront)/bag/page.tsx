import { currentUser } from "@/lib/auth"
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { delItem } from "./actions";
import { DeleteItem } from "@/app/components/SubmitButtons";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { checkOut } from "../actions";

export default async function BagRoute() {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    let totalPrice = 0;

    cart?.items.forEach((item) => {
        totalPrice += item.price * item.quantity;

    });

    return (
        <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
            {cart?.items.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <ShoppingBag className="w-10 h-10 text-primary" />
                    </div>

                    <h2 className="mt-6 text-xl font-semibold">Nenhum Produto no carrinho de compras</h2>

                    <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">No momento você não tem nenhum produto em sua sacola de compras. adicione alguns para que você possa vê-los aqui</p>

                    <Button asChild>
                        <Link href={"/"}>Comprar agora!</Link>
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-y-10">
                    {cart?.items.map((item) => (
                        <div key={item.id} className="flex">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                                <Image
                                    className="rounded-md object-cover"
                                    fill
                                    src={item.imageString}
                                    alt="Imagem do Produto"
                                />
                            </div>
                            <div className="ml-5 flex justify-between w-full font-medium">
                                <p>{item.name}</p>
                                <div className="flex flex-col h-full justify-between">

                                    <div className="flex items-center gap-x-2">
                                        <p>{item.quantity} x</p>
                                        <p>R$ {item.price}</p>
                                    </div>

                                    <form action={delItem} className="text-end">
                                        <input type="hidden" name="productId" value={item.id} />
                                        <DeleteItem />
                                    </form>

                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-10">
                        <div className="flex items-center justify-between font-medium">
                            <p>SubTotal:</p>
                            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</p>
                        </div>

                        <form action={checkOut}>
                            <Button size={"lg"} className="w-full mt-5">Confirmar</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}