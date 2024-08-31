import { redirect } from "next/navigation";
import React from 'react'
import Heading from "@/components/ui/Heading";
import {prisma} from "@/src/lib/prisma";
import ProductTable from "@/components/products/ProductsTable";
import ProductsPagination from "@/components/products/ProductsPagination";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount() {
    return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number){
    const skip = (page -1) * pageSize
    const products = await prisma.product.findMany({
        take: pageSize, // take es para traer, entonces trae 10 en este ej.
        skip: skip,
        include: {
            category: true
        }
    })

    return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

// con searchPage que es algo de next.js conseguimos el numero de pagina para hacer
//una busqueda por paginas
export default async function ProductsPage({searchParams} : { searchParams: {page: string} }) {

    const page = +searchParams.page || 1 // esto obtiene la pagina lo convierte a int y luego se usa OR para
                                        //cuando recien ingresas a la url que cargue la pagina 1 siempre.
    const pageSize = 11 // cantidad de productos en una pagina

    if(page < 0){
        redirect('/admin/products')
    }

    // Consultar url con await espera que termine una luego la otra con promises ejecutamos juntas
    const productsData = await getProducts(page, pageSize)
    const totalProductsData = await productCount()
    const [ products, totalProducts ] = await Promise.all([productsData, totalProductsData]) //Hace que las consultas se ejecuten al mismo tiempo
    const totalPages = Math.ceil(totalProducts / pageSize)

    if(page > totalPages){
        redirect('/admin/products')
    }

  return (
      <>
          <Heading>Administrar Productos</Heading>

          <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
              <Link href={"/admin/products/new"}
                    className='bg-amber-400 w-full lg:w-auto text-xl px-2 py-1 text-center
                    font-bold cursor-pointer'
              >
                  Crear Producto
              </Link>
              <ProductSearchForm/>
          </div>

          <ProductTable products={products}/>

          <ProductsPagination
              page={page}
              totalPages={totalPages}
          />
      </>
  )
}
