import { redirect } from "next/navigation";
import React from 'react'
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import ProductTable from "@/components/products/ProductsTable";
import ProductsPagination from "@/components/products/ProductsPagination";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProtectedPage from "@/components/ProtectedPage"; // Importa el componente de protección

async function productCount() {
    return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const products = await prisma.product.findMany({
        take: pageSize,
        skip: skip,
        include: {
            category: true
        }
    });

    return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

// Componente de la página principal de productos
export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {
    const page = +searchParams.page || 1;
    const pageSize = 11;

    if (page < 0) {
        redirect('/admin/products');
    }

    const productsData = await getProducts(page, pageSize);
    const totalProductsData = await productCount();
    const [products, totalProducts] = await Promise.all([productsData, totalProductsData]);
    const totalPages = Math.ceil(totalProducts / pageSize);

    if (page > totalPages) {
        redirect('/admin/products');
    }

    return (
        <ProtectedPage>
            <Heading>Administrar Productos</Heading>

            <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
                <Link href="/admin/products/new"
                      className='bg-amber-400 w-full lg:w-auto text-xl px-2 py-1 text-center
                      font-bold cursor-pointer'
                >
                    Crear Producto
                </Link>
                <ProductSearchForm />
            </div>

            <ProductTable products={products} />

            <ProductsPagination
                page={page}
                totalPages={totalPages}
            />
        </ProtectedPage>
    );
}
