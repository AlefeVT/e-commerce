import { getProducts } from "./actions"

export default async function CategoriesPage({params}: {params: {name: string}}) {

    const {data, title} = await getProducts(params.name)
    return (
        <section>
            <h1 className="font-semibold text-3xl my-5">{title}</h1>
        </section>
    )
}