import { formatCurrency, getImagePath } from '@/src/utils';
import { Product } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import ClientProductModal from './ClientProductModal'; // Client component

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const imagePath = getImagePath(product.image);

    return (
        <div className='border bg-white'>
            {/* Pasa la información del producto al client component */}
            <ClientProductModal product={product} />
            <div className='p-5'>
                <h3 className='text-1xl font-bold'>{product.name}</h3>
                <p className='mt-5 text-1xl'>{formatCurrency(product.price)}</p>
            </div>
        </div>
    );
}
