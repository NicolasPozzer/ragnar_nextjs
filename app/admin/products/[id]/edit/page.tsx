import {prisma} from "@/src/lib/prisma";
import {notFound} from "next/navigation";
import Heading from "@/components/ui/Heading";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import React from "react";
import GoBackButton from "@/components/ui/GoBackButton";


async function getProductsById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if(!product){
        notFound()
    }

    return product
}

export default async function EditProductsPage({params}: {params: {id: string}}) {

    const product = await getProductsById(+params.id)

    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

                <GoBackButton/>

                <EditProductForm>
                    <ProductForm
                        product={product}
                    />
                </EditProductForm>
            </>
            )
            }
