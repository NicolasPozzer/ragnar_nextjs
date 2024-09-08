"use client"

import { useStore } from "@/src/store";
import { Product } from "@prisma/client"

interface AddProductButtonProps{
    product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder);

  return (
            <button
                type='button'
                className='bg-white hover:bg-black hover:text-white text-black w-full mt-4 p-2
                uppercase cursor-pointer border-y-black border-x-black border-2 rounded-3xl'
                onClick={() => addToOrder(product)}
            >
                añadir
            </button>
  )
}
