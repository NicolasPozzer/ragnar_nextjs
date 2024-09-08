'use client'; // Indica que este componente es del cliente

import React, { useState } from 'react';
import Image from 'next/image';
import { formatCurrency, getImagePath } from '@/src/utils';
import AddProductButton from './AddProductButton';
import { Product } from '@prisma/client';

interface ClientProductModalProps {
    product: Product;
}

export default function ClientProductModal({ product }: ClientProductModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imagePath = getImagePath(product.image);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOutsideClick = (event: React.MouseEvent) => {
        // Si el clic es en el fondo (fuera del modal), cierra el modal
        if (event.target === event.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const handleAddProduct = () => {
        // Lógica adicional: puedes interactuar aquí sin modificar AddProductButton
        setIsModalOpen(false); // Cierra el modal al hacer clic en "Añadir"
    };

    return (
        <>
            <Image
                onClick={toggleModal}
                width={400}
                height={400}
                src={imagePath}
                alt={`Imagen: ${product.name}`}
                quality={40}
                className="cursor-pointer"
            />

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleOutsideClick} // Detecta clics fuera del modal
                >
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-end">
                            <button
                                onClick={toggleModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &#x2715;
                            </button>
                        </div>
                        <Image
                            width={400}
                            height={400}
                            src={imagePath}
                            alt={`Imagen: ${product.name}`}
                            quality={80}
                        />
                        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
                        <p className="text-xl mt-2">{formatCurrency(product.price)}</p>

                        <div className="mt-5">
                            {/* Aquí simplemente capturamos el clic para cerrar el modal */}
                            <div onClick={handleAddProduct}>
                                <AddProductButton product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
