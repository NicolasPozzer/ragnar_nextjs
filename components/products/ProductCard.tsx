import {formatCurrency, getImagePath} from '@/src/utils'
import { Product } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import { useStore } from '@/src/store'
import AddProductButton from './AddProductButton'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {

    const imagePath = getImagePath(product.image)

  return (
    <div className='border bg-white'>
        <Image
            width={400}
            height={400}
            src={imagePath}
            alt={`Imagen: ${product.name}`}
            quality={40}//si queremos agregar la calidad
        />

        <div className='p-5'>
            <h3 className='text-1xl font-bold'>{product.name}</h3>
            <p className='mt-5 font-bold text-2xl text-amber-500'>
                {formatCurrency( product.price )}
            </p>
            
            <AddProductButton
                product={product}
            />
        </div>
    </div>
  )
}
