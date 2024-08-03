import Link from "next/link"

const links = [
    {
        name: "Painel",
        href: "/dashboard"
    },
    {
        name: "Pedidos",
        href: "/dashboard/orders"
    },
    {
        name: "Produtos",
        href: "/dashboard/products"
    },
    {
        name: "Categorias",
        href: "/dashboard/categories"
    }
]
export function DashboardNavigation() {
    return (
        <>
        {links.map((link) => (
            <Link key={link.href} href={link.href}>
                {link.name}
            </Link>
        ))}
        </>
    )
}