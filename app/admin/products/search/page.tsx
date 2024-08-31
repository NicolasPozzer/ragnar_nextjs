import Heading from "@/components/ui/Heading";
import {prisma} from "@/src/lib/prisma";
import ProductTable from "@/components/products/ProductsTable";
import React from "react";
import ProductSearchForm from "@/components/products/ProductSearchForm";


async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({searchParams}: {searchParams: {search: string}}) {

    const products = await searchProducts(searchParams.search)

    return (
        <>
            <Heading>
                Resultados de Busqueda: {searchParams.search}
            </Heading>

            <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
                <ProductSearchForm/>
            </div>

            {products.length ? (
                <ProductTable
                    products={products}
                />
            ): <p>No hay resultados..</p> }

        </>
    )
}
