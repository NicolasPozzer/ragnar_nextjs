import React, {useMemo} from 'react'
import {OrderItem} from "@/src/types";
import {MinusIcon, PlusIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {formatCurrency} from "@/src/utils";
import {useStore} from '@/src/store'

interface ProductDetailsProps {
    item: OrderItem;
}

export default function ProductDetails({item}: ProductDetailsProps) {

    const MAX_ITEMS = 50;

    const increaseQuantity = useStore((state) => state.increaseQuantity)
    const decreaseQuantity = useStore((state) => state.decreaseQuantity)
    const removeItem = useStore((state) => state.removeItem)

    // Logica para establecer que no se pase de 0 el decremento del numero
    const disableDecreaseButton = useMemo(() => item.quantity === 1,[item])
    const disableIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS,[item])

    return (

        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8"/>
                    </button>
                </div>
                <p className="font-bold text-gray-600">
                    {formatCurrency(item.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    Cantidad:
                    <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={disableDecreaseButton}
                        className={'disabled:opacity-20'}
                    >
                        <MinusIcon className="h-6 w-6"/>
                    </button>

                    <p className="text-lg font-black ">
                        {item.quantity}
                    </p>

                    <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        disabled={disableIncreaseButton}
                        className={'disabled:opacity-20'}
                    >
                        <PlusIcon className="h-6 w-6"/>
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {formatCurrency(item.subtotal)}
                    <span className="font-normal">

        </span>
                </p>
            </div>
        </div>

    )
}

