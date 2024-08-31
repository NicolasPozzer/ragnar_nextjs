"use client"

import Image from "next/image" // Para usar el metodo de mostrar imagenes
//optimizado de imagenes de next
import { Category } from "@prisma/client"
//optimizado de router de next
import Link from "next/link"
// para conseguir params en componentes como este que no se puede
import { useParams } from "next/navigation"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category}: CategoryIconProps) {
    const params = useParams<{category: string}>();

  return (
    <div
        className={`${category.slug === params.category ? 
            'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
        <div className="w-16 h-16 relative">
            <Image 
                fill
                src={`/icon_${category.slug}.svg`} 
                alt="Imagen Categoria"
            />
        </div>

        <Link
            className="text-xl font-bold cursor-pointer"
            href={`/order/${category.slug}`}
        >
        {category.name}</Link>
    </div>
  )
}
