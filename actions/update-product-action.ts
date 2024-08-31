"use server"

import {ProductSchema} from "@/src/schema";
import {prisma} from "@/src/lib/prisma";
import {revalidatePath} from "next/cache";

export async function updateProduct(data: unknown, id: number){

    const result = ProductSchema.safeParse(data)
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await prisma.product.update({
        where: {
            id
        },
        data: result.data
    })
    revalidatePath('/admin/products')
}