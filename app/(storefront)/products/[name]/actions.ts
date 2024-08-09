"use server"

import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation";

export async function getProducts(productCategory: string) {
    const prisma = new PrismaClient();

    switch (productCategory) {
        case "all":
            {
                const data = await prisma.product.findMany({
                    select: {
                        name: true,
                        images: true,
                        price: true,
                        id: true,
                        description: true
                    },
                    where: {
                        status: "publicado"
                    }
                })

                return {
                    title: "Todos Produtos",
                    data: data,
                }
            } case "men": {
                const data = await prisma.product.findMany({
                    where: {
                        status: "publicado",
                        category: "masculino"
                    },
                    select: {
                        name: true,
                        images: true,
                        price: true,
                        id: true,
                        description: true
                    }
                })

                return {
                    title: "Produtos Masculinos",
                    data: data,
                }
            } case "women": {
                const data = await prisma.product.findMany({
                    where: {
                        status: "publicado",
                        category: "feminino"
                    },
                    select: {
                        name: true,
                        images: true,
                        price: true,
                        id: true,
                        description: true
                    }
                })

                return {
                    title: "Produtos Femininos",
                    data: data,
                }
            } case "infantil": {
                const data = await prisma.product.findMany({
                    where: {
                        status: "publicado",
                        category: "infantil"
                    },
                    select: {
                        name: true,
                        images: true,
                        price: true,
                        id: true,
                        description: true
                    }
                })

                return {
                    title: "Produtos Infantis",
                    data: data,
                }
            } default: {
                return notFound()
            }
    }
}